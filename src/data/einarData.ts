export type TeeCategory = "all" | "boxy" | "tailored" | "graphic";

export type TeeSize = "S" | "M" | "L" | "XL" | "XXL";

export interface TeeProduct {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  priceInr: number;
  gsm: string;
  fit: string;
  category: Exclude<TeeCategory, "all">;
  colourName: string;
  swatchHex: string;
  image: string;
  badge: string;
  description: string;
  highlights: string[];
  sizes: TeeSize[];
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export const TEE_PRODUCTS: TeeProduct[] = [
  {
    id: "en-01-obsidian",
    code: "EN-01",
    name: "Obsidian Crest Boxy Tee",
    subtitle: "Brushed Silver Spartan Emblem",
    priceInr: 2499,
    gsm: "320 GSM",
    fit: "Boxy Oversized",
    category: "boxy",
    colourName: "Obsidian Black",
    swatchHex: "#111215",
    image: "/images/tee-obsidian-front.jpg",
    badge: "Flagship",
    description:
      "Cut from custom-milled 320 GSM long-staple combed Indian cotton with a dense 2.4 cm double-ribbed crew collar and dropped shoulders. Finished with a subtle brushed-metallic crest at the heart.",
    highlights: [
      "100% ring-spun long-staple combed cotton",
      "Bio-enzyme matte finish engineered for Indian weather",
      "Twin-needle reinforced sleeve and hem lock",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "en-02-chalk",
    code: "EN-02",
    name: "Chalk Alabaster Boxy Tee",
    subtitle: "Matte Obsidian Crest Edition",
    priceInr: 2499,
    gsm: "320 GSM",
    fit: "Boxy Oversized",
    category: "boxy",
    colourName: "Chalk White",
    swatchHex: "#EAECE8",
    image: "/images/tee-chalk-front.jpg",
    badge: "Drop 01",
    description:
      "Architectural structure in high-opacity chalk white. Milled heavy enough to hold an uncompromising drape without show-through, contrasted by a crisp obsidian chest crest.",
    highlights: [
      "Zero-transparency 320 GSM dense jersey knit",
      "Pre-shrunk & heat-set to hold collar shape",
      "Relaxed boxy chest with structured sleeve drop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "en-03-carbon",
    code: "EN-03",
    name: "Carbon Spear Back Tee",
    subtitle: "Tonal Architectural Spear Print",
    priceInr: 2799,
    gsm: "320 GSM",
    fit: "Boxy Oversized",
    category: "graphic",
    colourName: "Washed Charcoal",
    swatchHex: "#31343A",
    image: "/images/tee-carbon-back.jpg",
    badge: "Graphic Back",
    description:
      "Garment-dyed carbon charcoal washed for an understated matte patina. Features our geometric spear-and-chevron back print inspired by the forward blade of the EINAR mark.",
    highlights: [
      "Breathable water-based matte black screenprint",
      "Garment-dyed mineral wash for tonal character",
      "Extended shoulder seam for clean athletic silhouette",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "en-04-ash",
    code: "EN-04",
    name: "Ash Slate Tailored Core Tee",
    subtitle: "Tagless Precision Daily Armour",
    priceInr: 2299,
    gsm: "280 GSM",
    fit: "Tailored Core",
    category: "tailored",
    colourName: "Heather Ash Grey",
    swatchHex: "#9EA3AB",
    image: "/images/tee-ash-front.jpg",
    badge: "Core Cut",
    description:
      "A closer, disciplined everyday cut in cool heather ash grey. Knitted at 280 GSM with clean side-seam construction and a whisper-soft tagless collar interior for zero friction.",
    highlights: [
      "Breathable 280 GSM double-combed heather knit",
      "Tagless clean neck finish with soft tape binding",
      "Contoured shoulder taper for sharp everyday wear",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export interface EmblemAnatomyItem {
  code: string;
  title: string;
  element: string;
  meaning: string;
}

export const EMBLEM_ANATOMY: EmblemAnatomyItem[] = [
  {
    code: "01",
    title: "The Spartan Crest",
    element: "Left Spine Fusion",
    meaning:
      "Forged directly into the vertical axis of the letter E — representing quiet discipline, composure under pressure, and daily armour built to endure.",
  },
  {
    code: "02",
    title: "The Piercing Spear",
    element: "Central Horizontal Blade",
    meaning:
      "Replacing a passive middle stroke with a forward-thrusting spearhead that drives momentum left-to-right across the garment silhouette.",
  },
  {
    code: "03",
    title: "Brushed Steel Monolith",
    element: "Chromatic Restraint",
    meaning:
      "No loud hues or fleeting trends. Every tee lives exclusively inside a disciplined spectrum of alabaster white, studio grey, slate, and obsidian.",
  },
  {
    code: "04",
    title: "Open-Apex Wordmark",
    element: "EINAR™ Type Geometry",
    meaning:
      "Wide-tracked chamfered lettering with a crossbar-free chevron A and sharp angular terminals — echoing crisp tailored shoulder lines and hems.",
  },
];

export interface CraftSpecTab {
  id: string;
  label: string;
  metric: string;
  headline: string;
  copy: string;
  specs: { label: string; value: string }[];
}

export const CRAFT_TABS: CraftSpecTab[] = [
  {
    id: "knit",
    label: "320 GSM Knit",
    metric: "320 g/m²",
    headline: "Dense interlock jersey that holds form like armour.",
    copy: "Ordinary high-street tees collapse at 150 GSM. EINAR mills custom 320 GSM single-jersey and 280 GSM core fabrics from long-staple combed Indian cotton so every fold stays crisp through years of wear.",
    specs: [
      { label: "Fibre Spec", value: "16s Combed Long-Staple Cotton" },
      { label: "Shrinkage Control", value: "< 1.5% Pre-Shrunk" },
      { label: "Opacity Rating", value: "100% Zero-Show Chalk" },
    ],
  },
  {
    id: "collar",
    label: "Collar Lock",
    metric: "2.4 cm Rib",
    headline: "Double-ribbed mock crew engineered never to sag.",
    copy: "A t-shirt lives or dies by its neckline. Our high-recovery 1x1 elastane-reinforced rib collar is set 2.4 cm wide and twin-stitched along the neck tape so it sits flush against the collarbone.",
    specs: [
      { label: "Collar Height", value: "2.4 cm High-Density Rib" },
      { label: "Elastic Recovery", value: "98% Shape Retention" },
      { label: "Interior Finish", value: "Tagless Heat-Transfer" },
    ],
  },
  {
    id: "geometry",
    label: "Cut Geometry",
    metric: "+4 cm Drop",
    headline: "Boxy warrior silhouette balanced with clean hem length.",
    copy: "Dropped shoulder seams create effortless upper-torso structure without baggy excess around the waist — tailored for Indian proportions across both Boxy Oversized and Tailored Core fits.",
    specs: [
      { label: "Shoulder Pitch", value: "+4.0 cm Relaxed Drop" },
      { label: "Sleeve Opening", value: "Mid-Bicep Structured Hem" },
      { label: "Seam Lock", value: "5-Thread Twin-Needle" },
    ],
  },
  {
    id: "wash",
    label: "Enzyme Wash",
    metric: "Zero Torque",
    headline: "Matte mineral surface cured against side-seam twist.",
    copy: "Each batch undergoes a bio-enzyme bath that clears surface lint, prevents pilling, and achieves our signature cool dry-hand matte touch suited for humid Indian climates.",
    specs: [
      { label: "Hand Feel", value: "Cool Dry-Matte Finish" },
      { label: "Seam Alignment", value: "0° Torque Stabilised" },
      { label: "Colourfastness", value: "Grade 4.5 Reactive Dye" },
    ],
  },
];

export const FIT_COMPARISON = [
  { size: "S", chestBoxy: "58 cm", lengthBoxy: "69 cm", chestCore: "51 cm", lengthCore: "68 cm" },
  { size: "M", chestBoxy: "61 cm", lengthBoxy: "71 cm", chestCore: "54 cm", lengthCore: "70 cm" },
  { size: "L", chestBoxy: "64 cm", lengthBoxy: "73 cm", chestCore: "57 cm", lengthCore: "72 cm" },
  { size: "XL", chestBoxy: "67 cm", lengthBoxy: "75 cm", chestCore: "60 cm", lengthCore: "74 cm" },
  { size: "XXL", chestBoxy: "70 cm", lengthBoxy: "77 cm", chestCore: "63 cm", lengthCore: "76 cm" },
];
