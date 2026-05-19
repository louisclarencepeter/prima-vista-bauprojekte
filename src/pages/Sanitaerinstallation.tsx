import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import WasserCalculator from '../components/gewerke/WasserCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Sanitaerinstallation() {
  usePageTitle('Wasserinstallation Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-bad-prima-vista.jpg"
        crumbNumber="05"
        crumbLabel="Gewerke · Wasser & Sanitär"
        title={<>Wasser<br /><em>kalkulieren.</em></>}
        lede="Bad, Küche, Keller oder Außen: Wählen Sie den passenden Sanitärstrang und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '5 Rechner' },
          { label: 'Gewerke', value: 'Wasser & Sanitär' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <WasserCalculator />

      <EndCtaLocal
        eyebrow="Neuinstallation geplant?"
        title={<>Wir koordinieren <em>Trink-</em><br />und Abwasser aus einer Hand.</>}
        ctaLabel="Sanitär anfragen"
      />
    </>
  );
}
