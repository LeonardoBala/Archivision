export interface StyleOption {
  id: string;
  label: string;
  description: string;
  image: string;
  aiPrompt: string;
}

export const styleOptions: StyleOption[] = [
  {
    id: 'modern_minimalist',
    label: 'Modern Minimalist',
    description: 'Clean lines, uncluttered spaces, and a monochromatic palette.',
    image: 'https://media.tarkett-image.com/medium/IN_41020001_41020002_002.jpg',
    aiPrompt: `Interior design style: STRICT MODERN MINIMALIST.
WALLS: Smooth matte plaster in pure white (RAL 9010) or very light warm grey. No wallpaper, no paneling, no texture — surfaces must be perfectly flat.
FLOORS: Large format (90x90cm or 120x60cm) polished light grey porcelain tiles OR honed concrete. Grout lines must be minimal (2mm max) and match tile color exactly.
FURNITURE: Ultra-low-profile and floating — legs or plinth bases preferred over floor-standing. Every piece must be functional and free of ornamentation. Sofas in flat matte fabric (light grey or off-white). Tables in glass, matte lacquer, or white marble with a waterfall edge. CONCEALED STORAGE ONLY — no open shelving.
HARDWARE & FIXTURES: Brushed stainless steel or chrome. Recessed door handles. Frameless cabinetry.
TEXTILES: Single flat-color cushions or throws (no pattern). Maximum 1 texture variation per room.
DECOR: ZERO clutter. Maximum 1–2 large abstract art pieces on walls. 1 single sculptural object as a tabletop accent. Fresh white orchids or a single tall branch in a minimal white vessel.
LIGHTING: Recessed ceiling LED downlights (no visible fixtures). Under-shelf LED strips. If a pendant is required, it must be a single geometric form (cylinder, sphere) in matte white or matte black.
WHAT TO ABSOLUTELY AVOID: Visible decorative trim, moldings, patterned textiles, exposed cables, open bookshelves, rounded organic shapes, warm wood tones, or any surface clutter.`
  },
  {
    id: 'japandi',
    label: 'Japandi',
    description: 'A hybrid of Japanese rustic minimalism and Scandinavian functionality.',
    image: 'https://cdn.home-designing.com/wp-content/uploads/2022/01/modular-sofa-4-1024x683.jpg',
    aiPrompt: `Interior design style: JAPANDI (Japanese Wabi-Sabi + Scandinavian Hygge).
WALLS: Warm off-white or soft greige with a subtle tactile clay or limewash texture. NO bright white, NO wallpaper patterns. Exposed textured plaster adds authenticity.
FLOORS: Light ash, white oak, or bamboo parquet in a straight or herringbone lay. The wood must appear matte and natural — no high-gloss lacquer. Alternatively, warm light-toned natural stone tiles.
FURNITURE: Extremely low-slung (max 35–40cm seat height). Strong horizontal lines, slatted wood panels, and joinery-exposed construction. Upholstery in undyed linen, loose-weave bouclé, or natural wool. Sofa arms should be slim and low. Dining chairs should have a handcrafted, artisan quality. NO manufactured-looking furniture.
HARDWARE & FIXTURES: Blackened steel, dark bronze, or iron. Visible joinery (mortise-and-tenon). Pottery clay drawer pulls.
TEXTILES: Undyed linen, raw cotton, chunky knit throw, woven rush matting, tatami-inspired floor cushions.
DECOR: Wabi-sabi philosophy — single dried branch or bonsai arrangement in a handmade imperfect clay vessel. 1–2 artisan ceramic objects. Flat woven jute rug. No decorative excess.
LIGHTING: Washi paper pendant or raw ceramic globe pendant (warm 2700K bulb). Indirect floor lighting. NO harsh overhead fixtures.
WHAT TO ABSOLUTELY AVOID: High-gloss surfaces, polished chrome, printed textiles, ornate furniture legs, brightly colored accents, or any synthetic-looking material.`
  },
  {
    id: 'industrial',
    label: 'Industrial Loft',
    description: 'Raw textures, exposed elements, and urban aesthetics.',
    image: 'https://www.spiffyspools.com/wp-content/uploads/2024/10/conclusion-embrace-the-rustic-charm.png',
    aiPrompt: `Interior design style: INDUSTRIAL LOFT (converted factory/warehouse aesthetic).
WALLS: Exposed red or sand-colored brick (raw, not painted over) OR raw poured concrete with visible formwork marks. If brick is absent, bare concrete or whitewashed plaster with visible imperfections. Brick walls should show natural color variation and aged mortar.
FLOORS: Polished or sealed dark poured concrete OR heavily worn dark-stained hardwood planks with visible grain and knots. NO light or warm floors.
CEILING: Exposed black steel I-beams and joists. Exposed painted-black HVAC ductwork and conduit piping. High ceilings (minimum 3m visual height). Exposed brick chimney stacks if applicable.
FURNITURE: Reclaimed dark wood tabletops on matte black or rusted steel frames. Worn cognac or saddle leather sofas and chairs (showing natural creasing). Metal-framed factory stools. Industrial pipe shelving mounted directly onto brick walls.
HARDWARE & FIXTURES: Raw or oxidized steel, cast iron, matte black powder coat. Crittall-style black steel windows and interior doors.
TEXTILES: Minimal — a single large jute rug, canvas cushions, or worn leather throw. NO soft fluffy textiles.
DECOR: Large factory-style wall clock, Edison bulb filament lighting, vintage maps or engineering blueprints framed in black steel, mechanical objects used as sculpture (gears, pipes, gauges).
LIGHTING: Bare filament Edison bulbs in caged pendants. Matte black dome factory pendants over the dining table. Track lighting on exposed steel rails.
WHAT TO ABSOLUTELY AVOID: Light airy colors, floral textiles, polished brass, soft rounded furniture, pastel tones, or any element that looks new and pristine.`
  },
  {
    id: 'mid_century',
    label: 'Mid-Century Modern',
    description: 'Retro aesthetics from the 1950s with organic shapes.',
    image: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2022/06/Open-home-with-mid-century-modern-interior-design-2-scaled.jpeg',
    aiPrompt: `Interior design style: MID-CENTURY MODERN (1950s–1960s American and Scandinavian).
WALLS: Warm white or creamy off-white as a base. ONE bold accent wall in a period-appropriate color: mustard yellow, avocado green, burnt orange, or teal. Alternatively, warm wood paneling (vertical slats or full wall) on the accent wall.
FLOORS: Dark walnut or teak parquet in a straight strip or herringbone lay — rich, warm, and deeply grained. The floor must look mid-century in color and pattern.
FURNITURE: ICONIC tapered peg legs on EVERY piece of furniture — this is non-negotiable. Sofas with low, firm cushions, tightly upholstered in tweed, velvet, or bouclé in period colors (ochre, rust, forest green, teal). Organic kidney-shaped or tulip-form tables in fiberglass or marble. Molded plywood or fiberglass shell chairs (Eames-inspired). A credenza or sideboard with tapered legs and sliding doors is mandatory in living or dining rooms.
HARDWARE & FIXTURES: Polished brass or warm antique copper throughout — pulls, sconces, lamp bases.
TEXTILES: Graphic geometric rugs (bold pattern, high contrast), velvet or tweed upholstery, no sheer curtains — use thick panel drapes in a deep saturated color.
DECOR: Sunburst mirror or starburst clock as a wall focal point. Abstract or graphic 1950s-style artwork in bold colors. Ceramic table lamps with drum shades. 1–2 graphic sculptural objects (abstract brass sculpture, ceramic vase in an organic form).
LIGHTING: Sputnik chandelier OR atomic-era multi-arm pendant. Brass arc floor lamp beside a reading chair. Table lamps with tapered drum shades.
WHAT TO ABSOLUTELY AVOID: Chrome hardware, overly modern flat-pack looking furniture, grey tones, white legs, or anything that looks contemporary rather than period-authentic.`
  },
  {
    id: 'scandinavian',
    label: 'Scandinavian',
    description: 'Simple, functional, and cozy with a focus on light.',
    image: 'https://online.majuhome.com.my/cdn/shop/articles/scandiblog1big.jpg?v=1632986284',
    aiPrompt: `Interior design style: SCANDINAVIAN (Nordic Hygge — functional, cozy, and light-maximizing).
WALLS: Bright white (SW Extra White or RAL 9016) or the palest possible grey or sage. Walls must look freshly painted and clean. NO heavy wallpaper, NO dark tones.
FLOORS: Wide plank (15cm+ width) white-washed or very pale blonde ash or pine hardwood. The floor must look light, natural, and scrubbed clean. Alternatively, off-white large format tiles.
FURNITURE: Simple, solid, and honest construction — visible wood grain, no veneers. Sofas in white, off-white, or very light grey tight-weave linen or cotton. All furniture should sit on slim natural wood legs (birch, ash, or light pine). Dining chairs in molded plastic/wood in white or light wood. EVERYTHING must look affordable, accessible, and unpretentious.
HARDWARE & FIXTURES: Matte black (the Scandinavian accent color) or brushed nickel. Black steel-framed windows.
TEXTILES: This is where all the warmth comes from — chunky oversized wool knit throws, authentic sheepskin rug beside the sofa, cable-knit cushions, thick linen curtains in white or off-white (floor-to-ceiling, NO heavy drapes). Layer 2–3 different textures per seat.
DECOR: Simple and curated — 3–5 white or pastel candles in a tray, 1 black-and-white geometric print, a terracotta pot with a simple green plant (Monstera or Snake Plant), a stack of 3 books with linen covers.
LIGHTING: Paper or matte white sculptural pendant (Muuto Unfold or Louis Poulsen inspired). MAXIMIZE natural daylight — remove heavy curtains and replace with sheer white panels. Add a black arc floor lamp.
WHAT TO ABSOLUTELY AVOID: Dark heavy furniture, warm brown woods, floral patterns, curtains that block light, or anything that feels heavy or cluttered.`
  },
  {
    id: 'luxury_glam',
    label: 'Modern Luxury',
    description: 'Sophisticated elegance with high-end materials and finishes.',
    image: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2021/08/Glamorous-house-decor-and-room-ideas-Amelia-R.-.jpeg',
    aiPrompt: `Interior design style: MODERN LUXURY / HIGH-END GLAMOUR.
WALLS: Two options — (A) Rich jewel-tone paint (deep forest green, midnight blue, or warm burgundy) with integrated architectural lighting that makes the wall glow, OR (B) Venetian stucco plaster in a champagne or warm grey with micro-metallic shimmer. Consider full-height fluted plaster or ribbed wood paneling on the feature wall.
FLOORS: Book-matched Calacatta or Nero Marquina marble slabs (large format, 120x240cm minimum, with visible veining) OR dark herringbone oak parquet with a subtle satin finish. Floors must look expensive.
FURNITURE: Grand proportions with sweeping curves. Velvet or silk upholstery in deep jewel tones (emerald, sapphire, champagne, dusty rose). Sculptural silhouettes — curved sofas, barrel chairs, fluted bases. Gold or polished brass metal legs and accents on EVERY furniture piece. Upholstered beds with tufted or channeled headboards reaching the ceiling.
HARDWARE & FIXTURES: Polished gold, unlacquered brass, or antique brass throughout. Every handle, faucet, and fixture must look hand-selected and expensive.
TEXTILES: Oversized deep-pile wool rug, silk or velvet cushions with tassel details, cashmere throws. Curtains: floor-to-ceiling (height of room) in silk or heavyweight velvet, pooling slightly on the floor.
DECOR: Large statement mirror in a heavy sculptural gold frame. Fresh long-stem white flowers (peonies or orchids) in a tall crystal or brass vase. Designer coffee table books in a styled stack. 1–2 bespoke art pieces in gallery-quality frames.
LIGHTING: A massive oversized crystal or smoked glass chandelier (minimum 80cm diameter) as the room's statement centerpiece. Integrated LED cove lighting along ceiling edges. Architectural wall sconces flanking a mirror or bed. All lighting warm and dimmable (2700K maximum).
WHAT TO ABSOLUTELY AVOID: Anything that looks budget, mismatched metals, cool white lighting, bare bulbs, or sparse decor that makes the room feel empty rather than refined.`
  },
  {
    id: 'bohemian',
    label: 'Bohemian Chic',
    description: 'Eclectic, free-spirited, full of plants and patterns.',
    image: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2025/05/Modern-bohemian-living-room-decor-by-DECORILLA-1024x656.jpeg',
    aiPrompt: `Interior design style: BOHEMIAN CHIC (BOHO — globally inspired, maximalist, and free-spirited).
WALLS: Warm earthy clay or terracotta paint (rust, cinnamon, or dried adobe) OR a limewash paint technique showing color variation in the plaster. Consider a woven macramé wall hanging as the feature wall element (minimum 1.5m wide).
FLOORS: Layered rugs are MANDATORY — base layer of a large vintage Persian or kilim rug, topped with a smaller woven patch rug. The floors beneath should be warm wood or terracotta tiles.
FURNITURE: Low to the ground, relaxed, and eclectic — rattan or wicker armchairs, a large overstuffed sofa in a faded velvet or embroidered fabric, floor cushions and poufs arranged informally. A low carved wooden coffee table (Moroccan, Indian, or African inspired). Furniture must look collected over time, NOT matching.
HARDWARE & FIXTURES: Hammered brass, blackened iron, or hand-patinated bronze.
TEXTILES: This is the most important layer — pile on embroidered cushions (mix of sizes and patterns), a kantha quilt throw, tassel-edged blankets, and embroidered suzani fabric draped over furniture. Mix Moroccan, Indian, and Central Asian patterns confidently.
DECOR: An overwhelming abundance of indoor plants is NON-NEGOTIABLE — trailing Pothos from shelves, a large Monstera in a terracotta pot, hanging Staghorn ferns, succulents on every surface, 2–3 tall potted palms or olive trees. Add dreamcatchers, eclectic travel artifacts, stacked vintage books, dried pampas grass in a ceramic vase, woven baskets.
LIGHTING: Woven rattan pendant baskets (2–3 in a cluster), Moroccan brass lanterns on surfaces, string fairy lights draped along a wall.
WHAT TO ABSOLUTELY AVOID: Matching furniture sets, cold grey tones, minimalist bare surfaces, polished chrome, or a room with fewer than 8–10 plants visible.`
  },
  {
    id: 'coastal',
    label: 'Coastal / Hamptons',
    description: 'Airy and light, inspired by the beach and ocean.',
    image: 'https://www.thespruce.com/thmb/IVHkiXE4kLVYYQdCbXtMg0K2588=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/210915-CKI_BeachFront_25249-1848dc59ee014a8b9333d4570d136bd4-1eebfb145f2845e1b065066706bb0fee.jpg',
    aiPrompt: `Interior design style: COASTAL / HAMPTONS (relaxed, breezy, and seaside-inspired elegance).
WALLS: Crisp bright white (SW Alabaster or similar) OR white-painted shiplap or beadboard paneling (horizontal planks) for added texture and architectural interest. Consider a classic white-painted board-and-batten wainscoting up to 120cm height.
FLOORS: Wide plank (18cm+) white-washed or pale weathered oak hardwood. The wood grain must be visible but the tone must be blonde or driftwood-pale. Never dark or warm brown.
FURNITURE: Generous, oversized, and supremely comfortable — deep-seated sofas and armchairs slipcovered in crisp white or natural linen. Furniture should look like it belongs in a high-end beach house rental. A whitewashed or cerused oak coffee table or side table. Woven rattan or wicker accent chairs.
HARDWARE & FIXTURES: Antique brass or unlacquered brass for interior hardware. Polished nickel for bathroom and kitchen fixtures. Lantern-style pendants in black or antique brass.
TEXTILES: Natural and casual — chunky woven jute or sisal rugs, crisp striped blue-and-white throw pillows, linen slipcovers, and gauzy sheer white curtains (floor-to-ceiling, billowing in the breeze effect). Add 1–2 navy or deep ocean blue accent cushions.
DECOR: Large glass hurricane vases with white pillar candles, oversized glass apothecary jars with sand and shells, driftwood sculptures, woven seagrass baskets. Large abstract coastal artwork (blue/white/sand palette, NOT literal seashell prints). Fresh white hydrangeas or white peonies.
LIGHTING: Natural lantern pendants in antique brass or matte black over the dining table. White ceramic table lamps with white drum shades. Large windows must be maximally uncovered — only sheers allowed.
WHAT TO ABSOLUTELY AVOID: Literal nautical clichés (anchors, lobsters, rope accents), dark furniture, heavy drapes, warm amber lighting, or any tropical-themed decor.`
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk / Neon',
    description: 'Futuristic, high-tech visuals with neon lighting.',
    image: 'https://live.cdn.renderosity.com/gallery/items/3132827/images/2135706/edef207e94db11843227d7837d9bd9c3_original.jpg',
    aiPrompt: `Interior design style: CYBERPUNK / HIGH-TECH DYSTOPIAN FUTURISM.
WALLS: Matte dark gunmetal grey or near-black (not pure black). Consider integrated modular tech panels with backlit edges, or exposed raw concrete with embedded LED grid lines glowing in neon colors. Smoked glass partitions with backlit edges.
FLOORS: Highly reflective dark surfaces — polished black epoxy resin OR dark grey large format tiles (120x120cm) with ultra-narrow joints. The floor should act as a mirror for the neon lights above.
FURNITURE: Angular, sharp-edged, and aggressively modern. Low platform seating in black or dark grey synthetic leather (NO natural materials). Modular seating that looks configurable. Desks with integrated cable management. All furniture in matte black, gunmetal, or translucent smoked acrylic/glass.
HARDWARE & FIXTURES: Brushed dark gunmetal or matte black anodized aluminum. NO warm metals — no brass, no copper, no gold.
TEXTILES: Minimal — synthetic fabrics only. Black faux leather or vinyl. Geometric metallic mesh. Absolutely NO natural fabrics.
DECOR: Holographic surface stickers, glowing LED strip-outlined art frames, technical displays (screens showing code/data), carbon fiber textures used as decorative panels, metallic geometric sculptures.
LIGHTING: THE LIGHTING IS THE ENTIRE DESIGN. Mandatory: glowing cyan/electric blue neon LED strips tracing architectural edges, under furniture, along wall panels, and embedded in floor channels. Magenta neon accent strips. Deep purple ambient glow from hidden ceiling coves. Sharp white spotlights. ALL light sources must be visible as glowing elements — NO hidden recessed lights. The room should look like a scene from Blade Runner.
WHAT TO ABSOLUTELY AVOID: Natural wood, plants, warm amber light, linen, cotton, rattan, warm metallic hardware, or any element that appears organic or natural.`
  },
  {
    id: 'art_deco',
    label: 'Art Deco',
    description: 'Bold geometric shapes and rich colors from the 1920s.',
    image: 'https://cdn.mos.cms.futurecdn.net/Q83MHeAc9ve2rPQYi2vjtE.jpg',
    aiPrompt: `Interior design style: CLASSIC ART DECO (1920s–1930s Great Gatsby era).
WALLS: Rich and saturated jewel tones — deep emerald green, sapphire blue, or ivory with bold stepped geometric wallpaper or paneling. Mandatory: wainscoting or full-height fluted plaster pilasters flanking the main focal point. Consider a geometric chevron or fan wallpaper on the feature wall.
FLOORS: Dramatic inlaid geometric mosaic tiles in black and white (or black and gold) arranged in a sunburst or chevron pattern. Alternatively, very dark espresso lacquered parquet in a chevron lay.
FURNITURE: STRICTLY symmetrical layout — matching furniture on either side of the central axis. Curved but structured silhouettes — a sweeping half-circle or tuxedo sofa, barrel chairs. All upholstery in rich jewel-tone velvet (emerald, sapphire, ruby) with piped seam detailing. Lacquered wood or mirrored furniture with geometric inlay.
HARDWARE & FIXTURES: Polished gold or warm brass — handles, frames, light fixtures, and trim must all be in the same warm gold finish. Chrome is NOT appropriate.
TEXTILES: Deep pile or looped geometric-patterned rug (black and gold, or jewel tones). Velvet curtains in a rich color with gold rope tiebacks, floor-to-ceiling.
DECOR: Sunburst mirror (mandatory on a primary wall). Stylized animal sculptures in bronze or gilded resin. Stepped geometric vases in black lacquer or emerald glass. Geometric patterned throw cushions.
LIGHTING: Tiered Art Deco chandelier with frosted glass shades and brass structure (not crystal). Geometric wall sconces in brass flanking the fireplace or headboard. Backlit glass panels integrated into the walls.
WHAT TO ABSOLUTELY AVOID: Asymmetry, raw natural materials, Scandinavian simplicity, cool grey tones, chrome hardware, or any casual or informal design element.`
  },
  {
    id: 'biophilic',
    label: 'Biophilic / Nature',
    description: 'Bringing the outdoors in with living walls and natural light.',
    image: 'https://www.realsimple.com/thmb/e2QMxnMsHYerc6HgN0by-Af1Mzo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Biophilic-design-GettyImages-1495562586-2-a84bfa4c9adc49258bbbd8cc807b672c.jpg',
    aiPrompt: `Interior design style: ADVANCED BIOPHILIC DESIGN (total integration of the natural world into the built environment).
WALLS: A full living green wall (vertical garden) covering the primary feature wall — dense, lush, and varied with ferns, moss, trailing pothos, and air plants. Alternatively, rough-hewn natural stone cladding with visible texture variation, or raw cedar or Douglas fir wood slat panels. NO smooth painted plaster walls.
FLOORS: Continuous natural stone tiles (tumbled travertine, rough slate, or warm sandstone) OR real reclaimed wide plank hardwood with an oiled matte finish (showing knots and grain). The floor should feel like it belongs in a forest clearing.
FURNITURE: Flowing organic shapes — no sharp corners anywhere. Live-edge solid wood dining tables (single slab). Sofas with flowing sculptural frames in natural rattan or bent wood, upholstered in undyed linen or natural hemp. Consider seating directly integrated into a raised wooden platform.
HARDWARE & FIXTURES: Blackened steel, raw copper (patinated, not polished), or hand-forged iron.
TEXTILES: Natural and unprocessed — undyed linen, raw jute, and chunky hand-knotted wool rugs in earthy natural tones.
DECOR: Abundant large-scale indoor trees integrated directly into the floor (Ficus, Olive, or fig tree in a massive stone planter). Trailing plants from every surface and shelf. An indoor water feature (pebble-lined channel or wall-mounted stone waterfall). Geode or raw crystal objects. Driftwood sculptures.
LIGHTING: Mimic dappled forest canopy light — pendants with woven rattan shades that create patterned light and shadow. Large skylights if possible. Warm 2700K LEDs embedded in the living wall to highlight greenery.
WHAT TO ABSOLUTELY AVOID: Synthetic materials, cool white lighting, sharp geometric forms, polished chrome, printed textiles, or any surface that cannot be found in nature.`
  },
  {
    id: 'transitional',
    label: 'Transitional',
    description: 'A balanced blend of traditional and modern elements.',
    image: 'https://www.thespruce.com/thmb/7d-YVMPtKh6OL5MLlMTzHlKeqsU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9ca65e_060cffceac87415aa955f1e85ee89729mv2-56ca672531f74be69dfe95b77265d8c4.jpeg',
    aiPrompt: `Interior design style: TRANSITIONAL (the sophisticated middle ground between traditional warmth and contemporary clarity).
WALLS: Warm greige or greyed-beige paint in a flat or eggshell finish (Agreeable Gray SW 7029 or similar). Consider adding traditional white-painted board-and-batten wainscoting up to chair-rail height (90cm) for architectural character. Crown molding at the ceiling is appropriate.
FLOORS: Medium-toned hardwood (natural oak or warm walnut) in a straight wide plank lay (12–18cm width). The floor should be warm but not overly dark or light.
FURNITURE: Familiar classic silhouettes that have been simplified and modernized — a Chesterfield sofa with low arms instead of high-rolled ones, a traditional wingback chair reupholstered in a modern flat fabric. Furniture legs should be turned or tapered wood (traditional form) but in a clean painted or natural finish. Matching pairs of everything (lamps, chairs, side tables) for balance.
HARDWARE & FIXTURES: Brushed nickel or oil-rubbed bronze — both work in transitional spaces and should be used consistently.
TEXTILES: Plush and comfortable — chenille, suede-look microfiber, or textured tight-weave linen in warm neutral tones (greige, warm cream, soft taupe). 1 subtle classic pattern is allowed (herringbone, small-scale geometric, or a tonal damask) — NOT florals.
DECOR: Symmetrical vignettes — matching lamps, paired artwork, symmetrical accessory groupings. Oversized abstract art in a traditional gilded frame (the key transitional tension). A large neutral area rug that bridges the furniture grouping.
LIGHTING: A traditional chandelier or pendant form but executed in a simplified, modern material (matte black metal, antique bronze, or brushed nickel — NOT crystal). Table lamps with white or linen drum shades.
WHAT TO ABSOLUTELY AVOID: Heavy ornate carvings, floral chintz fabrics, highly polished finishes, cold modern materials (concrete, glass-only furniture), or an overly casual relaxed aesthetic.`
  }
];
