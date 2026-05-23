import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import PackageDetailSection from '../components/komplett-pakete/PackageDetailSection';
import { ABDICHTUNG_PACKAGES } from '../data/abdichtungPakete';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/komplett-pakete.css';

export default function AbdichtungKeller() {
  usePageTitle('Abdichtung & Keller | Prima Vista');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/proj-spa-corridor.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Abdichtung & Keller"
        title={<>Abdichtung<br /><em>kalkulieren.</em></>}
        lede="Horizontalabdichtung, Perimeterabdichtung oder Kellerabdichtung: Wählen Sie die passende Abdichtungstechnik und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '4 Systeme' },
          { label: 'Gewerke', value: 'Haus & Keller' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      {ABDICHTUNG_PACKAGES.map((pkg) => (
        <PackageDetailSection key={pkg.num} pkg={pkg} />
      ))}

      <EndCtaLocal
        eyebrow="Feuchtigkeit stoppen?"
        title={<>Wir prüfen <em>Ursache</em><br />und Abdichtungssystem vor Ort.</>}
        ctaLabel="Abdichtung anfragen"
      />
    </>
  );
}
