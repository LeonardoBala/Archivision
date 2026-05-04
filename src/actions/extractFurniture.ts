'use server';

import { PrismaClient } from '@prisma/client';
import { GoogleAuth } from "google-auth-library";

const prisma = new PrismaClient();

const GOOGLE_AUTH = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  keyFilename: 'service-account-key-1.json',
});

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID || "effective-time-479615-m3";
const LOCATION_ID = "global";
const API_ENDPOINT = "aiplatform.googleapis.com";
const MODEL_ID = "gemini-3.1-pro-preview";
const SERPAPI_KEY = process.env.SERPAPI_API_KEY;

// Furniture & decor — Romanian + international shops
const FURNITURE_SHOPS = [
  "emag.ro",
  "mobexpert.ro",
  "jysk.ro",
  "vivre.ro",
  "bonami.ro",
  "elefant.ro",
  "kika.ro",
  "ambient.ro",
  "ikea.com",
  "wayfair.com",
];

// Wall/floor finishes — Romanian hardware & home improvement stores
const FINISH_SHOPS = [
  "dedeman.ro",
  "leroy-merlin.ro",
  "hornbach.ro",
  "praktiker.ro",
  "obi.ro",
  "brico-depot.ro",
];

function buildShopQuery(searchQuery: string, shops: string[]): string {
  const siteFilter = shops.map(s => `site:${s}`).join(" OR ");
  return `${searchQuery} (${siteFilter})`;
}

function isProductUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();
    if (path === "/" || path === "") return false;
    if (path.split("/").filter(Boolean).length < 2) return false;
    const nonProductPatterns = [
      "/search", "/catalog", "/category", "/c/", "/?q=", "/tag/",
      "/ideas/", "/styles/", "/rooms/", "/inspiration/", "/blog/",
      "/article/", "/articles/", "/collection/", "/guide/", "/guides/",
      "/new/", "/event/", "/events/", "/planners/", "/planner/",
      "/about/", "/news/", "/press/", "/store/", "/stores/",
      "/campaign/", "/campaigns/", "/landing/",
    ];
    if (nonProductPatterns.some(p => path.includes(p))) return false;
    return true;
  } catch {
    return false;
  }
}

// isLiveLink removed: it did a HEAD request (5s timeout) per URL candidate which added
// minutes of latency, and most e-commerce sites return 403 to HEAD for valid products.

async function findProductLink(item: {
  name: string;
  item_type: "furniture" | "finish";
  search_query_en: string;
  search_query_ro: string;
  color?: string;
  material?: string;
}): Promise<{ link: string | null; image: string | null; price: number | null; shopName: string | null }> {

  const shops = item.item_type === "finish" ? FINISH_SHOPS : FURNITURE_SHOPS;

  // Order: preferred shops first, then open Google Shopping as fallback
  const queries = item.item_type === "finish"
    ? [
        buildShopQuery(item.search_query_ro, shops),
        buildShopQuery(item.search_query_en, shops),
        item.search_query_ro, // fallback: no site filter
      ]
    : [
        buildShopQuery(item.search_query_en, shops),
        buildShopQuery(item.search_query_ro, shops),
        item.search_query_en, // fallback: no site filter
      ];

  for (const query of queries) {
    // hl=en for furniture (better global product indexing), hl=ro for finishes (Romanian store listings)
    const lang = item.item_type === "finish" ? "ro" : "en";
    const serpUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&gl=ro&hl=${lang}&num=10&api_key=${SERPAPI_KEY}`;

    try {
      const res = await fetch(serpUrl);
      if (!res.ok) {
        console.error(`SerpAPI HTTP ${res.status} for query: "${query}"`);
        continue;
      }
      const data = await res.json();

      // Shopping results first (they include price, image, direct product URL)
      const shoppingResults: Array<{
        link: string; title: string; thumbnail?: string;
        extracted_price?: number; price?: string;
      }> = data.shopping_results || [];

      const organicResults: Array<{
        link: string; title: string; thumbnail?: string;
      }> = data.organic_results || [];

      const allCandidates = [
        ...shoppingResults.slice(0, 5).map(r => ({ ...r, isShoppingResult: true })),
        ...organicResults.slice(0, 10).map(r => ({ ...r, isShoppingResult: false })),
      ];

      for (const result of allCandidates) {
        const url = result.link;
        if (!url || !isProductUrl(url)) continue;

        let price: number | null = null;
        if ("extracted_price" in result && result.extracted_price) {
          price = Number(result.extracted_price);
        } else if ("price" in result && typeof result.price === "string") {
          const parsed = parseFloat(result.price.replace(/[^0-9,.]/g, "").replace(",", "."));
          if (!isNaN(parsed)) price = parsed;
        }

        const shopName = new URL(url).hostname.replace("www.", "");
        console.log(`Product found for "${item.name}": ${shopName} — ${url}`);
        return { link: url, image: result.thumbnail || null, price, shopName };
      }
    } catch (err) {
      console.error(`SerpAPI error for "${item.name}":`, err);
    }
  }

  console.log(`No product link found for "${item.name}"`);
  return { link: null, image: null, price: null, shopName: null };
}

export async function extractFurniture(designId: string, imageUrl: string, designStyle?: string) {
  try {
    console.log(`\n=== FURNITURE EXTRACTION: designId=${designId} ===`);

    if (!SERPAPI_KEY) throw new Error("SERPAPI_API_KEY is missing from .env");

    // --- 1. Download image and prepare base64 ---
    const imageResp = await fetch(imageUrl);
    const imageBuffer = await imageResp.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const mimeType = imageResp.headers.get("content-type") || "image/jpeg";

    const client = await GOOGLE_AUTH.getClient();
    const accessToken = await client.getAccessToken();

    // --- 2. Gemini vision: detect furniture, decor AND wall/floor finishes ---
    const vertexUrl = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`;

    const styleContext = designStyle
      ? `The room's interior design style is: ${designStyle}. Use this as context to identify items accurately.`
      : "";

    const promptText = `You are an expert interior designer and material specialist. Carefully analyze this interior design image. ${styleContext}

Identify TWO categories of items:

CATEGORY 1 — FURNITURE & DECOR (item_type: "furniture")
All moveable or decorative items: sofas, armchairs, chairs, tables, beds, shelves, bookcases, wardrobes, nightstands, lamps, rugs, cushions, curtains, plants, artwork, mirrors, vases, baskets.

CATEGORY 2 — WALL & FLOOR FINISHES (item_type: "finish")
Fixed surface materials visible in the room:
- Wall paint: the color of painted walls (describe the exact shade)
- Floor tiles / gresie: ceramic or porcelain floor tiles (color, visible texture or pattern, estimated size like 60x60)
- Wall tiles / faianță: ceramic wall tiles in kitchen or bathroom (color, texture)
- Parquet / laminate: wooden or laminate flooring (color tone, wood grain style: light oak, dark walnut, grey washed, etc.)

For EACH item return:
- item_type: "furniture" or "finish"
- name: English display name with color + material + form
- category: English category label (examples below)
  - Furniture: "Seating", "Table", "Lighting", "Textiles", "Decor"
  - Finish: "Wall Paint", "Floor Tiles", "Wall Tiles", "Parquet/Laminate"
- color: exact color visible (e.g. "dark charcoal grey", "warm beige", "light oak")
- material: material or product type (e.g. "velvet", "ceramic 60x60", "engineered wood", "latex paint")
- search_query_en: English search optimized for online stores — include color + material + type + style
- search_query_ro: Romanian search for Romanian stores — use product terminology used in Romanian hardware/furniture shops
  - Paint examples: "vopsea lavabila interior gri deschis 2.5l", "vopsea perete bej cald"
  - Tile examples: "gresie portelanata gri antracit 60x60", "faianta alba mata 30x60"
  - Parquet examples: "parchet laminat stejar deschis 8mm", "parchet vinil gri"
  - Furniture examples: "canapea 3 locuri gri catifea picioare metalice negre"

Return ONLY a valid JSON array, no markdown, no explanation:
[
  {
    "item_type": "furniture",
    "name": "3-Seat Sofa Dark Anthracite Grey Velvet Black Metal Legs",
    "category": "Seating",
    "color": "dark charcoal grey",
    "material": "velvet, black metal legs",
    "search_query_en": "3 seater sofa dark charcoal grey velvet black metal legs modern",
    "search_query_ro": "canapea 3 locuri gri antracit catifea picioare metalice negre moderna"
  },
  {
    "item_type": "finish",
    "name": "Warm Light Grey Wall Paint",
    "category": "Wall Paint",
    "color": "warm light grey",
    "material": "latex paint",
    "search_query_en": "interior wall paint warm light grey",
    "search_query_ro": "vopsea lavabila interior gri cald deschis 2.5l"
  },
  {
    "item_type": "finish",
    "name": "Dark Anthracite Grey Porcelain Floor Tiles 60x60",
    "category": "Floor Tiles",
    "color": "dark anthracite grey",
    "material": "ceramic 60x60",
    "search_query_en": "floor tiles dark anthracite grey porcelain 60x60",
    "search_query_ro": "gresie portelanata gri antracit 60x60 mata"
  }
]

Rules:
- Return ONLY the JSON array.
- Include ALL furniture, ALL decor, AND ALL visible surface finishes (walls, floor, tiles).
- For repeated identical items (e.g. 4 matching chairs), include once.
- search_query fields must be specific enough to find the exact product in online stores.
- Do NOT include structural architecture (bare concrete walls, ceiling structure). DO include painted walls, tiled walls, all flooring.`;

    const aiResponse = await fetch(vertexUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: promptText },
              { inlineData: { mimeType, data: base64Image } },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error(`Gemini API error ${aiResponse.status}:`, errText);
      return { success: false, error: `Gemini API returned status ${aiResponse.status}` };
    }

    const aiData = await aiResponse.json();
    const responseText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    console.log(`Gemini raw response:\n${responseText}`);

    let detectedItems: Array<{
      item_type: "furniture" | "finish";
      name: string;
      category: string;
      color?: string;
      material?: string;
      search_query_en: string;
      search_query_ro: string;
    }> = [];

    try {
      const cleaned = responseText.replace(/```json\n?|```/g, "").trim();
      detectedItems = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON:", parseErr);
      return { success: false, error: "Gemini returned invalid JSON." };
    }

    const furnitureCount = detectedItems.filter(i => i.item_type === "furniture").length;
    const finishCount = detectedItems.filter(i => i.item_type === "finish").length;
    console.log(`Gemini detected ${detectedItems.length} items (${furnitureCount} furniture, ${finishCount} finishes).`);

    // --- 3. Search for a product link for each detected item ---
    const itemsToInsert = [];

    for (const item of detectedItems) {
      console.log(`[${item.item_type}] Searching: "${item.name}"`);
      const { link, image, price } = await findProductLink(item);

      itemsToInsert.push({
        designId,
        name: item.name,
        category: item.category,
        estimatedPrice: price && !isNaN(price) ? price : null,
        productImageUrl: image,
        shopLink: link,
      });
    }

    // --- 4. Save to database ---
    await prisma.furnitureItem.createMany({
      data: itemsToInsert,
      skipDuplicates: true,
    });

    const finalResults = await prisma.furnitureItem.findMany({
      where: { designId },
    });

    console.log(`Extraction complete: ${finalResults.length} items saved.\n`);
    return { success: true, items: finalResults };

  } catch (error) {
    console.error("extractFurniture error:", error);
    return { success: false, error: "Extraction failed." };
  }
}
