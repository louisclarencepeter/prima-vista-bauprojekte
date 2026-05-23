export type TradeKey =
  | 'bad' | 'kueche' | 'fassade' | 'dach' | 'elektro' | 'boden'
  | 'treppen' | 'heizung' | 'abdichtung' | 'maler' | 'trockenbau' | 'sanitaer' | 'rohbau' | 'tueren' | 'zaun'
  | 'garten' | 'barrierefreiheit' | 'fenster' | 'thermen';

export type TradeRow = {
  num: string;
  name: string;
  lead: string;
  key: TradeKey;
  detailTo?: string;
};

export type FeaturedTrade = {
  src: string;
  title: string;
  count: string;
  heading: [string, string];
  desc: string;
  feature?: boolean;
  revealDelay?: number;
  detailTo?: string;
};

export const PREVIEW_IMAGES: Record<TradeKey, string> = {
  bad: '/assets/img/proj-bath-double.jpg',
  kueche: '/assets/img/proj-kitchen-oak.jpg',
  fassade: '/assets/img/photo-haus-exterior.jpg',
  dach: '/assets/img/photo-altbausanierung.jpg',
  elektro: '/assets/img/photo-office-light.jpg',
  boden: '/assets/img/photo-parkett-altbau.jpg',
  treppen: '/assets/img/proj-stairs-concrete.jpg',
  heizung: '/assets/img/proj-floor-oak.jpg',
  abdichtung: '/assets/img/proj-spa-corridor.jpg',
  maler: '/assets/img/proj-paint-swatches.jpg',
  trockenbau: '/assets/img/proj-concrete-corner.jpg',
  sanitaer: '/assets/img/proj-spa-tub.jpg',
  rohbau: '/assets/img/photo-parkett-rohbau.jpg',
  tueren: '/assets/img/proj-lobby-tree.jpg',
  zaun: '/assets/img/proj-concrete-sofa-tall.jpg',
  garten: '/assets/img/proj-moroccan-corner.jpg',
  barrierefreiheit: '/assets/img/proj-bath-stone.jpg',
  fenster: '/assets/img/proj-lobby-tree-wide.jpg',
  thermen: '/assets/img/proj-floor-oak.jpg',
};

export const TRADES: TradeRow[] = [
  { num: '01', name: 'Abdichtungen', lead: 'Feuchtigkeit', key: 'abdichtung', detailTo: '/abdichtung-keller' },
  { num: '02', name: 'Badsanierung & Gäste WC', lead: 'Wanne, Dusche, WC', key: 'bad', detailTo: '/badsanierung' },
  { num: '03', name: 'Barrierefreies Bad', lead: 'Bad, Dusche, WC', key: 'barrierefreiheit', detailTo: '/barrierefreiheit' },
  { num: '04', name: 'Boden & Estrich', lead: 'Parkett, Stein, Vinyl', key: 'boden', detailTo: '/boeden-belaege' },
  { num: '05', name: 'Dachsanierungen', lead: 'Eindeckung, Dämmung', key: 'dach', detailTo: '/dachsanierung' },
  { num: '06', name: 'Elektroinstallationen', lead: 'Strom, Licht, KNX', key: 'elektro', detailTo: '/elektroinstallation' },
  { num: '07', name: 'Fassaden & Dämmung', lead: 'Putz, WDVS', key: 'fassade', detailTo: '/fassadensanierung' },
  { num: '08', name: 'Fenster & Balkontüren', lead: 'Fenster, Türen, Sonnenschutz', key: 'fenster', detailTo: '/fenstertechnik' },
  { num: '09', name: 'Garten & Terassen', lead: 'Terrasse, Wege', key: 'garten', detailTo: '/garten-aussenanlagen' },
  { num: '10', name: 'Heizung & Heizstränge', lead: 'Wärmepumpe, FBH', key: 'heizung', detailTo: '/heizmethoden' },
  { num: '11', name: 'Küchen & Möbelbau', lead: 'Schreinerei', key: 'kueche', detailTo: '/kuechen-moebelbau' },
  { num: '12', name: 'Maler & Lackierungen', lead: 'Farben, Tapeten', key: 'maler', detailTo: '/maler-lackierer' },
  { num: '13', name: 'Rohbau Leistungen', lead: 'Fundament, Mauerwerk, Decken', key: 'rohbau', detailTo: '/rohbau-abbruch' },
  { num: '14', name: 'Thermen & Heiztechnik', lead: 'Gas, Öl, Wärmepumpen', key: 'thermen', detailTo: '/heizmethoden' },
  { num: '15', name: 'Treppen & Geländer', lead: 'Holz, Beton, Stahl', key: 'treppen', detailTo: '/treppen-gelaender' },
  { num: '16', name: 'Türen & Tore', lead: 'Innen, Haus, Schiebe', key: 'tueren', detailTo: '/tueren-zargen' },
  { num: '17', name: 'Trockenbau', lead: 'Wände, Decken', key: 'trockenbau', detailTo: '/trockenbau' },
  { num: '18', name: 'Wasserinstallationen', lead: 'Wasser, Abwasser', key: 'sanitaer', detailTo: '/sanitaerinstallation' },
  { num: '19', name: 'Zaunbau', lead: 'Doppelstab, Holz, Sichtschutz', key: 'zaun', detailTo: '/zaeune' },
];

export const FEATURED_TRADES: FeaturedTrade[] = [
  {
    src: '/assets/img/photo-bad-prima-vista.jpg',
    title: 'Badezimmer — Sanitär & Fliesen',
    count: '01 — 142 Projekte',
    heading: ['Bäder &', 'Sanitär'],
    desc: 'Komplettbäder von 4 bis 28 m². Fliesen, Sanitär, Heizkörper, Beleuchtung — aus einer Bestellung.',
    feature: true,
    detailTo: '/badsanierung',
  },
  {
    src: '/assets/img/proj-kitchen-oak.jpg',
    title: 'Küchen & Möbelbau',
    count: '02 — 98 Projekte',
    heading: ['Küchen &', 'Möbelbau'],
    desc: 'Maßgefertigte Schreiner­küchen und Einbauten.',
    revealDelay: 1,
    detailTo: '/kuechen-moebelbau',
  },
  {
    src: '/assets/img/photo-parkett-altbau.jpg',
    title: 'Bodenbeläge',
    count: '03 — 187 Projekte',
    heading: ['Böden &', 'Beläge'],
    desc: 'Parkett, Vinyl, Naturstein, Estrich, Industrieboden.',
    revealDelay: 2,
    detailTo: '/boeden-belaege',
  },
];

export const PROCESS_STEPS = [
  { num: '01', label: 'Erstgespräch', title: 'Aufnahme vor Ort', desc: 'Termin in 48 Stunden. Wir messen, hören zu und skizzieren grobe Optionen.' },
  { num: '02', label: 'Festpreis', title: 'Verbindliches Angebot', desc: 'Innerhalb von 14 Tagen erhalten Sie ein Festpreis-Angebot mit Endtermin.' },
  { num: '03', label: 'Bauphase', title: 'Eine Bauleitung', desc: 'Wöchentlicher Status, ein Ansprechpartner, alle Gewerke unter Vertrag.' },
  { num: '04', label: 'Übergabe', title: 'Abnahme & Pflege', desc: 'Schlüsselübergabe, Pflegeprotokoll, 5 Jahre Werks­gewähr — und Sie sind drin.' },
];
