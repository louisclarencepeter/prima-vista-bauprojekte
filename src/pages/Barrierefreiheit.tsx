import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import BarrierefreiheitCalculator from '../components/gewerke/BarrierefreiheitCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizkoerper.css';

export default function Barrierefreiheit() {
  usePageTitle('Barrierefreiheit Kostenrechner');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-bad-prima-vista.jpg"
        crumbNumber="03"
        crumbLabel="Gewerke · Barrierefreiheit"
        title={<>Barrierefreiheit<br /><em>kalkulieren.</em></>}
        lede="Bodengleiche Dusche, barrierefreies WC, unterfahrbarer Waschtisch, Haltegriffe, Duschsitz und rutschfeste Beläge: Wählen Sie die passende Leistung und erhalten Sie eine erste Vorab-Schätzung."
        meta={[
          { label: 'Varianten', value: '9 Rechner' },
          { label: 'Gewerke', value: 'Bad & Sanitär' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <BarrierefreiheitCalculator />

      <EndCtaLocal
        eyebrow="Barrierearm umbauen?"
        title={<>Wir prüfen <em>Bewegungsflächen</em><br />und Anschlüsse vor Ort.</>}
        ctaLabel="Barrierefreiheit anfragen"
      />
    </>
  );
}
