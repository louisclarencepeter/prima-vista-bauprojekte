export type AbdichtungVariantKey =
  | 'all'
  | 'horizontal'
  | 'perimeter'
  | 'basement';

export type AbdichtungVariant = {
  key: AbdichtungVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const ABDICHTUNG_VARIANTS: AbdichtungVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Abdichtungstechnik',
    lead: 'Haus & Keller',
    detail: 'Feuchteanalyse, Kellerabdichtung, Horizontalabdichtung, Perimeterabdichtung und Schutzschichten koordiniert aus einer Hand.',
    image: '/assets/img/proj-spa-corridor.jpg',
    netBase: 18400,
  },
  {
    key: 'horizontal',
    num: '02',
    title: 'Horizontal-Abdichtung',
    lead: 'Mauerwerk',
    detail: 'Horizontalsperre gegen aufsteigende Feuchtigkeit inklusive Bohrbild, Injektion und Abdichtung der Wandzone.',
    image: '/assets/img/photo-altbausanierung.jpg',
    netBase: 9200,
  },
  {
    key: 'perimeter',
    num: '03',
    title: 'Perimeter-Abdichtung',
    lead: 'Erdreichkontakt',
    detail: 'Außenabdichtung erdberührter Bauteile mit Freilegung, Abdichtungssystem, Schutzlage und Perimeterdämmung nach Bedarf.',
    image: '/assets/img/photo-haus-exterior.jpg',
    netBase: 14800,
  },
  {
    key: 'basement',
    num: '04',
    title: 'Keller-Abdichtung',
    lead: 'Kellerwände',
    detail: 'Kellerabdichtung innen oder außen mit Untergrundvorbereitung, Sperrschicht, Anschlussdetails und Feuchteschutz.',
    image: '/assets/img/photo-parkett-rohbau.jpg',
    netBase: 12600,
  },
];

export const ABDICHTUNG_EXTRAS = [
  { key: 'diagnosis', label: 'Feuchteanalyse & Schadenskartierung', netPrice: 950 },
  { key: 'excavation', label: 'Freilegung & Arbeitsraum sichern', netPrice: 4200 },
  { key: 'drainage', label: 'Drainage, Schutzbahn & Verfüllung', netPrice: 3400 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
