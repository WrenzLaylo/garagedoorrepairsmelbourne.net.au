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
  logo: "/favicon-mark.svg",
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

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "How much does a garage door repair cost in Melbourne?",
    a: "Simple repairs like remote replacement or minor adjustments typically start from around $120. Larger work such as spring or motor replacement is quoted after a quick inspection. You always get an upfront, fixed quote before any work begins — no surprises.",
  },
  {
    q: "How fast can you repair my garage door?",
    a: "Most standard repairs are completed in 1–2 hours once the technician has inspected the door and confirmed parts are available. We carry common springs, cables, rollers and remotes on the van, and offer same-day windows across Melbourne where scheduling allows.",
  },
  {
    q: "Do you offer emergency garage door repairs?",
    a: "Yes. We run 24/7 emergency call-outs across Melbourne. If your door is stuck open, off track, or poses a safety risk, call us immediately on 03 8789 3254 and we'll dispatch the fastest available technician. Please don't force the door in the meantime.",
  },
  {
    q: "My spring snapped — is it safe to use the door?",
    a: "No. A broken torsion or extension spring puts the full weight of the door on the opener and cables, which can fail suddenly. Don't operate the door or force the opener. Call us and we'll replace and re-tension the springs safely.",
  },
  {
    q: "What garage door brands and types do you repair?",
    a: "We're brand-agnostic and repair all major brands including B&D, Dominator, Merlin, Gliderol, Centurion and more — across sectional/panel-lift, roller and tilt doors. Brand support depends on part availability and system age.",
  },
  {
    q: "Do you provide a warranty on repairs?",
    a: "Yes. All repairs are backed by a workmanship warranty, and parts carry manufacturer warranties where applicable. We provide a clear service report after every job, kept on file with AGG Doors for future reference.",
  },
];
