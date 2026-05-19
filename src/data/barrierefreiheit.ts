export type BarrierefreiheitVariantKey =
  | 'complete'
  | 'water'
  | 'shower'
  | 'wc'
  | 'washbasin'
  | 'handles'
  | 'seat'
  | 'tiles'
  | 'hygiene';

export type BarrierefreiheitVariant = {
  key: BarrierefreiheitVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const BARRIEREFREIHEIT_VARIANTS: BarrierefreiheitVariant[] = [
  {
    key: 'complete',
    num: '01',
    title: 'Barrierefreies Bad',
    lead: 'Komplettpaket',
    detail: 'Bodengleiche Dusche, barrierefreies WC, unterfahrbarer Waschtisch, Haltegriffe, rutschfeste Beläge und Sanitärmontage koordiniert.',
    image: '/assets/img/photo-bad-prima-vista.jpg',
    netBase: 18400,
  },
  {
    key: 'water',
    num: '02',
    title: 'Wasserinstallation Badezimmer',
    lead: 'Anschlüsse',
    detail: 'Wasser- und Abwasseranschlüsse im Bad vorbereiten, verlegen und für barrierearme Sanitärobjekte abstimmen.',
    image: '/assets/img/proj-spa-corridor.jpg',
    netBase: 1996,
  },
  {
    key: 'shower',
    num: '03',
    title: 'Ebenerdiger Duschbereich',
    lead: 'Bodengleich',
    detail: 'Duschbereich ebenerdig herstellen, abdichten, befliesen und für sicheren Einstieg mit Bewegungsfläche vorbereiten.',
    image: '/assets/img/proj-bath-stone.jpg',
    netBase: 1580,
  },
  {
    key: 'wc',
    num: '04',
    title: 'Barrierefreies WC',
    lead: 'Vital-WC',
    detail: 'Wand-WC mit Vorwandelement, Spülkasten, Sitz und bedienfreundlicher Ausstattung montieren.',
    image: '/assets/img/photo-bad-prima-vista.jpg',
    netBase: 2380,
  },
  {
    key: 'washbasin',
    num: '05',
    title: 'Unterfahrbarer Waschtisch',
    lead: 'Waschplatz',
    detail: 'Barrierefreier Waschtisch mit UP-Siphon, Armatur und rollstuhlgerechter Nutzungshöhe montieren.',
    image: '/assets/img/proj-bath-double.jpg',
    netBase: 1342,
  },
  {
    key: 'handles',
    num: '06',
    title: 'Stütz- & Haltegriffe',
    lead: 'Sicherheit',
    detail: 'Stützklappgriff, Winkelgriff und Haltepunkte an WC, Dusche oder Waschtisch sicher befestigen.',
    image: '/assets/img/proj-concrete-corner.jpg',
    netBase: 870,
  },
  {
    key: 'seat',
    num: '07',
    title: 'Duschsitz',
    lead: 'Komfort',
    detail: 'Klappsitz oder Duschsitz mit tragfähiger Befestigung und abgestimmter Position im Duschbereich montieren.',
    image: '/assets/img/proj-spa-tub.jpg',
    netBase: 676,
  },
  {
    key: 'tiles',
    num: '08',
    title: 'Rutschfeste Badfliesen',
    lead: 'Beläge',
    detail: 'Badflächen mit rutschhemmenden Fliesen, Abdichtung, Kleber, Fuge, Silikon und Profilen ausführen.',
    image: '/assets/img/proj-moroccan-corner.jpg',
    netBase: 5995,
  },
  {
    key: 'hygiene',
    num: '09',
    title: 'Hygienezubehör',
    lead: 'Ausstattung',
    detail: 'Hygienebeutelspender, Abfallbox, Desinfektionsmittel- oder Seifenspender passend zur Nutzung ergänzen.',
    image: '/assets/img/proj-spa-bath.jpg',
    netBase: 738,
  },
];

export const BARRIEREFREIHEIT_EXTRAS = [
  { key: 'planning', label: 'Aufmaß & Bewegungsflächenplanung', netPrice: 950 },
  { key: 'demolition', label: 'Rückbau Bestand & Entsorgung', netPrice: 2400 },
  { key: 'door', label: 'Türverbreiterung & schwellenarmer Zugang', netPrice: 3200 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
