import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import TreppenCalculator from '../components/gewerke/TreppenCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function TreppenGelaender() {
  usePageTitle('Treppen & Geländer Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-stairs-concrete.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Treppen & Geländer"
        title={<>Treppen &<br /><em>Geländer kalkulieren.</em></>}
        lede="Holztreppe, Betontreppe, Treppenloch, Geländer, Außen-, Raumspar- oder Spindeltreppe: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '11 Rechner' },
          { label: 'Gewerke', value: 'Holz, Beton, Stahl' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <TreppenCalculator />

      <EndCtaLocal
        eyebrow="Treppen planen?"
        title={<>Wir prüfen <em>Aufmaß</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Treppen anfragen"
      />
    </>
  );
}
