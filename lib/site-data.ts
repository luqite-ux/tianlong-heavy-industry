import {
  BadgeCheck,
  Boxes,
  Factory,
  Gauge,
  Globe2,
  Handshake,
  Layers3,
  Settings2,
  ShieldCheck,
  Workflow
} from "lucide-react";

export const defaultLocale = "en" as const;
export const supportedLocales = ["en"] as const;

export const company = {
  brand: "TIANLONG",
  name: "Qingdao Tianlong Heavy Industry Co., Ltd.",
  adminDisplayName: "青岛天珑重工有限公司",
  address: "Tongli Road 9, Tianzhuang Industrial Park, Pingdu, Qingdao, Shandong, China",
  phones: ["+86 135 7321 8106", "+86 176 6397 0677"],
  founded: "2021",
  tagline: "Automated foundry machinery built for efficient molding lines."
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Quality", href: "/quality" },
  { label: "Projects", href: "/projects" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export const metrics = [
  { value: "12,250 sqm", label: "Factory floor area" },
  { value: "4", label: "Workshops" },
  { value: "20+", label: "Production machines" },
  { value: "37", label: "Team members" },
  { value: "12", label: "Technical staff" },
  { value: "3-6 mo", label: "Typical production cycle" }
];

export const productFamilies = [
  {
    slug: "automatic-horizontal-molding-machine",
    title: "Automatic Horizontal Molding Machine",
    eyebrow: "TZ Series",
    image: "/assets/horizontal-molding-machine.png",
    summary:
      "Top/bottom and side sand shooting molding machines designed for automated foundry production lines.",
    models: [
      "TZ65-50B",
      "TZ65-55B",
      "TZ65-60B",
      "TZ75-60B",
      "TZ75-65BH",
      "TZ85-75BH",
      "TZ100-100BH",
      "TZ120-120BH",
      "TZ65-50A",
      "TZ75-70AH",
      "TZ100-100AH",
      "TZ120-120AH"
    ],
    applications: ["Cast iron parts", "Automated molding lines", "Medium and large foundry workshops"],
    advantages: ["PLC-controlled operation", "Reduced manual labor", "Stable molding rhythm", "Line-ready configuration"],
    icon: Factory
  },
  {
    slug: "automatic-static-pressure-molding-machine",
    title: "Automatic Static Pressure Molding Machine",
    eyebrow: "TJ Series",
    image: "/assets/static-pressure-machine.png",
    summary:
      "Static pressure molding hosts for automated molding line layouts that require consistent compaction and line coordination.",
    models: ["TJ107", "TJ108", "TJ128", "TJ129", "TJ138", "TJ139", "TJ14511", "TJ1512"],
    applications: ["Static pressure molding lines", "High-volume foundry systems", "Integrated production cells"],
    advantages: ["Multi-point pressure structure", "Designed for full line matching", "Industrial automation interface", "Stable output planning"],
    icon: Gauge
  },
  {
    slug: "gs-series-rotor-sand-mixer",
    title: "GS Series High-Efficiency Rotor Sand Mixer",
    eyebrow: "TGS Series",
    image: "/assets/rotor-sand-mixer.png",
    summary:
      "Rotor sand mixers for efficient sand preparation in modern foundry production and sand treatment systems.",
    models: ["TGS16-30", "TGS20-55", "TGS20-75", "TGS22-75", "TGS22-90", "TGS25-90"],
    applications: ["Sand treatment systems", "Molding sand preparation", "Foundry material handling"],
    advantages: ["Efficient mixing action", "Integrated line support", "Configurable capacity range", "Maintenance-friendly structure"],
    icon: Settings2
  },
  {
    slug: "supporting-foundry-line-equipment",
    title: "Supporting Foundry Line Equipment",
    eyebrow: "Turnkey Line Support",
    image: "/assets/site-installation.png",
    summary:
      "Auxiliary automation for sand treatment, pouring, cooling, shakeout, cleaning, manipulators, and complete foundry lines.",
    models: ["Sand treatment line", "Pouring system", "Cooling line", "Shakeout section", "Cleaning machine", "Manipulator"],
    applications: ["Complete foundry line projects", "Workshop upgrades", "Custom automation layouts"],
    advantages: ["Project-based configuration", "Production flow coordination", "Factory layout support", "Practical installation planning"],
    icon: Workflow
  }
];

export const lineFlow = [
  "Sand Treatment",
  "Molding",
  "Pouring",
  "Cooling",
  "Shakeout",
  "Cleaning",
  "Auxiliary Automation"
];

export const capabilityCards = [
  {
    title: "R&D And PLC Design",
    body: "Experienced technical staff use computer-aided design and PLC programming to support automated foundry equipment development.",
    icon: Layers3
  },
  {
    title: "Workshop Manufacturing",
    body: "Four workshops and more than twenty production machines support machining, assembly, and line equipment preparation.",
    icon: Factory
  },
  {
    title: "Project Coordination",
    body: "Equipment can be matched into molding, sand treatment, pouring, cooling, and downstream handling sections.",
    icon: Boxes
  },
  {
    title: "Buyer Communication",
    body: "B2B inquiries are routed toward model selection, production line requirements, and technical project discussion.",
    icon: Handshake
  }
];

export const qualityItems = [
  { title: "Incoming And Process Checks", icon: ShieldCheck },
  { title: "Assembly Review Before Shipment", icon: BadgeCheck },
  { title: "Technical Documentation On Request", icon: Layers3 },
  { title: "Third-Party Inspection Coordination", icon: Globe2 }
];

export const galleryImages = [
  { src: "/assets/factory-exterior.png", alt: "Tianlong factory exterior", label: "Factory exterior" },
  { src: "/assets/manufacturing-equipment.png", alt: "Manufacturing equipment", label: "Manufacturing equipment" },
  { src: "/assets/site-installation.png", alt: "Foundry site installation", label: "Site installation" },
  { src: "/assets/certificate.jpg", alt: "Company certificate", label: "Certificate" }
];

export const faqItems = [
  {
    question: "Which machine models can Tianlong provide?",
    answer:
      "Tianlong provides TZ series automatic horizontal molding machines, TJ series static pressure molding machines, GS series rotor sand mixers, and supporting foundry line equipment."
  },
  {
    question: "Can the equipment be configured for a complete foundry line?",
    answer:
      "Yes. Project discussion can cover sand treatment, molding, pouring, cooling, shakeout, cleaning, manipulators, and other auxiliary line sections."
  },
  {
    question: "What information should I provide for a project inquiry?",
    answer:
      "Please share the target casting type, expected output, workshop layout, sand system requirements, preferred automation level, destination country, and any existing equipment details."
  },
  {
    question: "What is the typical production cycle?",
    answer:
      "For standard projects, Tianlong currently references a 3-6 month production cycle depending on configuration, workload, and project scope."
  },
  {
    question: "Can you support customized equipment layouts?",
    answer:
      "Yes. The team can discuss model selection, line matching, and layout requirements based on your foundry process and production target."
  },
  {
    question: "Can quality inspection or technical documents be discussed before shipment?",
    answer:
      "Yes. Inspection requirements and available technical documents can be discussed during the project communication stage."
  }
];
