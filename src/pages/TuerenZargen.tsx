import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import TuerenCalculator from '../components/gewerke/TuerenCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function TuerenZargen() {
  usePageTitle('Türen & Zargen Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-lobby-tree.jpg"
        crumbNumber="24"
        crumbLabel="Gewerke · Türen & Zargen"
        title={<>Türen<br /><em>kalkulieren.</em></>}
        lede="Innentüren, Haustür, Schiebetüren oder Nebeneingang: Wählen Sie die passende Türart und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '5 Rechner' },
          { label: 'Gewerke', value: 'Türen & Zargen' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <TuerenCalculator />

      <EndCtaLocal
        eyebrow="Türen tauschen?"
        title={<>Wir messen <em>auf</em><br />und montieren passgenau.</>}
        ctaLabel="Türen anfragen"
      />
    </>
  );
}
