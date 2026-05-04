import {
  Sofa, BedDouble, Utensils, Bath, Monitor,
  Coffee, Home, Baby, Warehouse,
  Trees, ChefHat, DoorOpen
} from 'lucide-react';

export interface RoomOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  aiDescription: string;
}

export const roomOptions: RoomOption[] = [
  {
    id: 'living',
    label: 'Living Room',
    icon: <Sofa className="w-5 h-5" />,
    aiDescription: "A central gathering and entertainment space. LAYOUT: Position the sofa as the room's spine — float it at least 45cm from the walls, facing a clear focal point (media console, fireplace, or feature wall). Place a coffee table centered in front of the sofa with 40–50cm of clearance for legroom. Add one or two accent chairs at 90° angles to complete the conversation zone. FURNITURE REQUIRED: 1 main sofa (2.5–3m), 1 central coffee table, 1–2 accent chairs, 1 side table, 1 media console or feature element, 1 large area rug (must extend under front legs of all seating). LIGHTING: Three layers — recessed ambient overhead, a statement floor lamp beside an accent chair, and a table lamp on a side surface. AVOID: Furniture pushed flat against every wall, visible TV cables, overhead lighting only, or a rug too small for the seating group."
  },
  {
    id: 'master_bedroom',
    label: 'Master Bedroom',
    icon: <BedDouble className="w-5 h-5" />,
    aiDescription: "A luxury sleep sanctuary optimized for rest and privacy. LAYOUT: The bed must be the undisputed focal point, centered on the main wall (usually opposite the door or facing a window), with at least 70cm of clearance on both sides for nightstands and circulation. FURNITURE REQUIRED: 1 king or queen-sized bed with an upholstered or solid headboard that reaches at least 120cm high, 2 matching bedside tables at mattress height (50–60cm), bedside reading lights, 1 large wardrobe or built-in closet, 1 accent chair or small bench at the foot of the bed, 1 large area rug extending at least 60cm beyond both sides of the bed. TEXTILES: Layer the bed with a base duvet, a folded throw at the foot, and 4–6 styled cushions. LIGHTING: Soft, dimmable ambient lighting — wall sconces flanking the bed headboard are ideal. AVOID: A bed pushed into a corner, a single overhead bare bulb, visible storage mess, or clutter on nightstands."
  },
  {
    id: 'guest_bedroom',
    label: 'Guest / Single Room',
    icon: <BedDouble className="w-5 h-5 scale-90" />,
    aiDescription: "A compact, functional, and hotel-like room for a single occupant or guests. LAYOUT: Maximize floor space by positioning the bed against the longest wall with at least 60cm of walkway clearance. If space allows, add a small desk or vanity in a corner near a window for natural light. FURNITURE REQUIRED: 1 twin or double bed with a clean headboard, 1 compact nightstand, 1 small desk or writing table with a task chair, 1 wardrobe or tall dresser, 1 small area rug beside the bed. TEXTILES: Crisp, hotel-standard bedding — white or neutral duvet, 2–4 styled pillows. LIGHTING: Bedside reading lamp, desk task lamp, and soft ambient ceiling light. The room should feel universally neutral and welcoming. AVOID: Overly personal decor, clutter, too-large furniture that blocks circulation, or a dark and cramped atmosphere."
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <ChefHat className="w-5 h-5" />,
    aiDescription: "A high-performance culinary workspace where ergonomics and aesthetics must coexist. LAYOUT: Respect the kitchen work triangle — sink, cooktop, and refrigerator must form a triangle with sides between 1.2–2.7m. Include a minimum of 90cm of continuous countertop on each side of the cooktop. ELEMENTS REQUIRED: Floor-to-ceiling or full-height cabinetry for a seamless look, integrated or panel-ready appliances where possible, a kitchen island or breakfast bar if footprint allows (minimum 1m of clearance around it), undermount sink with a designer faucet, range hood above the cooktop (integrated or statement piece). SURFACES: Countertops must look premium — quartz, natural stone, or solid matte wood. Backsplash should be a design statement (large format tiles, zellige, or slab continuation). LIGHTING: Under-cabinet LED strips for task lighting + a statement pendant over the island. AVOID: Cluttered countertops, mismatched appliances, cheap-looking laminate surfaces, or a single overhead fluorescent light."
  },
  {
    id: 'dining',
    label: 'Dining Room',
    icon: <Utensils className="w-5 h-5" />,
    aiDescription: "A dedicated and theatrical dining space anchored by a table and overhead light as a unified composition. LAYOUT: The dining table must be centered in the room with a minimum of 90cm of clearance on all sides for comfortable chair pull-out and guest circulation. FURNITURE REQUIRED: 1 rectangular or oval dining table proportional to the room (allow 60cm width per place setting), dining chairs (one design — mixing must be intentional), 1 sideboard or credenza against a wall for storage and display, a large statement pendant or chandelier centered EXACTLY over the table at 70–80cm above the tabletop. STYLING: Set the table with placemats, a central decorative object (sculpture, vase with tall branches, or candles), and napkin rings. Add large-scale wall art behind the sideboard. LIGHTING: The pendant over the table is the room's star — it must be oversized and intentional. Add a dimmer to create an intimate atmosphere. AVOID: A pendant that is too small for the table, chairs too far from the table, or a bare sideboard."
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: <Bath className="w-5 h-5" />,
    aiDescription: "A spa-grade bathroom where every surface and fixture must look premium and intentional. LAYOUT: Separate the wet zone (shower/tub) from the dry zone (vanity) clearly. Ensure at least 70cm of clearance in front of the toilet and vanity. ELEMENTS REQUIRED: A floating vanity cabinet (wall-hung, not floor-standing) with an integrated or undermount basin, a large backlit or LED-framed mirror above the vanity spanning its full width, polished or brushed metal fixtures (faucet, towel bars, shower head) in a single consistent finish, a walk-in shower with frameless glass panel or a freestanding soaking tub if space permits, large format floor tiles (minimum 60x60cm) and matching or complementary wall tiles. SURFACES: Materials must look luxurious — marble effect, zellige, or large format porcelain. Grout lines should be minimal and tight. LIGHTING: Bright, even task lighting flanking the mirror (not overhead, which causes shadows on the face). Add soft ambient ceiling light. AVOID: Visible grout with inconsistent widths, mismatched fixture finishes, a single bathroom vanity light above the mirror, or a shower curtain instead of a glass screen."
  },
  {
    id: 'kids_room',
    label: 'Kids Room',
    icon: <Baby className="w-5 h-5" />,
    aiDescription: "A safe, imaginative, and multi-functional space that supports sleeping, playing, and learning. LAYOUT: Position the bed away from windows (avoid direct light during naps). Dedicate a clear floor area with a play rug at least 1.5x2m for play. Place the study desk near a window to benefit from natural light without screen glare. FURNITURE REQUIRED: 1 single or bunk bed with rounded corners and guardrails if elevated, 1 low toy storage unit accessible to the child (max 70cm height), 1 small desk and ergonomic chair, 1 bookshelf with forward-facing display capacity, 1 large soft play rug. STYLING: Use a clear thematic color palette — avoid using more than 3 colors. Add wall art at child's eye level (80–100cm from floor). The room should feel fun and organized, not chaotic. LIGHTING: Bright uniform ambient lighting + a dedicated desk task lamp + a soft warm nightlight near the bed. AVOID: Sharp furniture corners, choking-hazard decor on low surfaces, dark heavy window treatments, or overwhelming clutter."
  },
  {
    id: 'office',
    label: 'Home Office',
    icon: <Monitor className="w-5 h-5" />,
    aiDescription: "A distraction-free, ergonomic workspace engineered for long-hour productivity and professional video calls. LAYOUT: Position the primary desk to face the room (not a wall, if possible) and place it perpendicular to or slightly angled from the window — NEVER directly facing a window (screen glare) or with a window directly behind (backlighting on calls). FURNITURE REQUIRED: 1 large desk (minimum 150x70cm), 1 high-quality ergonomic chair in a style consistent with the room aesthetic, 1 bookshelf or tall storage unit, 1 small side table or credenza. Behind the desk (the on-camera wall for video calls) must be curated and visually professional: a styled bookshelf, a gallery wall, or a feature wall element. LIGHTING: 1 focused desk task lamp (positioned left or right of the monitor, not behind it), soft directional overhead ambient light, and if possible, a ring light or face-forward natural light source for call quality. AVOID: A blank white wall as the video call backdrop, a chair visible from outside the frame, excessive clutter on the desk surface, or overhead lighting that casts heavy shadows."
  },
  {
    id: 'entryway',
    label: 'Entryway / Hall',
    icon: <DoorOpen className="w-5 h-5" />,
    aiDescription: "A compact but impactful transitional zone that sets the entire home's design tone within 2–3 seconds of entering. LAYOUT: The entryway must have a functional 'drop zone' immediately upon entry — a console table, a bench, or a built-in mudroom unit. Include a mirror (minimum 60cm wide) at eye level to visually expand the space and serve a practical function. Add hooks or a coat stand if no closet is present. FURNITURE REQUIRED: 1 console table or entryway bench with storage, 1 large mirror (leaning or wall-mounted), 1 statement light fixture overhead (pendant or flush mount), 1 decorative object on the console (vase, sculpture, or tray), 1 durable area rug or runner that anchors the space and conceals foot traffic wear. SURFACES: Flooring must visually appear highly durable — stone, large format tiles, or sealed hardwood. LIGHTING: A statement fixture at the entry ceiling is mandatory — this is the first impression. AVOID: A bare console table with nothing styled on it, a single recessed light, a dark and uninviting corridor, or a rug too small for the space."
  },
  {
    id: 'outdoor',
    label: 'Patio / Outdoor',
    icon: <Trees className="w-5 h-5" />,
    aiDescription: "A well-designed exterior living zone that feels like a seamless extension of the interior, not an afterthought. LAYOUT: Define a clear seating zone (lounge or dining) anchored by an outdoor rug. If both zones are included, separate them with planters or a level change. FURNITURE REQUIRED: Weather-resistant lounge chairs or a sofa set (teak, powder-coated aluminum, or all-weather rattan), a low outdoor coffee table, OR a full dining set if the function is dining. Include large architectural planters with tall plants (olive tree, bamboo, or ornamental grass) to create privacy screening and vertical interest. SURFACES: Flooring must look high-end — large format exterior porcelain, natural stone pavers, or composite decking with tight joints. LIGHTING: String lights overhead (catenary style, not fairy lights), wall-mounted exterior sconces flanking a door or gate, and ground-level path lighting. AVOID: Plastic garden furniture, a single bare bulb, a completely empty patio with only chairs and nothing else, or no greenery whatsoever."
  },
  {
    id: 'garage',
    label: 'Garage / Gym',
    icon: <Warehouse className="w-5 h-5" />,
    aiDescription: "A high-performance utilitarian space with a clean, organized, and purposeful aesthetic — whether used as a home gym or a workshop/garage. LAYOUT FOR GYM: Define functional zones — a cardio zone (treadmill, bike), a strength zone (rack, dumbbells on a wall-mounted rack), and a stretching/mat zone (minimum 2x3m of clear rubber flooring). Mount large mirrors covering a full wall to visually expand the space and allow form correction. FURNITURE/EQUIPMENT: Heavy-duty shelving along the walls for equipment storage, rubber-tile or interlocking foam flooring in the workout area, a water station (small counter or shelf with a mini-fridge), and optionally a wall-mounted TV. FOR GARAGE: Maximise vertical storage with wall-mounted rail systems and cabinets, epoxy-sealed concrete floor, overhead LED shop lights for even brightness. LIGHTING (GYM): Bright, uniform, high-CRI LED panels that eliminate shadows — avoid warm mood lighting for a gym. AVOID: Carpet, visible clutter on the floor, a single bare overhead bulb, or equipment stacked randomly without designated spots."
  },
  {
    id: 'commercial',
    label: 'Commercial / Shop',
    icon: <Coffee className="w-5 h-5" />,
    aiDescription: "A brand-defining, customer-facing commercial interior that must be both highly functional and deeply photogenic. LAYOUT: Design for a clear customer circulation path that naturally flows past all display or seating areas. Create a visual focal point immediately visible from the entrance (a feature wall, a hero product display, or a signature bar/counter). If a cafe: Include a service bar centered against the back wall, 4–6 tables (mix of 2-seater and 4-seater), and counter seating along a window if available. If retail: Dedicate the perimeter to shelving and the center floor to display islands with 90cm of aisle clearance. SURFACES: Statement flooring (geometric tiles, polished concrete, or herringbone wood) is non-negotiable. The bar/counter front must be a design moment (zellige tiles, fluted panels, stone). LIGHTING: Theatrical and layered — use track lighting to spotlight products or food displays, pendant clusters over the bar, and warm ambient downlights for the seating area. AVOID: Fluorescent overhead strips, a bare and uninspiring counter, generic furniture with no design identity, or a lack of a clear brand focal point."
  },
];
