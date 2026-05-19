import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import DachCalculator from '../components/gewerke/DachCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Dachsanierung() {
  usePageTitle('Dachsanierung Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-altbausanierung.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Dachsanierung"
        title={<>Dachsanierung<br /><em>kalkulieren.</em></>}
        lede="Neubedachung, Dachstuhl, Dach-Innenausbau, Dachdämmung, Gauben, Dachfenster oder Flachdach-Beschichtung: Wählen Sie die passende Dachleistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '10 Rechner' },
          { label: 'Gewerke', value: 'Dach & Dämmung' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <DachCalculator />

      <EndCtaLocal
        eyebrow="Dach erneuern?"
        title={<>Wir prüfen <em>Aufbau</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Dachsanierung anfragen"
      />
    </>
  );
}
