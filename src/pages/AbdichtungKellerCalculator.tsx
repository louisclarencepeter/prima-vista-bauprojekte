import { useParams, Navigate, Link } from 'react-router-dom';
import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import RenovationCalculator from '../components/renovation-calculator/RenovationCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';

const VALID_TYPES = ['horizontal', 'perimeter', 'keller', 'alles'];

const TYPE_CONFIG = {
  horizontal: {
    title: 'Horizontalabdichtung',
    packageId: 'abdichtungHorizontal',
    lede: 'Berechnen Sie die Kosten für eine professionelle Horizontalsperre gegen aufsteigende Feuchtigkeit im Mauerwerk.',
    image: '/assets/img/proj-concrete-corner.jpg',
  },
  perimeter: {
    title: 'Perimeterabdichtung',
    packageId: 'abdichtungPerimeter',
    lede: 'Kalkulieren Sie die Außenabdichtung Ihrer erdberührten Kellerwände inklusive Erdarbeiten und Wärmedämmung.',
    image: '/assets/img/proj-spa-corridor.jpg',
  },
  keller: {
    title: 'Kellerabdichtung (Innen)',
    packageId: 'abdichtungKeller',
    lede: 'Ermitteln Sie die Kosten für eine hochwertige Innenabdichtung und Sperrputzsysteme zur Kellerinstandsetzung.',
    image: '/assets/img/proj-concrete-sofa.jpg',
  },
  alles: {
    title: 'Komplette Abdichtung',
    packageId: 'abdichtung',
    lede: 'Der Profi-Kalkulator für Ihr gesamtes Gebäude: Kombinieren Sie Horizontal-, Perimeter- und Innenabdichtung.',
    image: '/assets/img/proj-stairs-concrete.jpg',
  },
};

export default function AbdichtungKellerCalculator() {
  const { type } = useParams<{ type: string }>();
  
  if (!type || !VALID_TYPES.includes(type)) {
    return <Navigate to="/abdichtung-keller" replace />;
  }
  
  const config = TYPE_CONFIG[type as keyof typeof TYPE_CONFIG];
  usePageTitle(`${config.title} Kostenrechner`);

  return (
    <>
      <PageIntro
        backgroundImage={config.image}
        crumbNumber="03"
        crumbLabel={
          <>
            <Link to="/abdichtung-keller" style={{ color: 'inherit', textDecoration: 'none' }}>Abdichtung & Keller</Link> · {config.title}
          </>
        }
        title={<>{config.title.split(' ').map((word, i) => i === 0 ? <span key={i}>{word}<br/></span> : <em key={i}>{word}</em>)}</>}
        lede={config.lede}
        meta={[
          { label: 'Rechner', value: config.title },
          { label: 'Gewerke', value: 'Haus & Keller' },
          { label: 'Aufmaß', value: 'Vor Ort' },
          { label: 'Angebot', value: 'Festpreisfähig' },
        ]}
      />

      <section className="kalkulator">
        <div className="kalkulator__inner kalkulator__inner--stack">
          <RenovationCalculator packageId={config.packageId} kindLabel={config.title} />
        </div>
      </section>

      <EndCtaLocal
        eyebrow="Sanierung planen?"
        title={<>Wir prüfen <em>Ursache</em><br />und Abdichtungssystem vor Ort.</>}
        ctaLabel="Abdichtung anfragen"
      />
    </>
  );
}
