export interface MoodOption {
  id: string;
  label: string;
  description: string;
  colors: string[];
  aiPrompt: string;
}

export const moodOptions: MoodOption[] = [
  {
    id: 'organic_modern',
    label: 'Organic Modern',
    description: 'Warm neutrals, creams, and soft oak tones.',
    colors: ['bg-[#F5F5F0]', 'bg-[#E6DCC3]', 'bg-[#8C7E6A]'],
    aiPrompt: `Color palette and atmosphere: ORGANIC MODERN.
WALL COLOR: Warm creamy off-white — think the color of fresh cream or unbleached linen. Not stark white, not yellow — a softly warm white with a slight beige undertone (like Farrow & Ball "Pointing" or SW "Antique White").
FLOOR COLOR: Light natural oak — blonde, warm, and grained. Matte or satin finish. NOT white-washed, NOT dark brown.
PRIMARY (60%): Creamy soft whites and warm beige tones dominate large surfaces — walls, upholstery base, rugs.
SECONDARY (30%): Natural warm oak wood on furniture, shelving, and flooring. Soft sand and warm taupe on secondary textiles.
ACCENT (10%): Warm walnut brown or dark chocolate on small objects, cushions, or a single furniture piece.
MATERIALS: Matte plaster, natural oak wood, undyed linen, raw cotton, unglazed terracotta, light stone.
LIGHTING TEMPERATURE: Warm white only — 2700K. The light should feel like late afternoon sun. NO cool white or daylight bulbs.
MOOD: Calm, grounded, natural, and spa-like. Like a high-end wellness retreat.`
  },
  {
    id: 'japandi_neutrals',
    label: 'Japandi Neutrals',
    description: 'Balanced mix of cool greys and warm wood.',
    colors: ['bg-[#D4D4D8]', 'bg-[#A1A1AA]', 'bg-[#57534E]'],
    aiPrompt: `Color palette and atmosphere: JAPANDI NEUTRALS.
WALL COLOR: Cool light grey with a barely-there warm undertone — the color of raw concrete or river stone. NOT pure grey, NOT warm beige. Think a desaturated greige.
FLOOR COLOR: Warm light ash or white oak — pale but with visible natural wood grain. NOT painted white, NOT dark.
PRIMARY (60%): Pale cool greys and off-whites on walls and large upholstered surfaces.
SECONDARY (30%): Warm natural oak and light ash wood tones on all furniture and built-ins.
ACCENT (10%): Matte charcoal or near-black for hardware, lighting fixtures, and thin structural elements (lamp stems, picture frames).
MATERIALS: Raw clay plaster, light ash wood, washi paper, undyed linen, brushed black steel, handmade ceramics.
LIGHTING TEMPERATURE: 2700K warm white for ambient, slightly cooler (3000K) for task areas. The contrast creates the Japanese concept of shadow and light.
MOOD: Deeply zen, restful, balanced, and quietly sophisticated. Every object feels intentional.`
  },
  {
    id: 'moody_dramatic',
    label: 'Moody & Dramatic',
    description: 'Deep charcoal, black, and rich accents.',
    colors: ['bg-[#18181B]', 'bg-[#27272A]', 'bg-[#4B5563]'],
    aiPrompt: `Color palette and atmosphere: MOODY AND DRAMATIC.
WALL COLOR: Deep matte charcoal — the color of slate or a stormy night sky. NOT pure black. Think "Railings" by Farrow & Ball or "Iron Ore" SW. The walls should absorb light, not reflect it. Matte or flat finish only.
FLOOR COLOR: Dark, rich, nearly espresso hardwood OR dark grey large-format stone tiles. The floor and walls should be close in tone — this creates the cocoon effect.
PRIMARY (60%): Dark charcoal and near-black dominate the entire room — walls, large furniture, rugs.
SECONDARY (30%): Dark warm tones — charred wood, dark cognac leather, deep navy, or very dark forest green introduce subtle richness.
ACCENT (10%): Warm metallic accents only — aged brass, dull gold, or oxidized bronze on light fixtures, hardware, and small objects. These accents glow warmly against the dark background.
MATERIALS: Matte plaster, dark oak, aged leather, black-stained linen, smoked glass, brass.
LIGHTING TEMPERATURE: VERY warm — 2200K to 2700K maximum. Candlelight-warm Edison bulbs. Low ambient lighting with strategic pools of warm light. NO bright overhead illumination.
MOOD: Sophisticated, masculine, cinematic, and enveloping. Like a private members club or a luxury hotel bar.`
  },
  {
    id: 'earth_sage',
    label: 'Earthy Sage',
    description: 'Biophilic greens and natural stone tones.',
    colors: ['bg-[#D1FAE5]', 'bg-[#34D399]', 'bg-[#064E3B]'],
    aiPrompt: `Color palette and atmosphere: EARTHY BIOPHILIC SAGE.
WALL COLOR: Muted sage green or dusty olive — the color of dried eucalyptus leaves or Mediterranean herbs. NOT bright lime green, NOT dark forest green. Think Farrow & Ball "Mizzle" or a greyed, dusty olive.
FLOOR COLOR: Warm natural stone — travertine, warm sandstone, or matte terracotta tiles. Alternatively, warm oak parquet with a slight honey tone.
PRIMARY (60%): Muted sage, dusty olive, and soft warm grey-green on walls and large upholstered surfaces.
SECONDARY (30%): Natural stone beige, sandy terracotta, and warm raw wood on furniture and floors.
ACCENT (10%): Deep rich forest green or dark bronze on cushions, plant pots, and hardware — to anchor the lighter greens.
MATERIALS: Raw clay plaster, travertine stone, warm oak, unglazed terracotta, jute, natural hemp, live plants throughout.
LIGHTING TEMPERATURE: Warm 2700K with an emphasis on natural daylight. The room should feel sun-drenched and restorative.
MOOD: Grounding, restorative, connected to nature, and serene. Like a high-end botanical spa.`
  },
  {
    id: 'terracotta_sunset',
    label: 'Terracotta & Clay',
    description: 'Warm rust, clay, and desert-inspired tones.',
    colors: ['bg-[#FFEDD5]', 'bg-[#FB923C]', 'bg-[#9A3412]'],
    aiPrompt: `Color palette and atmosphere: TERRACOTTA AND DESERT CLAY.
WALL COLOR: Sun-baked terracotta clay — warm, earthy, and saturated. Think the color of Mexican pottery or Moroccan earth. NOT bright orange, NOT pastel peach. A deep, warm, dusty terra cotta (like Farrow & Ball "Red Earth" desaturated by 30%).
FLOOR COLOR: Raw terracotta encaustic or Moorish cement tiles in warm ochre and terra cotta tones, OR warm honey-toned unfinished hardwood.
PRIMARY (60%): Warm terracotta and clay tones dominate — walls, large textiles, ceramic vessels.
SECONDARY (30%): Sandy ochre, warm desert sand, and faded adobe tones on upholstery and rugs.
ACCENT (10%): Deep burnt rust or dark burgundy on cushions, throws, and small decor. Occasional raw copper or hammered brass hardware.
MATERIALS: Rough limewash plaster, encaustic clay tiles, woven palm, rattan, weathered wood, hammered copper, unglazed ceramics.
LIGHTING TEMPERATURE: Very warm — 2200K to 2700K. The room should feel bathed in the golden light of a Mediterranean sunset.
MOOD: Warm, sensory-rich, Mediterranean and Moroccan influence, deeply tactile, and boldly earthen.`
  },
  {
    id: 'coastal_breeze',
    label: 'Coastal Breeze',
    description: 'Serene blues, crisp whites, and sand.',
    colors: ['bg-[#E0F2FE]', 'bg-[#7DD3FC]', 'bg-[#0C4A6E]'],
    aiPrompt: `Color palette and atmosphere: COASTAL BREEZE.
WALL COLOR: Crisp, clean white — pure and bright, like sea foam on a sunny day (SW Alabaster or RAL 9016). No warm undertones, but NOT a cool blue-white either. Clean and clear.
FLOOR COLOR: Pale, bleached, wide-plank driftwood-toned hardwood. The color of whitened oak left in the sun. Very pale, almost silvery-beige in tone.
PRIMARY (60%): Bright white and very pale sand tones on walls, upholstery, and large rugs.
SECONDARY (30%): Soft sky blue and pale ocean blue on cushions, artwork, and secondary textiles. Use a muted, washed version — NOT electric blue.
ACCENT (10%): Deep navy blue on 1–2 statement cushions, a throw, or a ceramic vase. Anchors the lighter blues.
MATERIALS: Washed linen, chunky jute, whitewashed oak, sea glass, natural rattan, weathered bleached wood.
LIGHTING TEMPERATURE: Cool-to-neutral, 3000–3500K. The room should feel bright and sun-flooded, mimicking natural coastal daylight.
MOOD: Breezy, airy, relaxed, endlessly summery, and effortlessly elegant.`
  },
  {
    id: 'classic_greyscale',
    label: 'Classic Greyscale',
    description: 'Timeless monochrome black, white, and grey.',
    colors: ['bg-[#FFFFFF]', 'bg-[#9CA3AF]', 'bg-[#000000]'],
    aiPrompt: `Color palette and atmosphere: CLASSIC MONOCHROMATIC GREYSCALE.
WALL COLOR: Pure bright white on main walls (RAL 9016 or SW Extra White). Consider one accent wall in mid-tone grey (the color of concrete dust — neither warm nor cool).
FLOOR COLOR: Polished light grey large format tiles OR very dark charcoal grey / nearly black stained hardwood — choose one of the extremes, not a medium tone.
PRIMARY (60%): Pure white and light grey on walls and large surfaces. The room's base must be clean and high-contrast.
SECONDARY (30%): Medium grey on upholstery, secondary textiles, and large rugs.
ACCENT (10%): Pure matte black on furniture legs, lighting fixtures, hardware, and thin graphic elements. The black and white contrast is the entire design statement.
MATERIALS: Polished stone, matte lacquer, crisp white linen, grey wool, matte black steel.
LIGHTING TEMPERATURE: Neutral to cool — 3000K to 3500K. This is not a cozy warm space — it should feel sharp, high-contrast, and architectural.
MOOD: Timeless, graphic, editorial, razor-sharp, and effortlessly chic.`
  },
  {
    id: 'lux_gold',
    label: 'Luxury Gold & Cream',
    description: 'Rich creams with elegant metallic gold accents.',
    colors: ['bg-[#FAFAF9]', 'bg-[#FDE68A]', 'bg-[#B45309]'],
    aiPrompt: `Color palette and atmosphere: LUXURY GOLD AND CREAM.
WALL COLOR: Warm, soft champagne or ivory — the color of aged cream silk or the inside of a luxury jewelry box. Not bright white, not yellow. A deeply sophisticated warm off-white (Farrow & Ball "White Tie" or "Dimity").
FLOOR COLOR: Deep rich walnut or espresso herringbone parquet with a satin finish, OR book-matched cream marble with subtle gold veining.
PRIMARY (60%): Warm ivory, champagne, and soft cream on walls, upholstery, rugs, and curtains. The room should feel enveloped in warmth and softness.
SECONDARY (30%): Warm walnut or rich dark wood tones on furniture, flooring, and carved details — providing grounding depth against the light base.
ACCENT (10%): POLISHED WARM GOLD and brass as the signature metallic — on light fixtures, furniture legs, handles, mirror frames, and decorative objects. The gold should catch the light and glow warmly.
MATERIALS: Velvet in ivory or champagne, silk curtains, polished Calacatta marble with gold veining, aged unlacquered brass, cashmere, dark walnut wood.
LIGHTING TEMPERATURE: Very warm — 2700K maximum. Candlelight-warm. The gold accents should appear to glow under the warm light.
MOOD: Deeply opulent, feminine, timeless, and indulgently luxurious. Like the suite of a grand European hotel.`
  },
  {
    id: 'navy_industrial',
    label: 'Industrial Navy',
    description: 'Deep blue paired with brick and leather.',
    colors: ['bg-[#1E3A8A]', 'bg-[#78350F]', 'bg-[#4B5563]'],
    aiPrompt: `Color palette and atmosphere: INDUSTRIAL NAVY.
WALL COLOR: Exposed raw brick (natural red-orange tone) on the feature wall. Remaining walls in a deep navy blue paint (the color of a naval officer's coat — dark, rich, and saturated, like Farrow & Ball "Hague Blue" or SW "Naval").
FLOOR COLOR: Very dark stained hardwood — almost espresso — OR polished dark grey industrial concrete. The floor must look worn and aged, not pristine.
PRIMARY (60%): Deep navy blue and exposed brick red dominate the room — bold, dark, and immersive.
SECONDARY (30%): Dark warm cognac or saddle leather on large upholstered furniture — aged, natural, and slightly distressed.
ACCENT (10%): Raw concrete grey on secondary surfaces and objects. Occasional aged copper or oxidized bronze hardware — NOT polished gold.
MATERIALS: Exposed brick, dark stained oak, worn full-grain leather, raw steel, poured concrete, aged copper.
LIGHTING TEMPERATURE: Warm 2700K Edison bulb filament style. Industrial bare-bulb pendants create dramatic pools of warm amber light against the dark navy walls.
MOOD: Powerful, masculine, storied, and dramatic. Like a private library in a converted Victorian warehouse.`
  },
];
