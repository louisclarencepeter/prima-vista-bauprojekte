import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import FassadeCalculator from '../components/gewerke/FassadeCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Fassadensanierung() {
  usePageTitle('Fassadensanierung Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-haus-exterior.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Fassaden & Dämmung"
        title={<>Fassaden &<br /><em>Dämmung kalkulieren.</em></>}
        lede="Dämmung, Anstrich, Holzverkleidung, Sockeldämmung, Riemchen oder Vorhangfassade: Wählen Sie die passende Fassadenleistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '10 Rechner' },
          { label: 'Gewerke', value: 'Putz & WDVS' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <FassadeCalculator />

      <EndCtaLocal
        eyebrow="Fassade erneuern?"
        title={<>Wir prüfen <em>Untergrund</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Fassade anfragen"
      />
    </>
  );
}
