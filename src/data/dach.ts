export type DachVariantKey =
  | 'all'
  | 'roofing'
  | 'truss'
  | 'interior'
  | 'insulation'
  | 'dormers'
  | 'windows'
  | 'lifting'
  | 'flatRoof'
  | 'atticInsulation';

export type DachVariant = {
  key: DachVariantKey;
  num: string;
  title: string;
  lead: string;
  detail: string;
  image: string;
  netBase: number;
};

export const DACH_VARIANTS: DachVariant[] = [
  {
    key: 'all',
    num: '01',
    title: 'Alles zu Dachsanierung',
    lead: 'Komplettdach',
    detail: 'Dachdeckung, Dämmung, Dachstuhl, Fenster, Gauben, Anschlüsse und Entwässerung als koordinierte Dachsanierung.',
    image: '/assets/img/photo-altbausanierung.jpg',
    netBase: 42800,
  },
  {
    key: 'roofing',
    num: '02',
    title: 'Neubedachung',
    lead: 'Dacheindeckung',
    detail: 'Neue Dachdeckung mit Lattung, Unterspannbahn, Dachpfannen oder Ziegeln und fachgerechten Anschlüssen.',
    image: '/assets/img/photo-haus-exterior.jpg',
    netBase: 28600,
  },
  {
    key: 'truss',
    num: '03',
    title: 'Dachstuhl',
    lead: 'Konstruktion',
    detail: 'Dachstuhl prüfen, ertüchtigen oder neu herstellen inklusive Holzbau, Statikabstimmung und Verbindungsmitteln.',
    image: '/assets/img/photo-parkett-rohbau.jpg',
    netBase: 32400,
  },
  {
    key: 'interior',
    num: '04',
    title: 'Dach-Innenausbau',
    lead: 'Dachraum',
    detail: 'Dachgeschoss ausbauen mit Unterkonstruktion, Dämmanschluss, Beplankung, Spachtelung und sauberer Raumkante.',
    image: '/assets/img/photo-altbausanierung.jpg',
    netBase: 21400,
  },
  {
    key: 'insulation',
    num: '05',
    title: 'Dachdämmung',
    lead: 'Energieeffizienz',
    detail: 'Zwischen-, Auf- oder Untersparrendämmung mit Dampfbremse, Anschlüssen und luftdichter Ausführung.',
    image: '/assets/img/photo-haus-exterior.jpg',
    netBase: 19800,
  },
  {
    key: 'dormers',
    num: '06',
    title: 'Gauben',
    lead: 'Mehr Raum',
    detail: 'Dachgauben mit Holzbau, Eindeckung, Dämmung, Fenstereinbau, Innenanschluss und Entwässerungsdetails.',
    image: '/assets/img/photo-altbausanierung.jpg',
    netBase: 24600,
  },
  {
    key: 'windows',
    num: '07',
    title: 'Dachfenster',
    lead: 'Belichtung',
    detail: 'Dachfenster einbauen oder tauschen inklusive Eindeckrahmen, Innenfutter und regensicherem Dachanschluss.',
    image: '/assets/img/photo-office-light.jpg',
    netBase: 7600,
  },
  {
    key: 'lifting',
    num: '08',
    title: 'Dachanhebung hydraulisch',
    lead: 'Aufstockung',
    detail: 'Hydraulische Dachanhebung mit Vorbereitung, Sicherung, Holzbauanpassung und anschließender Dachabdichtung.',
    image: '/assets/img/photo-parkett-rohbau.jpg',
    netBase: 38200,
  },
  {
    key: 'flatRoof',
    num: '09',
    title: 'Flachdach-Beschichtung',
    lead: 'Flachdach',
    detail: 'Flachdachfläche reinigen, vorbereiten, abdichten und mit Schutz- oder Flüssigkunststoffsystem beschichten.',
    image: '/assets/img/proj-concrete-corner.jpg',
    netBase: 13400,
  },
  {
    key: 'atticInsulation',
    num: '10',
    title: 'Dachboden-Dämmung',
    lead: 'Geschossdecke',
    detail: 'Dachboden oder oberste Geschossdecke dämmen inklusive Randanschlüssen, Laufwegen und sauberer Übergabe.',
    image: '/assets/img/photo-parkett-rohbau.jpg',
    netBase: 9800,
  },
];

export const DACH_EXTRAS = [
  { key: 'scaffold', label: 'Gerüst & Baustelleneinrichtung', netPrice: 4200 },
  { key: 'demolition', label: 'Rückbau alter Dachaufbau', netPrice: 3600 },
  { key: 'gutters', label: 'Rinnen, Fallrohre & Blechanschlüsse', netPrice: 2800 },
] as const;

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}
