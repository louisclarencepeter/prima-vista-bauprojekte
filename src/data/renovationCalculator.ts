export const RENOVATION_VAT_RATE = 0.19;
export const RENOVATION_DEFAULT_AREA = 60;
export const RENOVATION_MIN_AREA = 40;

export type RenovationLineType = 'service' | 'material' | 'extra' | 'optional';

export type RenovationProductAlternative = {
  id: string;
  title: string;
  sku: string;
  unit: string;
  basePrice: number;
  description?: string;
  image?: string;
};

export type RenovationProduct = {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  sku: string;
  type: RenovationLineType;
  unit: string;
  basePrice: number;
  quantity: number;
  baseQuantity: number;
  enabled: boolean;
  optional: boolean;
  scalable: boolean;
  scalingFactor: number;
  image?: string;
  description: string;
  minQuantity: number;
  quantityStep: number;
  canDuplicate: boolean;
  canRemove: boolean;
  canReplace: boolean;
  alternatives: RenovationProductAlternative[];
};

export type RenovationSubsection = {
  id: string;
  title: string;
  type: RenovationLineType;
  collapsedByDefault?: boolean;
  products: RenovationProduct[];
};

export type RenovationCategory = {
  id: string;
  title: string;
  lead: string;
  subsections: RenovationSubsection[];
};

type ProductSeed = {
  id: string;
  title: string;
  sku: string;
  type: RenovationLineType;
  unit: string;
  basePrice: number;
  quantity: number;
  optional?: boolean;
  enabled?: boolean;
  scalable?: boolean;
  description?: string;
  minQuantity?: number;
  quantityStep?: number;
};

type SectionSeed = {
  id: string;
  title: string;
  type: RenovationLineType;
  collapsedByDefault?: boolean;
  products: ProductSeed[];
};

type CategorySeed = {
  id: string;
  title: string;
  lead: string;
  subsections: SectionSeed[];
};

const SCALABLE_UNITS = new Set(['qm', 'lfm', 'Stk', 'Stück']);

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function makeAlternatives(product: Omit<RenovationProduct, 'alternatives'>): RenovationProductAlternative[] {
  const suffix = product.type === 'material' ? ['Basis', 'Robust', 'Premium'] : ['Standard', 'Komfort', 'Premium'];
  const multipliers = product.basePrice === 0 ? [1, 1, 1] : [1, 1.14, 1.28];

  return suffix.map((label, index) => {
    const title = index === 0 ? product.title : `${product.title} - ${label}`;
    const sku = index === 0 ? product.sku : `${product.sku}-${label.slice(0, 1).toUpperCase()}`;

    return {
      id: `${product.id}-${label.toLowerCase()}`,
      title,
      sku,
      unit: product.unit,
      basePrice: roundMoney(product.basePrice * multipliers[index]),
      description: product.description,
      image: product.image,
    };
  });
}

function makeProduct(category: string, subcategory: string, seed: ProductSeed): RenovationProduct {
  const scalable = seed.scalable ?? SCALABLE_UNITS.has(seed.unit);
  const optional = seed.optional ?? false;
  const base: Omit<RenovationProduct, 'alternatives'> = {
    id: seed.id,
    category,
    subcategory,
    title: seed.title,
    sku: seed.sku,
    type: seed.type,
    unit: seed.unit,
    basePrice: seed.basePrice,
    quantity: seed.quantity,
    baseQuantity: seed.quantity,
    enabled: seed.enabled ?? !optional,
    optional,
    scalable,
    scalingFactor: scalable ? seed.quantity / RENOVATION_DEFAULT_AREA : 0,
    description: seed.description ?? 'Kalkulationsposition fuer Montage, Material oder Zusatzleistung.',
    minQuantity: seed.minQuantity ?? 1,
    quantityStep: seed.quantityStep ?? 1,
    canDuplicate: true,
    canRemove: true,
    canReplace: true,
  };

  return {
    ...base,
    alternatives: makeAlternatives(base),
  };
}

function section(category: string, seed: SectionSeed): RenovationSubsection {
  return {
    id: seed.id,
    title: seed.title,
    type: seed.type,
    collapsedByDefault: seed.collapsedByDefault,
    products: seed.products.map((product) => makeProduct(category, seed.id, product)),
  };
}

function category(seed: CategorySeed): RenovationCategory {
  return {
    id: seed.id,
    title: seed.title,
    lead: seed.lead,
    subsections: seed.subsections.map((item) => section(seed.id, item)),
  };
}

const CATEGORY_SEEDS: CategorySeed[] = [
  {
    id: 'demolition',
    title: 'Abbruch & Rohbau',
    lead: 'Rueckbau, Durchbrueche, Putz und tragende Einzelpositionen.',
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'demolition-ceiling', title: 'Abbruch Decken - Leichtbau', sku: 'PV-ROH-101', type: 'service', unit: 'qm', basePrice: 21.14, quantity: 5 },
          { id: 'demolition-wall-light', title: 'Abbruch Waende 6-16 cm', sku: 'PV-ROH-102', type: 'service', unit: 'qm', basePrice: 78.21, quantity: 8 },
          { id: 'demolition-wall-heavy', title: 'Abbruch Waende 17-35 cm', sku: 'PV-ROH-103', type: 'service', unit: 'qm', basePrice: 98.01, quantity: 3 },
          { id: 'plaster-gypsum', title: 'Wandputz Gips', sku: 'PV-ROH-401', type: 'service', unit: 'qm', basePrice: 34.6, quantity: 5 },
          { id: 'plaster-remove', title: 'Altputz entfernen und entsorgen', sku: 'PV-ROH-402', type: 'extra', unit: 'qm', basePrice: 11.88, quantity: 5 },
        ],
      },
      {
        id: 'structural',
        title: 'Stahltraeger | Basis',
        type: 'material',
        products: [
          { id: 'steel-beam', title: 'Stahltraeger HEA bis 2 m', sku: 'PV-ROH-201', type: 'material', unit: 'Stück', basePrice: 1781.33, quantity: 1, scalable: false },
          { id: 'steel-support', title: 'Betonauflager fuer Stahltraeger', sku: 'PV-ROH-202', type: 'extra', unit: 'Stück', basePrice: 188.1, quantity: 1, scalable: false },
        ],
      },
      {
        id: 'optional',
        title: 'Optionale Positionen',
        type: 'optional',
        products: [
          { id: 'demolition-custom', title: 'Weitere Rohbauposition nach Aufmass', sku: 'PV-ROH-900', type: 'optional', unit: 'Stk', basePrice: 0, quantity: 1, optional: true, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'drywall',
    title: 'Trockenbau',
    lead: 'Decken, Waende, Vorsatzschalen, Spachtelung und Plattenmaterial.',
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'drywall-ceiling', title: 'Decken in Trockenbauweise', sku: 'PV-TRO-100', type: 'service', unit: 'qm', basePrice: 49, quantity: 5 },
          { id: 'drywall-wall', title: 'Waende in Trockenbauweise', sku: 'PV-TRO-200', type: 'service', unit: 'qm', basePrice: 49, quantity: 6 },
          { id: 'drywall-facing', title: 'Vorsatzwaende', sku: 'PV-TRO-300', type: 'service', unit: 'qm', basePrice: 49, quantity: 2 },
          { id: 'drywall-finish', title: 'Verspachtelung streichfertig', sku: 'PV-TRO-101', type: 'extra', unit: 'qm', basePrice: 22.82, quantity: 13 },
          { id: 'drywall-door-open', title: 'Tuerloch in GK-Wand herstellen', sku: 'PV-TRO-201', type: 'extra', unit: 'Stück', basePrice: 64.22, quantity: 1, scalable: false },
          { id: 'drywall-corner', title: 'Eckausbildung fuer GK-Waende und Decken', sku: 'PV-TRO-202', type: 'extra', unit: 'Stück', basePrice: 67.37, quantity: 1, scalable: false },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'drywall-board', title: 'Gipsplatte 12,5 mm', sku: 'PV-MAT-GK', type: 'material', unit: 'qm', basePrice: 3.49, quantity: 6 },
          { id: 'drywall-wet-board', title: 'Feuchtraum-Gipsplatte imprraegniert', sku: 'PV-MAT-GKBI', type: 'material', unit: 'qm', basePrice: 8.9, quantity: 7 },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'drywall-pipe-box', title: 'Rohrkasten oder Koffer bauen', sku: 'PV-TRO-401', type: 'extra', unit: 'Stück', basePrice: 235.91, quantity: 1, optional: true, scalable: false },
          { id: 'drywall-close-opening', title: 'Durchgang schliessen', sku: 'PV-TRO-501', type: 'extra', unit: 'Stück', basePrice: 423.81, quantity: 1, optional: true, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'electrical',
    title: 'Elektroinstallation',
    lead: 'Neuinstallation, Verteilung, Zuleitungen, Licht und Netzwerk.',
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'electrical-floor', title: 'Elektro-Neuinstallation pro Etage', sku: 'PV-ELE-100', type: 'service', unit: 'Stk', basePrice: 1995.9, quantity: 1, scalable: false },
          { id: 'electrical-switch-set', title: 'Zuleitungen Set fuer Schalter und Steckdosen', sku: 'PV-ELE-201', type: 'service', unit: 'Stk', basePrice: 3495.9, quantity: 1, scalable: false },
          { id: 'electrical-panel', title: 'Sicherungskasten Montagepaket', sku: 'PV-ELE-102', type: 'service', unit: 'Stk', basePrice: 1678.5, quantity: 1, scalable: false },
          { id: 'electrical-stove', title: 'Herdanschluss mit Zuleitung und Dose', sku: 'PV-ELE-202', type: 'extra', unit: 'Stk', basePrice: 391.9, quantity: 1, scalable: false },
          { id: 'electrical-slots', title: 'Mauerschlitze fuer Elektroelemente', sku: 'PV-ELE-203', type: 'extra', unit: 'Stk', basePrice: 69.25, quantity: 1, optional: true, scalable: false },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'electrical-switch-material', title: 'Schalter- und Steckdosen-Set', sku: 'PV-ELE-MAT-201', type: 'material', unit: 'Stk', basePrice: 1495.9, quantity: 1, scalable: false },
          { id: 'electrical-lighting', title: 'Beleuchtung Montagepaket', sku: 'PV-ELE-LHT-100', type: 'service', unit: 'Stk', basePrice: 129, quantity: 4 },
          { id: 'electrical-spots', title: 'Einbaustrahler weiss', sku: 'PV-LHT-5368', type: 'material', unit: 'Stk', basePrice: 68.02, quantity: 4 },
        ],
      },
      {
        id: 'optional',
        title: 'Optionale Positionen',
        type: 'optional',
        products: [
          { id: 'electrical-network', title: 'Netzwerkinstallation bis 50 qm', sku: 'PV-ELE-301', type: 'optional', unit: 'Stk', basePrice: 1978.96, quantity: 1, optional: true, scalable: false },
          { id: 'electrical-shutter', title: 'Jalousieschalter Smart-Home', sku: 'PV-ELE-501', type: 'optional', unit: 'Stk', basePrice: 203.94, quantity: 1, optional: true, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'painting',
    title: 'Maler & Oberflaechen',
    lead: 'Glaetten, Grundieren, Anstrich und Rueckbau alter Tapeten.',
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'painting-floor-package', title: 'Malerarbeiten pro Etage', sku: 'PV-MAL-100', type: 'service', unit: 'Stk', basePrice: 355.5, quantity: 1, scalable: false },
          { id: 'painting-skim', title: 'Glaettung mit Feinspachtel', sku: 'PV-MAL-101', type: 'service', unit: 'qm', basePrice: 17.9, quantity: 120 },
          { id: 'painting-coat', title: 'Anstrich Wand- und Deckenflaechen', sku: 'PV-MAL-201', type: 'service', unit: 'qm', basePrice: 9.85, quantity: 120 },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'painting-primer', title: 'Grundierung der Flaechen', sku: 'PV-MAL-102', type: 'extra', unit: 'qm', basePrice: 3.91, quantity: 120 },
          { id: 'painting-wallpaper-remove', title: 'Alt-Tapeten entfernen und entsorgen', sku: 'PV-MAL-103', type: 'extra', unit: 'qm', basePrice: 7.87, quantity: 120, optional: true },
        ],
      },
    ],
  },
  {
    id: 'plumbing',
    title: 'Wasser & Sanitaer',
    lead: 'Zu- und Abwasser, Hauptstrang, Vorwandelemente und Anschluesse.',
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'water-bath', title: 'Wasserinstallation Badezimmer', sku: 'PV-WAS-100', type: 'service', unit: 'Stück', basePrice: 1995.9, quantity: 1, scalable: false },
          { id: 'water-guest', title: 'Wasserinstallation Gaeste-WC', sku: 'PV-WAS-200', type: 'service', unit: 'Stück', basePrice: 1195.9, quantity: 1, scalable: false },
          { id: 'water-kitchen', title: 'Wasserinstallation Kueche', sku: 'PV-WAS-300', type: 'service', unit: 'Stück', basePrice: 995.9, quantity: 1, scalable: false },
          { id: 'water-main', title: 'Hauptstrang Trinkwasser und Abwasser', sku: 'PV-WAS-501', type: 'service', unit: 'Stück', basePrice: 2767.9, quantity: 1, scalable: false },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'water-washer', title: 'Waschmaschinenanschluss', sku: 'PV-WAS-105', type: 'extra', unit: 'Stück', basePrice: 355.36, quantity: 1, optional: true, scalable: false },
          { id: 'water-prewall', title: 'Vorsatzelement montieren', sku: 'PV-WAS-101', type: 'extra', unit: 'Stk', basePrice: 279, quantity: 2, scalable: false },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'water-washstand-element', title: 'Waschtisch-Montageelement', sku: 'PV-WAS-MAT-01', type: 'material', unit: 'Stück', basePrice: 203.94, quantity: 1, scalable: false },
          { id: 'water-wc-element', title: 'WC-Montageelement mit Spuelkasten', sku: 'PV-WAS-MAT-02', type: 'material', unit: 'Stück', basePrice: 390.06, quantity: 1, scalable: false },
          { id: 'water-flush-plate', title: 'Abdeckplatte fuer Unterputz-Spuelkasten', sku: 'PV-WAS-MAT-03', type: 'material', unit: 'Stück', basePrice: 101.5, quantity: 1, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'heating',
    title: 'Heizung',
    lead: 'Heizkoerper, Heizstraenge, Bodenheizung und Waermepumpe.',
    subsections: [
      {
        id: 'radiators',
        title: 'Heizkoerper',
        type: 'service',
        products: [
          { id: 'radiator-mount', title: 'Heizkoerper Montage', sku: 'PV-HEI-101', type: 'service', unit: 'Stk', basePrice: 149, quantity: 4, scalable: false },
          { id: 'radiator-bath', title: 'Badheizkoerper weiss', sku: 'PV-HEI-MAT-01', type: 'material', unit: 'Stk', basePrice: 388.95, quantity: 1, scalable: false },
          { id: 'radiator-flat', title: 'Plan-Flachheizkoerper', sku: 'PV-HEI-MAT-02', type: 'material', unit: 'Stück', basePrice: 749, quantity: 1, optional: true, scalable: false },
          { id: 'radiator-remove', title: 'Heizkoerper demontieren und entsorgen', sku: 'PV-HEI-201', type: 'extra', unit: 'Stück', basePrice: 67.13, quantity: 4, optional: true, scalable: false },
          { id: 'heating-pipes', title: 'Heizstraenge bis 5 m', sku: 'PV-HEI-301', type: 'extra', unit: 'Stück', basePrice: 434.56, quantity: 1, scalable: false },
        ],
      },
      {
        id: 'floor-heating',
        title: 'Bodenheizung',
        type: 'service',
        products: [
          { id: 'floor-heating-install', title: 'Bodenheizung Montagepaket', sku: 'PV-HEI-FBH-100', type: 'service', unit: 'qm', basePrice: 89, quantity: 60 },
          { id: 'floor-heating-dry-screed', title: 'Trockenestrichplatten', sku: 'PV-ROH-501', type: 'material', unit: 'qm', basePrice: 48.46, quantity: 60 },
          { id: 'floor-heating-remove-screed', title: 'Alt-Estrich entfernen und entsorgen', sku: 'PV-ROH-502', type: 'extra', unit: 'qm', basePrice: 45.89, quantity: 60, optional: true },
          { id: 'floor-heating-electric', title: 'Elektrische Flaechenheizung Zusatzflaeche', sku: 'PV-HEI-FBH-200', type: 'optional', unit: 'qm', basePrice: 69, quantity: 3, optional: true },
        ],
      },
      {
        id: 'heat-pump',
        title: 'Thermen & Waermepumpen',
        type: 'service',
        products: [
          { id: 'heat-pump-mount', title: 'Waermepumpe Montagepaket', sku: 'PV-HEI-WP-100', type: 'service', unit: 'Stück', basePrice: 4500, quantity: 1, optional: true, scalable: false },
          { id: 'heat-pump-12kw', title: '12 kW Waermepumpe Paket', sku: 'PV-HEI-WP-411', type: 'material', unit: 'Stück', basePrice: 10542.42, quantity: 1, optional: true, scalable: false },
          { id: 'heat-pump-foundation', title: 'Fundament fuer Waermepumpe', sku: 'PV-HEI-WP-401', type: 'extra', unit: 'Stück', basePrice: 2495, quantity: 1, optional: true, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'bathroom',
    title: 'Bad & Gaeste-WC',
    lead: 'Fliesen, Sanitaerobjekte, Dusche, Wanne und barrierearme Extras.',
    subsections: [
      {
        id: 'bath-tiles',
        title: 'Fliesen Badezimmer',
        type: 'service',
        products: [
          { id: 'bath-tiles-install', title: 'Fliesen Bad Montagepaket', sku: 'PV-BAD-100', type: 'service', unit: 'Stück', basePrice: 5995, quantity: 1, scalable: false },
          { id: 'bath-wall-tile', title: 'Wandfliese weiss matt', sku: 'PV-BAD-FL-01', type: 'material', unit: 'qm', basePrice: 30.22, quantity: 18 },
          { id: 'bath-floor-tile', title: 'Bodenfliese dunkelgrau', sku: 'PV-BAD-FL-02', type: 'material', unit: 'qm', basePrice: 30.22, quantity: 6 },
          { id: 'bath-mosaic', title: 'Mosaikfliese Akzent', sku: 'PV-BAD-FL-03', type: 'material', unit: 'qm', basePrice: 298.67, quantity: 3 },
          { id: 'bath-adhesive', title: 'Flexkleber und Fugenmaterial', sku: 'PV-BAD-MAT-04', type: 'material', unit: 'Sack', basePrice: 53.75, quantity: 6 },
        ],
      },
      {
        id: 'bath-sanitary',
        title: 'Sanitaer Badezimmer',
        type: 'service',
        products: [
          { id: 'bath-sanitary-install', title: 'Sanitaer Bad Montagepaket', sku: 'PV-BAD-500', type: 'service', unit: 'Stück', basePrice: 1995, quantity: 1, scalable: false },
          { id: 'bath-wc', title: 'Wand-Tiefspuel-WC', sku: 'PV-BAD-WC', type: 'material', unit: 'Stück', basePrice: 191.57, quantity: 1, scalable: false },
          { id: 'bath-washstand', title: 'Waschtisch 60 cm', sku: 'PV-BAD-WT', type: 'material', unit: 'Stück', basePrice: 191.57, quantity: 1, scalable: false },
          { id: 'bath-tub', title: 'Badewanne Stahl 180 x 80 cm', sku: 'PV-BAD-WANNE', type: 'material', unit: 'Stück', basePrice: 1039.5, quantity: 1, scalable: false },
          { id: 'bath-shower-system', title: 'Duschsystem mit Einhandmischer', sku: 'PV-BAD-DUSCH', type: 'material', unit: 'Stück', basePrice: 608.85, quantity: 1, scalable: false },
          { id: 'bath-walk-in', title: 'Ebenerdigen Duschbereich herstellen', sku: 'PV-BAD-507', type: 'optional', unit: 'Stück', basePrice: 1579.9, quantity: 1, optional: true, scalable: false },
        ],
      },
      {
        id: 'guest-wc',
        title: 'Gaeste-WC',
        type: 'service',
        products: [
          { id: 'guest-tiles-install', title: 'Fliesen Gaeste-WC Montagepaket', sku: 'PV-GWC-100', type: 'service', unit: 'Stück', basePrice: 2470.9, quantity: 1, scalable: false },
          { id: 'guest-sanitary-install', title: 'Sanitaer Gaeste-WC Montagepaket', sku: 'PV-GWC-500', type: 'service', unit: 'Stück', basePrice: 1183.9, quantity: 1, scalable: false },
          { id: 'guest-wall-tile', title: 'Gaeste-WC Wandfliese', sku: 'PV-GWC-FL-01', type: 'material', unit: 'qm', basePrice: 30.22, quantity: 12 },
          { id: 'guest-floor-tile', title: 'Gaeste-WC Bodenfliese', sku: 'PV-GWC-FL-02', type: 'material', unit: 'qm', basePrice: 30.22, quantity: 4 },
          { id: 'guest-handbasin', title: 'Handwaschbecken 45 cm', sku: 'PV-GWC-WT', type: 'material', unit: 'Stück', basePrice: 201.96, quantity: 1, scalable: false },
        ],
      },
      {
        id: 'accessibility',
        title: 'Optionale Positionen',
        type: 'optional',
        collapsedByDefault: true,
        products: [
          { id: 'bath-folding-seat', title: 'Klappsitz barrierearm', sku: 'PV-BAD-BF-01', type: 'optional', unit: 'Stück', basePrice: 676.17, quantity: 1, optional: true, scalable: false },
          { id: 'bath-angle-grip', title: 'Winkelgriff barrierearm', sku: 'PV-BAD-BF-02', type: 'optional', unit: 'Stück', basePrice: 255.42, quantity: 1, optional: true, scalable: false },
          { id: 'bath-hygiene-set', title: 'Hygiene-Zubehoer Set', sku: 'PV-BAD-BF-03', type: 'optional', unit: 'Stück', basePrice: 112.86, quantity: 1, optional: true, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'flooring',
    title: 'Boeden & Belag',
    lead: 'Holzboden, Fliesenboden, Rueckbau, Ausgleich und Sockelleisten.',
    subsections: [
      {
        id: 'wood-floor',
        title: 'Holz-Boden',
        type: 'service',
        products: [
          { id: 'wood-floor-install', title: 'Holzboden verlegen', sku: 'PV-BOD-100', type: 'service', unit: 'qm', basePrice: 19.9, quantity: 50 },
          { id: 'wood-floor-remove', title: 'Alt-Boden entfernen und entsorgen', sku: 'PV-BOD-101', type: 'extra', unit: 'qm', basePrice: 15.79, quantity: 50 },
          { id: 'wood-floor-parquet', title: 'Fertigparkett 3-Schicht', sku: 'PV-BOD-MAT-01', type: 'material', unit: 'qm', basePrice: 49.83, quantity: 28 },
          { id: 'wood-floor-skirting', title: 'Sockelleiste MDF weiss', sku: 'PV-BOD-MAT-02', type: 'material', unit: 'lfm', basePrice: 3.56, quantity: 28 },
          { id: 'wood-floor-leveling', title: 'Bodenausgleich bis 1 cm', sku: 'PV-BOD-102', type: 'optional', unit: 'qm', basePrice: 39.9, quantity: 1, optional: true },
        ],
      },
      {
        id: 'tile-floor',
        title: 'Fliesen-Boden',
        type: 'service',
        products: [
          { id: 'tile-floor-install', title: 'Bodenfliesen verlegen', sku: 'PV-BOD-400', type: 'service', unit: 'qm', basePrice: 59.9, quantity: 15 },
          { id: 'tile-floor-material', title: 'Feinsteinzeug Bodenfliese', sku: 'PV-BOD-FL-01', type: 'material', unit: 'qm', basePrice: 46.2, quantity: 17 },
          { id: 'tile-floor-skirting', title: 'Fliesensockel', sku: 'PV-BOD-FL-02', type: 'material', unit: 'qm', basePrice: 14.53, quantity: 17 },
          { id: 'tile-floor-silicone', title: 'Neutral-Silikon', sku: 'PV-BOD-FL-03', type: 'material', unit: 'Stk', basePrice: 8.79, quantity: 3, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'doors-windows',
    title: 'Tueren & Fenster',
    lead: 'Innentueren, Haustuer, Fenster, Balkontuer und Rolladen.',
    subsections: [
      {
        id: 'doors',
        title: 'Tueren | Basis',
        type: 'service',
        products: [
          { id: 'doors-install', title: 'Tueren Montagepaket', sku: 'PV-TUER-100', type: 'service', unit: 'Stk', basePrice: 149.9, quantity: 5, scalable: false },
          { id: 'doors-remove', title: 'Alt-Tueren demontieren und entsorgen', sku: 'PV-TUER-101', type: 'extra', unit: 'Stück', basePrice: 49.5, quantity: 5, scalable: false },
          { id: 'doors-interior', title: 'Innentuerelement weiss', sku: 'PV-TUER-MAT-01', type: 'material', unit: 'Stk', basePrice: 387.59, quantity: 3, scalable: false },
          { id: 'doors-handle', title: 'Rosettengarnitur Edelstahl', sku: 'PV-TUER-MAT-02', type: 'material', unit: 'Stk', basePrice: 57.56, quantity: 3, scalable: false },
          { id: 'doors-front', title: 'Aluminium Haustuer anthrazit', sku: 'PV-TUER-MAT-03', type: 'material', unit: 'Stk', basePrice: 1755.6, quantity: 1, scalable: false },
          { id: 'doors-sliding', title: 'Schiebetuer weiss', sku: 'PV-TUER-MAT-04', type: 'material', unit: 'Stück', basePrice: 299.01, quantity: 1, optional: true, scalable: false },
        ],
      },
      {
        id: 'windows',
        title: 'Fenster & Balkontueren',
        type: 'service',
        products: [
          { id: 'windows-install', title: 'Fenster und Tueren Montagepaket', sku: 'PV-FEN-100', type: 'service', unit: 'Stk', basePrice: 415.31, quantity: 7, scalable: false },
          { id: 'windows-remove', title: 'Alt-Fenster demontieren und entsorgen', sku: 'PV-FEN-102', type: 'extra', unit: 'Stück', basePrice: 70.5, quantity: 6, scalable: false },
          { id: 'window-small', title: 'Kunststofffenster bis 1 m Kantenlaenge', sku: 'PV-FEN-MAT-01', type: 'material', unit: 'Stück', basePrice: 857.82, quantity: 2, scalable: false },
          { id: 'window-medium', title: 'Kunststofffenster bis 2 m Kantenlaenge', sku: 'PV-FEN-MAT-02', type: 'material', unit: 'Stück', basePrice: 1264.16, quantity: 2, scalable: false },
          { id: 'window-large', title: 'Kunststofffenster bis 3 m Kantenlaenge', sku: 'PV-FEN-MAT-03', type: 'material', unit: 'Stück', basePrice: 1670.49, quantity: 1, scalable: false },
          { id: 'balcony-door', title: 'Balkontuer Kunststoff', sku: 'PV-FEN-MAT-04', type: 'material', unit: 'Stück', basePrice: 653.19, quantity: 1, scalable: false },
          { id: 'window-roller', title: 'Rolladenpanzer manuell', sku: 'PV-FEN-ROL-01', type: 'optional', unit: 'Stück', basePrice: 1292, quantity: 1, optional: true, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'kitchen',
    title: 'Kueche & Moebel',
    lead: 'Kuechenmontage, Einbaukueche und kleine Ausstattungspositionen.',
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'kitchen-install', title: 'Kuechenmontage pauschal', sku: 'PV-KUE-100', type: 'service', unit: 'lfm', basePrice: 290, quantity: 7 },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'kitchen-l-shape', title: 'Einbaukueche L-Form weiss', sku: 'PV-KUE-MAT-01', type: 'material', unit: 'Stk', basePrice: 5424.02, quantity: 1, scalable: false },
          { id: 'kitchen-compact', title: 'Einbaukueche kompakt weiss', sku: 'PV-KUE-MAT-02', type: 'material', unit: 'Stk', basePrice: 3616.41, quantity: 1, optional: true, scalable: false },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'kitchen-bin', title: 'Einbau-Abfallsammler', sku: 'PV-KUE-ZUB-01', type: 'extra', unit: 'Stk', basePrice: 109.48, quantity: 1, optional: true, scalable: false },
          { id: 'kitchen-towel', title: 'Handtuchhalter zweiarmig', sku: 'PV-KUE-ZUB-02', type: 'extra', unit: 'Stk', basePrice: 141.61, quantity: 1, optional: true, scalable: false },
        ],
      },
    ],
  },
  {
    id: 'facade-outdoor',
    title: 'Fassade & Aussenanlagen',
    lead: 'WDVS, Abdichtung, Terrasse, Zaun und Container.',
    subsections: [
      {
        id: 'facade',
        title: 'Fassade',
        type: 'service',
        products: [
          { id: 'facade-wdvs', title: 'Fassadendaemmung WDVS Montagepaket', sku: 'PV-FAS-100', type: 'service', unit: 'qm', basePrice: 59, quantity: 80 },
          { id: 'facade-insulation', title: 'Mineralwoll-Daemmplatte 140 mm', sku: 'PV-FAS-MAT-01', type: 'material', unit: 'qm', basePrice: 30.48, quantity: 80 },
          { id: 'facade-adhesive', title: 'Klebe- und Armierungsmoertel', sku: 'PV-FAS-MAT-02', type: 'material', unit: 'Sack', basePrice: 23.1, quantity: 40 },
          { id: 'facade-plaster', title: 'Edelkratzputz fein', sku: 'PV-FAS-MAT-03', type: 'material', unit: 'Sack', basePrice: 19.73, quantity: 60 },
          { id: 'facade-profile', title: 'Sockelabschlussprofil', sku: 'PV-FAS-MAT-04', type: 'material', unit: 'Stk', basePrice: 13.7, quantity: 16 },
        ],
      },
      {
        id: 'basement',
        title: 'Abdichtung',
        type: 'service',
        products: [
          { id: 'perimeter-seal', title: 'Perimeterdaemmung und Abdichtung', sku: 'PV-ABD-101', type: 'service', unit: 'qm', basePrice: 249, quantity: 1, optional: true },
          { id: 'perimeter-board', title: 'Sockel Perimeter-Daemmplatte', sku: 'PV-ABD-MAT-01', type: 'material', unit: 'qm', basePrice: 22.62, quantity: 1, optional: true },
        ],
      },
      {
        id: 'outdoor',
        title: 'Garten & Terrassen',
        type: 'service',
        products: [
          { id: 'terrace-stone', title: 'Terrasse aus Stein Montagepaket', sku: 'PV-GAR-100', type: 'service', unit: 'qm', basePrice: 129, quantity: 20, optional: true },
          { id: 'terrace-material', title: 'Feinsteinzeug Terrassenplatten', sku: 'PV-GAR-MAT-01', type: 'material', unit: 'qm', basePrice: 63.69, quantity: 22, optional: true },
          { id: 'fence-metal', title: 'Metallzaun Montage', sku: 'PV-ZAU-100', type: 'service', unit: 'lfm', basePrice: 149, quantity: 20, optional: true },
          { id: 'fence-set', title: 'Metallzaun Komplett-Set', sku: 'PV-ZAU-MAT-01', type: 'material', unit: 'Set', basePrice: 1875.14, quantity: 1, optional: true, scalable: false },
          { id: 'container-rubble', title: 'Container Bauschutt', sku: 'PV-ENT-101', type: 'extra', unit: 'Stk', basePrice: 490.05, quantity: 4, optional: true, scalable: false },
        ],
      },
    ],
  },
];

export const RENOVATION_CATEGORIES: RenovationCategory[] = CATEGORY_SEEDS.map(category);

export function createRenovationProducts(): RenovationProduct[] {
  return RENOVATION_CATEGORIES.flatMap((item) => item.subsections.flatMap((subsection) => subsection.products));
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}
