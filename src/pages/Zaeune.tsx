import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import ZaeuneCalculator from '../components/gewerke/ZaeuneCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Zaeune() {
  usePageTitle('Zäune Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-haus-exterior.jpg"
        crumbNumber="25"
        crumbLabel="Gewerke · Zäune"
        title={<>Zäune<br /><em>kalkulieren.</em></>}
        lede="Doppelstab, Holz, Sichtschutz oder Maschendraht: Wählen Sie die passende Zaunart und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '5 Rechner' },
          { label: 'Gewerke', value: 'Zäune & Tore' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <ZaeuneCalculator />

      <EndCtaLocal
        eyebrow="Grundstück einfrieden?"
        title={<>Wir setzen <em>Pfosten</em><br />und montieren passgenau.</>}
        ctaLabel="Zaun anfragen"
      />
    </>
  );
}
