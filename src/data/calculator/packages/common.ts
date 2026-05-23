import type { ProductSeed } from '../engine';

type SectionSeed = {
  id: string;
  title: string;
  type: 'service' | 'material' | 'extra' | 'optional';
  collapsedByDefault?: boolean;
  products: ProductSeed[];
};

type CategorySeed = {
  id: string;
  title: string;
  lead: string;
  collapsedByDefault?: boolean;
  subsections: SectionSeed[];
};

export const COMMON_CATEGORY_SEEDS: CategorySeed[] = [
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
          { id: 'demolition-ceiling', title: 'Abbruch Decken - Leichtbau', sku: 'PV-ROH-101', type: 'service', unit: 'qm', basePrice: 21.14, baseQuantity: 5, scalable: true, formula: 'livingArea * (5/60)' },
          { id: 'demolition-wall-light', title: 'Abbruch Waende 6-16 cm', sku: 'PV-ROH-102', type: 'service', unit: 'qm', basePrice: 78.21, baseQuantity: 8, scalable: true, formula: 'livingArea * (8/60)' },
          { id: 'demolition-wall-heavy', title: 'Abbruch Waende 17-35 cm', sku: 'PV-ROH-103', type: 'service', unit: 'qm', basePrice: 98.01, baseQuantity: 3, scalable: true, formula: 'livingArea * (3/60)' },
          { id: 'plaster-gypsum', title: 'Wandputz Gips', sku: 'PV-ROH-401', type: 'service', unit: 'qm', basePrice: 34.6, baseQuantity: 5, scalable: true, formula: 'livingArea * (5/60)' },
          { id: 'plaster-remove', title: 'Altputz entfernen und entsorgen', sku: 'PV-ROH-402', type: 'extra', unit: 'qm', basePrice: 11.88, baseQuantity: 5, scalable: true, formula: 'livingArea * (5/60)' },
        ],
      },
      {
        id: 'structural',
        title: 'Stahltraeger | Basis',
        type: 'material',
        products: [
          { id: 'steel-beam', title: 'Stahltraeger HEA bis 2 m', sku: 'PV-ROH-201', type: 'material', unit: 'Stück', basePrice: 1781.33, baseQuantity: 1 },
          { id: 'steel-support', title: 'Betonauflager fuer Stahltraeger', sku: 'PV-ROH-202', type: 'extra', unit: 'Stück', basePrice: 188.1, baseQuantity: 1 },
        ],
      },
      {
        id: 'optional',
        title: 'Optionale Positionen',
        type: 'optional',
        products: [
          { id: 'demolition-custom', title: 'Weitere Rohbauposition nach Aufmass', sku: 'PV-ROH-900', type: 'optional', unit: 'Stk', basePrice: 0, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
  {
    id: 'drywall',
    title: 'Trockenbau',
    lead: 'Decken, Waende, Vorsatzschalen, Spachtelung und Plattenmaterial.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'drywall-ceiling', title: 'Decken in Trockenbauweise', sku: 'PV-TRO-100', type: 'service', unit: 'qm', basePrice: 49, baseQuantity: 5, scalable: true, formula: 'livingArea * (5/60)' },
          { id: 'drywall-wall', title: 'Waende in Trockenbauweise', sku: 'PV-TRO-200', type: 'service', unit: 'qm', basePrice: 49, baseQuantity: 6, scalable: true, formula: 'livingArea * (6/60)' },
          { id: 'drywall-facing', title: 'Vorsatzwaende', sku: 'PV-TRO-300', type: 'service', unit: 'qm', basePrice: 49, baseQuantity: 2, scalable: true, formula: 'livingArea * (2/60)' },
          { id: 'drywall-finish', title: 'Verspachtelung streichfertig', sku: 'PV-TRO-101', type: 'extra', unit: 'qm', basePrice: 22.82, baseQuantity: 13, scalable: true, formula: 'livingArea * (13/60)' },
          { id: 'drywall-door-open', title: 'Tuerloch in GK-Wand herstellen', sku: 'PV-TRO-201', type: 'extra', unit: 'Stück', basePrice: 64.22, baseQuantity: 1 },
          { id: 'drywall-corner', title: 'Eckausbildung fuer GK-Waende und Decken', sku: 'PV-TRO-202', type: 'extra', unit: 'Stück', basePrice: 67.37, baseQuantity: 1 },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'drywall-board', title: 'Gipsplatte 12,5 mm', sku: 'PV-MAT-GK', type: 'material', unit: 'qm', basePrice: 3.49, baseQuantity: 6, scalable: true, formula: 'livingArea * (6/60)' },
          { id: 'drywall-wet-board', title: 'Feuchtraum-Gipsplatte imprraegniert', sku: 'PV-MAT-GKBI', type: 'material', unit: 'qm', basePrice: 8.9, baseQuantity: 7, scalable: true, formula: 'livingArea * (7/60)' },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'drywall-pipe-box', title: 'Rohrkasten oder Koffer bauen', sku: 'PV-TRO-401', type: 'extra', unit: 'Stück', basePrice: 235.91, baseQuantity: 1, optional: true },
          { id: 'drywall-close-opening', title: 'Durchgang schliessen', sku: 'PV-TRO-501', type: 'extra', unit: 'Stück', basePrice: 423.81, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
  {
    id: 'electrical',
    title: 'Elektroinstallation',
    lead: 'Neuinstallation, Verteilung, Zuleitungen, Licht und Netzwerk.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'electrical-floor', title: 'Elektro-Neuinstallation pro Etage', sku: 'PV-ELE-100', type: 'service', unit: 'Stk', basePrice: 1995.9, baseQuantity: 1, scalable: true, formula: 'floorCount' },
          { id: 'electrical-switch-set', title: 'Zuleitungen Set fuer Schalter und Steckdosen', sku: 'PV-ELE-201', type: 'service', unit: 'Stk', basePrice: 3495.9, baseQuantity: 1, scalable: true, formula: 'floorCount' },
          { id: 'electrical-panel', title: 'Sicherungskasten Montagepaket', sku: 'PV-ELE-102', type: 'service', unit: 'Stk', basePrice: 1678.5, baseQuantity: 1 },
          { id: 'electrical-stove', title: 'Herdanschluss mit Zuleitung und Dose', sku: 'PV-ELE-202', type: 'extra', unit: 'Stk', basePrice: 391.9, baseQuantity: 1 },
          { id: 'electrical-slots', title: 'Mauerschlitze fuer Elektroelemente', sku: 'PV-ELE-203', type: 'extra', unit: 'Stk', basePrice: 69.25, baseQuantity: 1, optional: true },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'electrical-switch-material', title: 'Schalter- und Steckdosen-Set', sku: 'PV-ELE-MAT-201', type: 'material', unit: 'Stk', basePrice: 1495.9, baseQuantity: 1, scalable: true, formula: 'floorCount' },
          { id: 'electrical-lighting', title: 'Beleuchtung Montagepaket', sku: 'PV-ELE-LHT-100', type: 'service', unit: 'Stk', basePrice: 129, baseQuantity: 4, scalable: true, formula: 'livingArea * (4/60)' },
          { id: 'electrical-spots', title: 'Einbaustrahler weiss', sku: 'PV-LHT-5368', type: 'material', unit: 'Stk', basePrice: 68.02, baseQuantity: 4, scalable: true, formula: 'livingArea * (4/60)' },
        ],
      },
      {
        id: 'optional',
        title: 'Optionale Positionen',
        type: 'optional',
        products: [
          { id: 'electrical-network', title: 'Netzwerkinstallation bis 50 qm', sku: 'PV-ELE-301', type: 'optional', unit: 'Stk', basePrice: 1978.96, baseQuantity: 1, optional: true },
          { id: 'electrical-shutter', title: 'Jalousieschalter Smart-Home', sku: 'PV-ELE-501', type: 'optional', unit: 'Stk', basePrice: 203.94, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
  {
    id: 'painting',
    title: 'Maler & Oberflaechen',
    lead: 'Glaetten, Grundieren, Anstrich und Rueckbau alter Tapeten.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'painting-floor-package', title: 'Malerarbeiten pro Etage', sku: 'PV-MAL-100', type: 'service', unit: 'Stk', basePrice: 355.5, baseQuantity: 1, scalable: true, formula: 'floorCount' },
          { id: 'painting-skim', title: 'Glaettung mit Feinspachtel', sku: 'PV-MAL-101', type: 'service', unit: 'qm', basePrice: 17.9, baseQuantity: 120, scalable: true, formula: 'livingArea * 2' },
          { id: 'painting-coat', title: 'Anstrich Wand- und Deckenflaechen', sku: 'PV-MAL-201', type: 'service', unit: 'qm', basePrice: 9.85, baseQuantity: 120, scalable: true, formula: 'livingArea * 2' },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'painting-primer', title: 'Grundierung der Flaechen', sku: 'PV-MAL-102', type: 'extra', unit: 'qm', basePrice: 3.91, baseQuantity: 120, scalable: true, formula: 'livingArea * 2' },
          { id: 'painting-wallpaper-remove', title: 'Alt-Tapeten entfernen und entsorgen', sku: 'PV-MAL-103', type: 'extra', unit: 'qm', basePrice: 7.87, baseQuantity: 120, scalable: true, formula: 'livingArea * 2', optional: true },
        ],
      },
    ],
  },
  {
    id: 'plumbing',
    title: 'Wasser & Sanitaer',
    lead: 'Zu- und Abwasser, Hauptstrang, Vorwandelemente und Anschluesse.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'water-bath', title: 'Wasserinstallation Badezimmer', sku: 'PV-WAS-100', type: 'service', unit: 'Stück', basePrice: 1995.9, baseQuantity: 1 },
          { id: 'water-guest', title: 'Wasserinstallation Gaeste-WC', sku: 'PV-WAS-200', type: 'service', unit: 'Stück', basePrice: 1195.9, baseQuantity: 1 },
          { id: 'water-kitchen', title: 'Wasserinstallation Kueche', sku: 'PV-WAS-300', type: 'service', unit: 'Stück', basePrice: 995.9, baseQuantity: 1 },
          { id: 'water-main', title: 'Hauptstrang Trinkwasser und Abwasser', sku: 'PV-WAS-501', type: 'service', unit: 'Stück', basePrice: 2767.9, baseQuantity: 1, scalable: true, formula: 'floorCount' },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'water-washer', title: 'Waschmaschinenanschluss', sku: 'PV-WAS-105', type: 'extra', unit: 'Stück', basePrice: 355.36, baseQuantity: 1, optional: true },
          { id: 'water-prewall', title: 'Vorsatzelement montieren', sku: 'PV-WAS-101', type: 'extra', unit: 'Stk', basePrice: 279, baseQuantity: 2 },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'water-washstand-element', title: 'Waschtisch-Montageelement', sku: 'PV-WAS-MAT-01', type: 'material', unit: 'Stück', basePrice: 203.94, baseQuantity: 1 },
          { id: 'water-wc-element', title: 'WC-Montageelement mit Spuelkasten', sku: 'PV-WAS-MAT-02', type: 'material', unit: 'Stück', basePrice: 390.06, baseQuantity: 1 },
          { id: 'water-flush-plate', title: 'Abdeckplatte fuer Unterputz-Spuelkasten', sku: 'PV-WAS-MAT-03', type: 'material', unit: 'Stück', basePrice: 101.5, baseQuantity: 1 },
        ],
      },
    ],
  },
  {
    id: 'heating',
    title: 'Heizung',
    lead: 'Heizkoerper, Heizstraenge, Bodenheizung und Waermepumpe.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'radiators',
        title: 'Heizkoerper',
        type: 'service',
        products: [
          { id: 'radiator-mount', title: 'Heizkoerper Montage', sku: 'PV-HEI-101', type: 'service', unit: 'Stk', basePrice: 149, baseQuantity: 4, scalable: true, formula: 'livingArea * (4/60)' },
          { id: 'radiator-bath', title: 'Badheizkoerper weiss', sku: 'PV-HEI-MAT-01', type: 'material', unit: 'Stk', basePrice: 388.95, baseQuantity: 1 },
          { id: 'radiator-flat', title: 'Plan-Flachheizkoerper', sku: 'PV-HEI-MAT-02', type: 'material', unit: 'Stück', basePrice: 749, baseQuantity: 1, optional: true },
          { id: 'radiator-remove', title: 'Heizkoerper demontieren und entsorgen', sku: 'PV-HEI-201', type: 'extra', unit: 'Stück', basePrice: 67.13, baseQuantity: 4, scalable: true, formula: 'livingArea * (4/60)', optional: true },
          { id: 'heating-pipes', title: 'Heizstraenge bis max. 5 m', sku: 'PV-HEI-301', type: 'extra', unit: 'Stück', basePrice: 434.56, baseQuantity: 1, scalable: true, formula: 'floorCount' },
        ],
      },
      {
        id: 'floor-heating',
        title: 'Bodenheizung',
        type: 'service',
        products: [
          { id: 'floor-heating-install', title: 'Bodenheizung Montagepaket', sku: 'PV-HEI-FBH-100', type: 'service', unit: 'qm', basePrice: 89, baseQuantity: 60, scalable: true, formula: 'livingArea' },
          { id: 'floor-heating-dry-screed', title: 'Trockenestrichplatten', sku: 'PV-ROH-501', type: 'material', unit: 'qm', basePrice: 48.46, baseQuantity: 60, scalable: true, formula: 'livingArea' },
          { id: 'floor-heating-remove-screed', title: 'Alt-Estrich entfernen und entsorgen', sku: 'PV-ROH-502', type: 'extra', unit: 'qm', basePrice: 45.89, baseQuantity: 60, scalable: true, formula: 'livingArea', optional: true },
          { id: 'floor-heating-electric', title: 'Elektrische Flaechenheizung Zusatzflaeche', sku: 'PV-HEI-FBH-200', type: 'optional', unit: 'qm', basePrice: 69, baseQuantity: 3, optional: true },
        ],
      },
      {
        id: 'heat-pump',
        title: 'Thermen & Waermepumpen',
        type: 'service',
        products: [
          { id: 'heat-pump-mount', title: 'Waermepumpe Montagepaket', sku: 'PV-HEI-WP-100', type: 'service', unit: 'Stück', basePrice: 4500, baseQuantity: 1, optional: true },
          { id: 'heat-pump-12kw', title: '12 KW Waermepumpe Paket', sku: 'PV-HEI-WP-411', type: 'material', unit: 'Stück', basePrice: 10542.42, baseQuantity: 1, optional: true },
          { id: 'heat-pump-foundation', title: 'Fundament fuer Waermepumpe', sku: 'PV-HEI-WP-401', type: 'extra', unit: 'Stück', basePrice: 2495, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
  {
    id: 'bathroom',
    title: 'Bad & Gaeste-WC',
    lead: 'Fliesen, Sanitaerobjekte, Dusche, Wanne und barrierearme Extras.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'bath-tiles',
        title: 'Fliesen Badezimmer',
        type: 'service',
        products: [
          { id: 'bath-tiles-install', title: 'Fliesen Bad Montagepaket', sku: 'PV-BAD-100', type: 'service', unit: 'Stück', basePrice: 5995, baseQuantity: 1 },
          { id: 'bath-wall-tile', title: 'Wandfliese weiss matt', sku: 'PV-BAD-FL-01', type: 'material', unit: 'qm', basePrice: 30.22, baseQuantity: 18 },
          { id: 'bath-floor-tile', title: 'Bodenfliese dunkelgrau', sku: 'PV-BAD-FL-02', type: 'material', unit: 'qm', basePrice: 30.22, baseQuantity: 6 },
          { id: 'bath-mosaic', title: 'Mosaikfliese Akzent', sku: 'PV-BAD-FL-03', type: 'material', unit: 'qm', basePrice: 298.67, baseQuantity: 3 },
          { id: 'bath-adhesive', title: 'Flexkleber und Fugenmaterial', sku: 'PV-BAD-MAT-04', type: 'material', unit: 'Sack', basePrice: 53.75, baseQuantity: 6 },
        ],
      },
      {
        id: 'bath-sanitary',
        title: 'Sanitaer Badezimmer',
        type: 'service',
        products: [
          { id: 'bath-sanitary-install', title: 'Sanitaer Bad Montagepaket', sku: 'PV-BAD-500', type: 'service', unit: 'Stück', basePrice: 1995, baseQuantity: 1 },
          { id: 'bath-wc', title: 'Wand-Tiefspuel-WC', sku: 'PV-BAD-WC', type: 'material', unit: 'Stück', basePrice: 191.57, baseQuantity: 1 },
          { id: 'bath-washstand', title: 'Waschtisch 60 cm', sku: 'PV-BAD-WT', type: 'material', unit: 'Stück', basePrice: 191.57, baseQuantity: 1 },
          { id: 'bath-tub', title: 'Badewanne Stahl 180 x 80 cm', sku: 'PV-BAD-WANNE', type: 'material', unit: 'Stück', basePrice: 1039.5, baseQuantity: 1 },
          { id: 'bath-shower-system', title: 'Duschsystem mit Einhandmischer', sku: 'PV-BAD-DUSCH', type: 'material', unit: 'Stück', basePrice: 608.85, baseQuantity: 1 },
          { id: 'bath-walk-in', title: 'Ebenerdigen Duschbereich herstellen', sku: 'PV-BAD-507', type: 'optional', unit: 'Stück', basePrice: 1579.9, baseQuantity: 1, optional: true },
        ],
      },
      {
        id: 'guest-wc',
        title: 'Gaeste-WC',
        type: 'service',
        products: [
          { id: 'guest-tiles-install', title: 'Fliesen Gaeste-WC Montagepaket', sku: 'PV-GWC-100', type: 'service', unit: 'Stück', basePrice: 2470.9, baseQuantity: 1 },
          { id: 'guest-sanitary-install', title: 'Sanitaer Gaeste-WC Montagepaket', sku: 'PV-GWC-500', type: 'service', unit: 'Stück', basePrice: 1183.9, baseQuantity: 1 },
          { id: 'guest-wall-tile', title: 'Gaeste-WC Wandfliese', sku: 'PV-GWC-FL-01', type: 'material', unit: 'qm', basePrice: 30.22, baseQuantity: 12 },
          { id: 'guest-floor-tile', title: 'Gaeste-WC Bodenfliese', sku: 'PV-GWC-FL-02', type: 'material', unit: 'qm', basePrice: 30.22, baseQuantity: 4 },
          { id: 'guest-handbasin', title: 'Handwaschbecken 45 cm', sku: 'PV-GWC-WT', type: 'material', unit: 'Stück', basePrice: 201.96, baseQuantity: 1 },
        ],
      },
      {
        id: 'accessibility',
        title: 'Optionale Positionen',
        type: 'optional',
        collapsedByDefault: true,
        products: [
          { id: 'bath-folding-seat', title: 'Klappsitz barrierearm', sku: 'PV-BAD-BF-01', type: 'optional', unit: 'Stück', basePrice: 676.17, baseQuantity: 1, optional: true },
          { id: 'bath-angle-grip', title: 'Winkelgriff barrierearm', sku: 'PV-BAD-BF-02', type: 'optional', unit: 'Stück', basePrice: 255.42, baseQuantity: 1, optional: true },
          { id: 'bath-hygiene-set', title: 'Hygiene-Zubehoer Set', sku: 'PV-BAD-BF-03', type: 'optional', unit: 'Stück', basePrice: 112.86, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
  {
    id: 'flooring',
    title: 'Boeden & Belag',
    lead: 'Holzboden, Fliesenboden, Rueckbau, Ausgleich und Sockelleisten.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'wood-floor',
        title: 'Holz-Boden',
        type: 'service',
        products: [
          { id: 'wood-floor-install', title: 'Holzboden verlegen', sku: 'PV-BOD-100', type: 'service', unit: 'qm', basePrice: 19.9, baseQuantity: 50, scalable: true, formula: 'livingArea * (50/60)' },
          { id: 'wood-floor-remove', title: 'Alt-Boden entfernen und entsorgen', sku: 'PV-BOD-101', type: 'extra', unit: 'qm', basePrice: 15.79, baseQuantity: 50, scalable: true, formula: 'livingArea * (50/60)' },
          { id: 'wood-floor-parquet', title: 'Fertigparkett 3-Schicht', sku: 'PV-BOD-MAT-01', type: 'material', unit: 'qm', basePrice: 49.83, baseQuantity: 28, scalable: true, formula: 'livingArea * (28/60)' },
          { id: 'wood-floor-skirting', title: 'Sockelleiste MDF weiss', sku: 'PV-BOD-MAT-02', type: 'material', unit: 'lfm', basePrice: 3.56, baseQuantity: 28, scalable: true, formula: 'livingArea * (28/60)' },
          { id: 'wood-floor-leveling', title: 'Bodenausgleich bis 1 cm', sku: 'PV-BOD-102', type: 'optional', unit: 'qm', basePrice: 39.9, baseQuantity: 1, optional: true },
        ],
      },
      {
        id: 'tile-floor',
        title: 'Fliesen-Boden',
        type: 'service',
        products: [
          { id: 'tile-floor-install', title: 'Bodenfliesen verlegen', sku: 'PV-BOD-400', type: 'service', unit: 'qm', basePrice: 59.9, baseQuantity: 15, scalable: true, formula: 'livingArea * (15/60)' },
          { id: 'tile-floor-material', title: 'Feinsteinzeug Bodenfliese', sku: 'PV-BOD-FL-01', type: 'material', unit: 'qm', basePrice: 46.2, baseQuantity: 17, scalable: true, formula: 'livingArea * (17/60)' },
          { id: 'tile-floor-skirting', title: 'Fliesensockel', sku: 'PV-BOD-FL-02', type: 'material', unit: 'qm', basePrice: 14.53, baseQuantity: 17, scalable: true, formula: 'livingArea * (17/60)' },
          { id: 'tile-floor-silicone', title: 'Neutral-Silikon', sku: 'PV-BOD-FL-03', type: 'material', unit: 'Stk', basePrice: 8.79, baseQuantity: 3 },
        ],
      },
    ],
  },
  {
    id: 'doors-windows',
    title: 'Tueren & Fenster',
    lead: 'Innentueren, Haustuer, Fenster, Balkontuer und Rolladen.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'doors',
        title: 'Tueren | Basis',
        type: 'service',
        products: [
          { id: 'doors-install', title: 'Tueren Montagepaket', sku: 'PV-TUER-100', type: 'service', unit: 'Stk', basePrice: 149.9, baseQuantity: 5, scalable: true, formula: 'livingArea * (5/60)' },
          { id: 'doors-remove', title: 'Alt-Tueren demontieren und entsorgen', sku: 'PV-TUER-101', type: 'extra', unit: 'Stück', basePrice: 49.5, baseQuantity: 5, scalable: true, formula: 'livingArea * (5/60)' },
          { id: 'doors-interior', title: 'Innentuerelement weiss', sku: 'PV-TUER-MAT-01', type: 'material', unit: 'Stk', basePrice: 387.59, baseQuantity: 3, scalable: true, formula: 'livingArea * (3/60)' },
          { id: 'doors-handle', title: 'Rosettengarnitur Edelstahl', sku: 'PV-TUER-MAT-02', type: 'material', unit: 'Stk', basePrice: 57.56, baseQuantity: 3, scalable: true, formula: 'livingArea * (3/60)' },
          { id: 'doors-front', title: 'Aluminium Haustuer anthrazit', sku: 'PV-TUER-MAT-03', type: 'material', unit: 'Stk', basePrice: 1755.6, baseQuantity: 1 },
          { id: 'doors-sliding', title: 'Schiebetuer weiss', sku: 'PV-TUER-MAT-04', type: 'material', unit: 'Stück', basePrice: 299.01, baseQuantity: 1, optional: true },
        ],
      },
      {
        id: 'windows',
        title: 'Fenster & Balkontueren',
        type: 'service',
        products: [
          { id: 'windows-install', title: 'Fenster und Tueren Montagepaket', sku: 'PV-FEN-100', type: 'service', unit: 'Stk', basePrice: 415.31, baseQuantity: 7, scalable: true, formula: 'livingArea * (7/60)' },
          { id: 'windows-remove', title: 'Alt-Fenster demontieren und entsorgen', sku: 'PV-FEN-102', type: 'extra', unit: 'Stück', basePrice: 70.5, baseQuantity: 6, scalable: true, formula: 'livingArea * (6/60)' },
          { id: 'window-small', title: 'Kunststofffenster bis 1 m Kantenlaenge', sku: 'PV-FEN-MAT-01', type: 'material', unit: 'Stück', basePrice: 857.82, baseQuantity: 2, scalable: true, formula: 'livingArea * (2/60)' },
          { id: 'window-medium', title: 'Kunststofffenster bis 2 m Kantenlaenge', sku: 'PV-FEN-MAT-02', type: 'material', unit: 'Stück', basePrice: 1264.16, baseQuantity: 2, scalable: true, formula: 'livingArea * (2/60)' },
          { id: 'window-large', title: 'Kunststofffenster bis 3 m Kantenlaenge', sku: 'PV-FEN-MAT-03', type: 'material', unit: 'Stück', basePrice: 1670.49, baseQuantity: 1, scalable: true, formula: 'livingArea * (1/60)' },
          { id: 'balcony-door', title: 'Balkontuer Kunststoff', sku: 'PV-FEN-MAT-04', type: 'material', unit: 'Stück', basePrice: 653.19, baseQuantity: 1 },
          { id: 'window-roller', title: 'Rolladenpanzer manuell', sku: 'PV-FEN-ROL-01', type: 'optional', unit: 'Stück', basePrice: 1292, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
  {
    id: 'kitchen',
    title: 'Kueche & Moebel',
    lead: 'Kuechenmontage, Einbaukueche und kleine Ausstattungspositionen.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausfuehrung',
        type: 'service',
        products: [
          { id: 'kitchen-install', title: 'Kuechenmontage pauschal', sku: 'PV-KUE-100', type: 'service', unit: 'lfm', basePrice: 290, baseQuantity: 7 },
        ],
      },
      {
        id: 'material',
        title: 'Material',
        type: 'material',
        products: [
          { id: 'kitchen-l-shape', title: 'Einbaukueche L-Form weiss', sku: 'PV-KUE-MAT-01', type: 'material', unit: 'Stk', basePrice: 5424.02, baseQuantity: 1 },
          { id: 'kitchen-compact', title: 'Einbaukueche kompakt weiss', sku: 'PV-KUE-MAT-02', type: 'material', unit: 'Stk', basePrice: 3616.41, baseQuantity: 1, optional: true },
        ],
      },
      {
        id: 'extras',
        title: 'Extra Positionen',
        type: 'extra',
        products: [
          { id: 'kitchen-bin', title: 'Einbau-Abfallsammler', sku: 'PV-KUE-ZUB-01', type: 'extra', unit: 'Stk', basePrice: 109.48, baseQuantity: 1, optional: true },
          { id: 'kitchen-towel', title: 'Handtuchhalter zweiarmig', sku: 'PV-KUE-ZUB-02', type: 'extra', unit: 'Stk', basePrice: 141.61, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
  {
    id: 'facade-outdoor',
    title: 'Fassade & Aussenanlagen',
    lead: 'WDVS, Abdichtung, Terrasse, Zaun und Container.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'facade',
        title: 'Fassade',
        type: 'service',
        products: [
          { id: 'facade-wdvs', title: 'Fassadendaemmung WDVS Montagepaket', sku: 'PV-FAS-100', type: 'service', unit: 'qm', basePrice: 59, baseQuantity: 80, scalable: true, formula: 'livingArea * (80/60)' },
          { id: 'facade-insulation', title: 'Mineralwoll-Daemmplatte 140 mm', sku: 'PV-FAS-MAT-01', type: 'material', unit: 'qm', basePrice: 30.48, baseQuantity: 80, scalable: true, formula: 'livingArea * (80/60)' },
          { id: 'facade-adhesive', title: 'Klebe- und Armierungsmoertel', sku: 'PV-FAS-MAT-02', type: 'material', unit: 'Sack', basePrice: 23.1, baseQuantity: 40, scalable: true, formula: 'livingArea * (40/60)' },
          { id: 'facade-plaster', title: 'Edelkratzputz fein', sku: 'PV-FAS-MAT-03', type: 'material', unit: 'Sack', basePrice: 19.73, baseQuantity: 60, scalable: true, formula: 'livingArea * (60/60)' },
          { id: 'facade-profile', title: 'Sockelabschlussprofil', sku: 'PV-FAS-MAT-04', type: 'material', unit: 'Stk', basePrice: 13.7, baseQuantity: 16, scalable: true, formula: 'livingArea * (16/60)' },
        ],
      },
      {
        id: 'basement',
        title: 'Abdichtung',
        type: 'service',
        products: [
          { id: 'perimeter-seal', title: 'Perimeterdaemmung und Abdichtung', sku: 'PV-ABD-101', type: 'service', unit: 'qm', basePrice: 249, baseQuantity: 1, optional: true },
          { id: 'perimeter-board', title: 'Sockel Perimeter-Daemmplatte', sku: 'PV-ABD-MAT-01', type: 'material', unit: 'qm', basePrice: 22.62, baseQuantity: 1, optional: true },
        ],
      },
      {
        id: 'outdoor',
        title: 'Garten & Terrassen',
        type: 'service',
        products: [
          { id: 'terrace-stone', title: 'Terrasse aus Stein Montagepaket', sku: 'PV-GAR-100', type: 'service', unit: 'qm', basePrice: 129, baseQuantity: 20, optional: true },
          { id: 'terrace-material', title: 'Feinsteinzeug Terrassenplatten', sku: 'PV-GAR-MAT-01', type: 'material', unit: 'qm', basePrice: 63.69, baseQuantity: 22, optional: true },
          { id: 'fence-metal', title: 'Metallzaun Montage', sku: 'PV-ZAU-100', type: 'service', unit: 'lfm', basePrice: 149, baseQuantity: 20, optional: true },
          { id: 'fence-set', title: 'Metallzaun Komplett-Set', sku: 'PV-ZAU-MAT-01', type: 'material', unit: 'Set', basePrice: 1875.14, baseQuantity: 1, optional: true },
          { id: 'container-rubble', title: 'Container Bauschutt', sku: 'PV-ENT-101', type: 'extra', unit: 'Stk', basePrice: 490.05, baseQuantity: 4, optional: true, scalable: true, formula: 'livingArea * (4/60)' },
        ],
      },
    ],
  },
  {
    id: 'stairs',
    title: 'Treppen Aufbereitung',
    lead: 'Stufen, Podeste und Geländer lackieren und aufbereiten.',
    collapsedByDefault: true,
    subsections: [
      {
        id: 'execution',
        title: 'Art der Ausführung',
        type: 'service',
        products: [
          { id: 'stairs-steps', title: 'Treppenstufen Lackierung', sku: 'PV-TRE-301', type: 'service', unit: 'Stück', basePrice: 99, baseQuantity: 15, optional: true },
          { id: 'stairs-landing', title: 'Aufbereiten Podest (schleifen & lackieren)', sku: 'PV-TRE-201', type: 'service', unit: 'Stück', basePrice: 198, baseQuantity: 1, optional: true },
          { id: 'stairs-railing', title: 'Treppengeländer Lackierung', sku: 'PV-TRE-302', type: 'service', unit: 'Stück', basePrice: 589.9, baseQuantity: 1, optional: true },
        ],
      },
    ],
  },
];


export const ROOF_CATEGORY_SEED: CategorySeed = {
  id: 'roof',
  title: 'Dach & Fassade (Neu)',
  lead: 'Dachsanierung, Dämmung, Eindeckung und Rinnen.',
  subsections: [
    {
      id: 'execution',
      title: 'Art der Ausfuehrung',
      collapsedByDefault: true,
      type: 'service',
      products: [
        { id: 'roof-scaffolding', title: 'Geruestbau inkl. Standzeit', sku: 'PV-DACH-100', type: 'service', unit: 'qm', basePrice: 12.50, baseQuantity: 150, scalable: true, formula: 'livingArea * 2.5' },
        { id: 'roof-demolition', title: 'Alteindeckung abnehmen und entsorgen', sku: 'PV-DACH-101', type: 'service', unit: 'qm', basePrice: 22.00, baseQuantity: 84, scalable: true, formula: 'livingArea * 1.4' },
        { id: 'roof-insulation', title: 'Aufsparrendaemmung anbringen', sku: 'PV-DACH-102', type: 'service', unit: 'qm', basePrice: 45.00, baseQuantity: 84, scalable: true, formula: 'livingArea * 1.4', optional: true },
      ],
    },
    {
      id: 'material',
      title: 'Material',
      type: 'material',
      products: [
        { id: 'roof-tiles', title: 'Dachpfannen Ton (Standard)', sku: 'PV-DACH-MAT-01', type: 'material', unit: 'qm', basePrice: 35.00, baseQuantity: 84, scalable: true, formula: 'livingArea * 1.4' },
        { id: 'roof-insulation-mat', title: 'Holzfaser-Daemmplatte 140mm', sku: 'PV-DACH-MAT-02', type: 'material', unit: 'qm', basePrice: 28.00, baseQuantity: 84, scalable: true, formula: 'livingArea * 1.4', optional: true },
      ],
    },
    {
      id: 'accessories',
      title: 'Zubehoer',
      type: 'extra',
      products: [
        { id: 'roof-gutters', title: 'Dachrinne Zink inkl. Fallrohr', sku: 'PV-DACH-ZUB-01', type: 'extra', unit: 'lfm', basePrice: 48.00, baseQuantity: 14, scalable: true, formula: 'livingArea * 0.23' },
      ]
    }
  ]
};
