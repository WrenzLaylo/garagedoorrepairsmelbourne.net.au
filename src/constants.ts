export const CONTACT = {
  phone: "03 8789 3253",
  phoneTel: "tel:0387893253",
  emergencyPhone: "03 8789 3254",
  emergencyTel: "tel:0387893254",
  email: "enquiries@aggdoors.com.au",
  address: "Greater Melbourne, VIC",
  hours: "Mon–Fri 8:00am–5:00pm | Emergency 24/7",
} as const;

export const BUSINESS = {
  name: "Garage Door Repairs Melbourne",
  shortName: "Garage Door Repairs",
  tagline: "Fast, honest garage door repairs across Melbourne — springs, cables, motors & doors",
  parenBrand: "AGG Doors",
  parentBrandUrl: "https://www.aggdoors.com.au/",
  founded: 1999,
  domain: "https://garagedoorrepairsmelbourne.net.au",
  logo: "/assets/gdrm-header-footer-logo.png",
  logoLockup: "/site-logo.svg",
} as const;

export const PARENT_BRAND = {
  legalName: "AGG DOORS PTY. LTD.",
  tradingName: "AGG Doors",
  abn: "27 106 103 315",
  abnLookupUrl: "https://abr.business.gov.au/ABN/View?abn=27106103315",
  address: "10 Dallas Court, Hallam VIC 3803",
  mainWebsite: "https://www.aggdoors.com.au/",
  shopUrl: "https://shop.aggdoors.com.au/",
  reviewsUrl: "https://www.aggdoors.com.au/reviews/",
  founded: 1999,
  experienceLabel: "20+ years",
  reviewLabel: "700+ customer reviews",
  rating: "4.8",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Parts", href: "#parts" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "700+", label: "Customer Reviews" },
  { value: "24/7", label: "Emergency Support" },
  { value: "1–2hr", label: "Typical Repair Time" },
] as const;

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "repairs",
    icon: "Wrench",
    title: "Garage Door Repairs",
    desc: "Stuck, noisy, off-track or damaged doors — we diagnose the fault fast and restore smooth, safe operation. Most Melbourne repairs are completed in 1–2 hours once parts are confirmed.",
    features: [
      "Same-day repairs across Melbourne",
      "Panel damage and realignment",
      "Cable, spring and roller replacements",
      "No-fix no-fee on diagnosis",
    ],
  },
  {
    id: "springs-cables",
    icon: "RefreshCw",
    title: "Springs, Cables & Tracks",
    desc: "Broken springs and frayed cables are the most common cause of door failure — and a serious safety risk. We replace and tension all spring types safely, the first time.",
    features: [
      "Torsion and extension springs",
      "Cable replacement and re-termination",
      "Track realignment and replacement",
      "Safety inspection included",
    ],
  },
  {
    id: "motors-automation",
    icon: "Zap",
    title: "Motors & Openers",
    desc: "Motor not responding, grinding or skipping? We repair, replace and upgrade openers and automation — and can add electric opening to an existing manual door.",
    features: [
      "Motor repair and replacement",
      "Travel-limit and force re-calibration",
      "Smart opener integration",
      "Battery backup installation",
    ],
  },
  {
    id: "remotes-controls",
    icon: "Key",
    title: "Remotes & Wall Controls",
    desc: "Programming, repairing or replacing remotes, keypads and wall switches. We carry a full range of compatible remotes and usually sort same-day issues on the spot.",
    features: [
      "All major brand remotes in stock",
      "Remote programming and pairing",
      "Wall button and control panel repair",
      "Keypad and PIN code setup",
    ],
  },
  {
    id: "emergency",
    icon: "AlertTriangle",
    title: "Emergency Repairs",
    desc: "Door stuck open, off track or posing a safety risk? We run 24/7 emergency call-outs across Melbourne. Don't force it — call us immediately.",
    features: [
      "24 hours a day, 7 days a week",
      "Doors stuck open or closed",
      "Off-track and misaligned doors",
      "Spring snap emergency response",
    ],
  },
  {
    id: "maintenance",
    icon: "ShieldCheck",
    title: "Servicing & Maintenance",
    desc: "Annual servicing prevents costly breakdowns and extends the life of your door system. We inspect, lubricate, adjust and report on every component.",
    features: [
      "Full door and motor inspection",
      "Lubrication of all moving parts",
      "Hardware tightening and adjustment",
      "Service report and recommendations",
    ],
  },
  {
    id: "supply-install",
    icon: "PackagePlus",
    title: "New Doors & Replacement",
    desc: "Beyond repair? We supply and professionally install panel, roller and tilt doors in steel, Colorbond and timber, with full warranty on door and installation.",
    features: [
      "All major brands — B&D, Dominator, Merlin, Gliderol",
      "Steel, Colorbond and timber options",
      "Professional measurement and quote",
      "Full installation with warranty",
    ],
  },
];

export const STEPS = [
  {
    num: "01",
    title: "Tell Us What's Wrong",
    desc: "Call us or send the quote form with a photo. Describe the fault — stuck, noisy, off track — and we'll give you a clear picture of what to expect.",
  },
  {
    num: "02",
    title: "We Diagnose & Quote",
    desc: "A technician inspects the door, motor and hardware to find the root cause. You get an upfront quote before any work begins — no surprises.",
  },
  {
    num: "03",
    title: "We Fix It Properly",
    desc: "Professional repair using quality parts carried on the van where possible. We test the full door cycle and safety before leaving site.",
  },
  {
    num: "04",
    title: "You Get Peace of Mind",
    desc: "Your door runs reliably, your family is safe, and your repair is backed by workmanship warranty with AGG Doors behind it.",
  },
] as const;

export const SERVICE_AREAS = [
  "Melbourne CBD",
  "Eastern Suburbs",
  "South Eastern Suburbs",
  "Northern Suburbs",
  "Western Suburbs",
  "Bayside",
  "Mornington Peninsula",
  "Greater Melbourne",
] as const;

export interface PartItem {
  name: string;
  desc: string;
  icon: string;
}

export const PARTS: PartItem[] = [
  { name: "Remotes & Keypads", desc: "Genuine and compatible remotes, wireless keypads and wall buttons.", icon: "Key" },
  { name: "Motors & Openers", desc: "Sectional and roller door motors, smart openers and battery backups.", icon: "Zap" },
  { name: "Springs & Cables", desc: "Torsion and extension springs, lift cables and safety hardware.", icon: "RefreshCw" },
  { name: "Rollers & Tracks", desc: "Nylon rollers, hinges, track sections and bottom brackets.", icon: "Settings" },
  { name: "Receivers & Controls", desc: "Receivers, control boards, photo-eye sensors and wall consoles.", icon: "Cpu" },
  { name: "Weather Seals", desc: "Bottom seals, brush seals and perimeter weather strips.", icon: "ShieldCheck" },
];

export interface ShopProduct {
  ref: string; // mono "part code" shown on the card
  title: string;
  price: string; // "$79.00" or "" when unavailable
  category: string;
  fits: string; // short compatibility line
  image: string; // local path under /public
  href: string; // deep link to the live shop product
  available?: boolean; // false → out of stock (price hidden); undefined treated as available
}

// Real, in-stock products pulled from shop.aggdoors.com.au (curated across categories).
// Images downloaded locally to /public/assets/shop for performance.
const SHOP = "https://shop.aggdoors.com.au/products/";
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    ref: "RC-E970M",
    title: "Merlin E970M +2.0 Remote",
    price: "$79.00",
    category: "Remotes",
    fits: "Merlin Security+ 2.0",
    image: "/assets/shop/remote-merlin-e970m.jpg",
    href: `${SHOP}merlin-e970m-2-remotes`,
  },
  {
    ref: "KP-SEC20",
    title: "Merlin Wireless Security Keypad",
    price: "$137.00",
    category: "Keypads",
    fits: "Security+ 2.0 openers",
    image: "/assets/shop/keypad-merlin-security.png",
    href: `${SHOP}merlin-wireless-security-keypad-security-2-0`,
  },
  {
    ref: "WB-WTX6",
    title: "ATA WTX-6 Wireless Wall Button",
    price: "$85.00",
    category: "Wall controls",
    fits: "ATA TrioCode systems",
    image: "/assets/shop/wallbutton-ata-wtx6.jpg",
    href: `${SHOP}ata-wtx-6-triocode-premium-wireless-wall-button`,
  },
  {
    ref: "MT-MS105",
    title: "Merlin Commander Elite MS105MYQ",
    price: "$539.95",
    category: "Openers",
    fits: "Sectional / panel-lift",
    image: "/assets/shop/opener-merlin-ms105.png",
    href: `${SHOP}merlin-commander-elite-ms105myq`,
  },
  {
    ref: "MT-R1000",
    title: "LiftPro R1000 Roller Door Opener",
    price: "$430.00",
    category: "Openers",
    fits: "Roller doors",
    image: "/assets/shop/opener-liftpro-r1000.jpg",
    href: `${SHOP}liftpro-r1000-roller-door-opener`,
  },
  {
    ref: "RX-E8003",
    title: "Merlin E8003 Receiver",
    price: "$137.00",
    category: "Receivers",
    fits: "Merlin openers",
    image: "/assets/shop/receiver-merlin-e8003.jpg",
    href: `${SHOP}merlin-e8003-receiver`,
  },
  {
    ref: "SP-J90",
    title: "Tilt Door J70 / J90 Jamb Spring",
    price: "$110.00",
    category: "Springs",
    fits: "J-series tilt doors",
    image: "/assets/shop/spring-tilt-jamb.jpg",
    href: `${SHOP}tilt-door-j70-j90-jamb-type-spring`,
  },
  {
    ref: "RL-W220",
    title: "B&D Sectional Door Wheel 220mm",
    price: "$29.00",
    category: "Rollers",
    fits: "B&D Panelift",
    image: "/assets/shop/roller-bd-wheel-220.jpg",
    href: `${SHOP}b-d-sectional-panel-door-wheel-220mm`,
  },
  {
    ref: "WS-S23",
    title: "B&D Series 2 & 3 Weatherstrip",
    price: "$27.00",
    category: "Weather seals",
    fits: "B&D Series 2 / 3",
    image: "/assets/shop/seal-bd-weatherstrip.jpg",
    href: `${SHOP}b-d-series-2-3-weatherstrip-universal-series-2-3`,
  },
];

export interface TestimonialItem {
  name: string;
  suburb: string;
  rating: number;
  text: string;
  date: string;
  serviceType?: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "James T.",
    suburb: "Hawthorn",
    rating: 5,
    text: "Called late on a Friday with a door stuck open. Tech arrived within two hours, had the parts on the van and had everything sorted before dark. Absolute legends.",
    date: "Jan 2026",
    serviceType: "Emergency Repair",
  },
  {
    name: "Tom W.",
    suburb: "Essendon",
    rating: 5,
    text: "Broken spring at 7am on a work day. They had someone out by 9:30 and I was at the office by 11. Efficient, friendly, and the price matched the quote exactly.",
    date: "Dec 2025",
    serviceType: "Spring Replacement",
  },
  {
    name: "Michelle L.",
    suburb: "Glen Waverley",
    rating: 5,
    text: "Very thorough inspection and explained everything clearly before quoting. No pressure, no upselling. The new motor they installed is whisper-quiet compared to the old one.",
    date: "Jan 2026",
    serviceType: "Motor Replacement",
  },
  {
    name: "Darren E.",
    suburb: "Point Cook",
    rating: 5,
    text: "Nick came out to our home and was very professional. He popped a few dents out from the door and was on his way quickly. Will definitely recommend.",
    date: "Mar 2026",
    serviceType: "Door Panel Repair",
  },
  {
    name: "Katie H.",
    suburb: "Richmond",
    rating: 5,
    text: "Really appreciate the quick response from the team. Got my garage door back working in no time. I know how busy AGG Doors are and they still made time for us.",
    date: "Feb 2026",
    serviceType: "Motor Replacement",
  },
  {
    name: "Craig B.",
    suburb: "Werribee",
    rating: 5,
    text: "Door was coming off the tracks every few weeks. They found the root cause on the first visit — a bent rail that previous guys had missed. Fixed properly this time.",
    date: "Nov 2025",
    serviceType: "Track Repair",
  },
  {
    name: "Sophie K.",
    suburb: "Doncaster",
    rating: 5,
    text: "The team were on time, polite, and done in under an hour. New springs make such a difference — the door feels brand new. Highly recommend to anyone in Melbourne.",
    date: "Oct 2025",
    serviceType: "Spring Replacement",
  },
  {
    name: "Marcus J.",
    suburb: "Thornbury",
    rating: 5,
    text: "Emergency call on a Sunday night and they still answered. Temporary fix that night, permanent repair the next morning. Genuinely great service when I really needed it.",
    date: "Oct 2025",
    serviceType: "Emergency Repair",
  },
  {
    name: "Natalie R.",
    suburb: "Frankston",
    rating: 5,
    text: "The technician noticed a cable that was about to snap while he was fixing the spring — caught a potential emergency before it happened. That kind of thoroughness is rare.",
    date: "Aug 2025",
    serviceType: "Cable Replacement",
  },
  {
    name: "Paul H.",
    suburb: "Ringwood",
    rating: 5,
    text: "My remote stopped syncing after a power outage. Quick visit, quick fix, explained how to reprogram it myself if it happens again. Refreshingly honest and didn't overcharge.",
    date: "Sep 2025",
    serviceType: "Remote Repair",
  },
  {
    name: "Sarah M.",
    suburb: "Balwyn",
    rating: 5,
    text: "Very honest customer service. Professional recommendations saved me thousands. Very respectful towards customers and attended on time. Real down-to-earth Aussie service.",
    date: "Mar 2026",
    serviceType: "Door Repair",
  },
  {
    name: "Rob & Diane P.",
    suburb: "Brighton",
    rating: 5,
    text: "Had three quotes and AGG Doors was not only the best price but the most professional. They diagnosed the real issue, fixed it cleanly, and left the garage tidy.",
    date: "Dec 2025",
    serviceType: "Door Repair",
  },
] as const;

export type FaqTag = "Pricing" | "Timing" | "Emergency" | "Safety" | "Brands" | "Warranty";

export interface FaqItem {
  q: string;
  a: string;
  tag: FaqTag;
}

export const FAQS: FaqItem[] = [
  {
    tag: "Pricing",
    q: "How much does a garage door repair cost in Melbourne?",
    a: "Simple repairs like remote replacement or minor adjustments typically start from around $120. Larger work such as spring or motor replacement is quoted after a quick inspection. You always get an upfront, fixed quote before any work begins — no surprises.",
  },
  {
    tag: "Timing",
    q: "How fast can you repair my garage door?",
    a: "Most standard repairs are completed in 1–2 hours once the technician has inspected the door and confirmed parts are available. We carry common springs, cables, rollers and remotes on the van, and offer same-day windows across Melbourne where scheduling allows.",
  },
  {
    tag: "Emergency",
    q: "Do you offer emergency garage door repairs?",
    a: "Yes. We run 24/7 emergency call-outs across Melbourne. If your door is stuck open, off track, or poses a safety risk, call us immediately on 03 8789 3254 and we'll dispatch the fastest available technician. Please don't force the door in the meantime.",
  },
  {
    tag: "Safety",
    q: "My spring snapped — is it safe to use the door?",
    a: "No. A broken torsion or extension spring puts the full weight of the door on the opener and cables, which can fail suddenly. Don't operate the door or force the opener. Call us and we'll replace and re-tension the springs safely.",
  },
  {
    tag: "Brands",
    q: "What garage door brands and types do you repair?",
    a: "We're brand-agnostic and repair all major brands including B&D, Dominator, Merlin, Gliderol, Centurion and more — across sectional/panel-lift, roller and tilt doors. Brand support depends on part availability and system age.",
  },
  {
    tag: "Warranty",
    q: "Do you provide a warranty on repairs?",
    a: "Yes. All repairs are backed by a workmanship warranty, and parts carry manufacturer warranties where applicable. We provide a clear service report after every job, kept on file with AGG Doors for future reference.",
  },
];
