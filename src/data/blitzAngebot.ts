export type BlitzFormState = {
  art: 'haus' | 'wohnung' | 'gastro' | 'anderes';
  gewerke: string[];
  groesse: string;
  starttermin: string;
  msg: string;
  name: string;
  email: string;
  tel: string;
};

export const INITIAL_BLITZ_FORM: BlitzFormState = {
  art: 'haus',
  gewerke: [],
  groesse: '',
  starttermin: '',
  msg: '',
  name: '',
  email: '',
  tel: '',
};

export const BLITZ_ART_OPTIONS: Array<{ value: BlitzFormState['art']; label: string }> = [
  { value: 'haus', label: 'Haus' },
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'gastro', label: 'Gastronomie' },
  { value: 'anderes', label: 'Anderes' },
];

export const BLITZ_GEWERKE_OPTIONS = [
  'Komplettabriss / Rohbau',
  'Bad & Sanitär',
  'Küche',
  'Böden & Parkett',
  'Wände & Maler',
  'Elektrik',
  'Fassade / Dach',
  'Heizung / Energie',
];

/* ----- Handoff from Kalkulator → Blitz-Angebot ----- */

export type KalkulatorPick = {
  key: string;
  label: string;
  subtotal: number;
};

export type KalkulatorHandoff = {
  kind: BlitzFormState['art'];
  kindLabel: string;          // e.g. "2-Zimmer-Wohnung", "Restaurant"
  area: number;
  picks: KalkulatorPick[];
  totalMin: number;
  totalMax: number;
  totalMid: number;
  perM2: number;
};

/** Map kalkulator gewerke keys → BLITZ_GEWERKE_OPTIONS labels. */
const KALKULATOR_TO_BLITZ_GEWERKE: Record<string, string> = {
  // Haus / Wohnung
  bad: 'Bad & Sanitär',
  sanitaer: 'Bad & Sanitär',
  sanitaerstraenge: 'Bad & Sanitär',
  wasser: 'Bad & Sanitär',
  kueche: 'Küche',
  boeden: 'Böden & Parkett',
  maler: 'Wände & Maler',
  trockenbau: 'Wände & Maler',
  elektro: 'Elektrik',
  fassade: 'Fassade / Dach',
  dach: 'Fassade / Dach',
  fenster: 'Fassade / Dach',
  rohbau: 'Komplettabriss / Rohbau',
  abdichtung: 'Komplettabriss / Rohbau',
  abbruch: 'Komplettabriss / Rohbau',
  heizflaechen: 'Heizung / Energie',
  thermen: 'Heizung / Energie',
  // Gastronomie
  lueftung: 'Heizung / Energie',
  kuehlung: 'Heizung / Energie',
};

/** Pick the unique set of Blitz-gewerke labels matching the kalkulator picks. */
export function mapKalkulatorPicksToBlitzGewerke(picks: KalkulatorPick[]): string[] {
  const set = new Set<string>();
  for (const pick of picks) {
    const mapped = KALKULATOR_TO_BLITZ_GEWERKE[pick.key];
    if (mapped) set.add(mapped);
  }
  return Array.from(set);
}

const TSD = (n: number) => `€ ${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;

/** Build a human-readable message block from a kalkulator handoff. */
export function formatKalkulatorMessage(handoff: KalkulatorHandoff): string {
  const lines = [
    `— Aus dem Kalkulator übernommen —`,
    `Objektart: ${handoff.kindLabel}`,
    `Fläche: ${handoff.area} m²`,
    `Vorab-Schätzung: ${TSD(handoff.totalMin)} – ${TSD(handoff.totalMax)} (Mittelwert ${TSD(handoff.totalMid)} · ca. € ${Math.round(handoff.perM2).toLocaleString('de-DE')} / m²)`,
    ``,
    `Gewählte Gewerke:`,
    ...handoff.picks.map((p) => `  • ${p.label} — ${TSD(p.subtotal)}`),
  ];
  return lines.join('\n');
}
