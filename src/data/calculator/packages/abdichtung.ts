import type { RenovationPackage, RenovationProduct } from '../types';

function createProduct(
  id: string,
  category: string,
  subcategory: string,
  title: string,
  basePrice: number,
  unit: string,
  description: string,
  enabled = true,
  optional = false,
  baseQuantity = 1,
  type: 'service' | 'material' | 'extra' | 'optional' = 'service'
): RenovationProduct {
  return {
    id,
    category,
    subcategory,
    title,
    sku: `PV-ABD-${id.toUpperCase().substring(0, 6)}`,
    type,
    unit,
    basePrice,
    enabled,
    optional,
    minQuantity: 1,
    quantityStep: 1,
    baseQuantity,
    scalable: true,
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

export const packageAbdichtungHorizontal: RenovationPackage = {
  id: 'abdichtungHorizontal',
  title: 'Horizontal-Abdichtung',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'abdichtung',
      title: 'Abdichtung & Verpressung',
      lead: 'Erstellen der Horizontalsperre gegen aufsteigende Feuchte.',
      subsections: [
        {
          id: 'bohrung',
          title: 'Bohrlochketten',
          type: 'service',
          products: [
            createProduct('injektion', 'abdichtung', 'bohrung', 'Injektionscreme einbringen', 150, 'lfm', 'Hochwertige Silan-basierte Creme gegen aufsteigende Feuchte.'),
            createProduct('niederdruck', 'abdichtung', 'bohrung', 'Niederdruck-Verpressung', 45, 'lfm', 'Zusätzliche Verpressung bei Hohlräumen im Mauerwerk.', false, true)
          ]
        },
        {
          id: 'putz',
          title: 'WTA Sanierputz',
          type: 'material',
          products: [
            createProduct('sanierputz', 'abdichtung', 'putz', 'Sanierputz Innen', 85, 'qm', 'Atmungsaktiver Spezialputz für feuchtes Mauerwerk.', false, true)
          ]
        }
      ]
    }
  ]
};

export const packageAbdichtungPerimeter: RenovationPackage = {
  id: 'abdichtungPerimeter',
  title: 'Perimeter-Abdichtung',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'erdarbeiten',
      title: 'Erdarbeiten',
      lead: 'Ausschachten und Freilegen des Kellermauerwerks.',
      subsections: [
        {
          id: 'aushub',
          title: 'Aushub',
          type: 'service',
          products: [
            createProduct('bagger', 'erdarbeiten', 'aushub', 'Aushub per Bagger', 120, 'lfm', 'Fachgerechter Aushub bis Fundamentsohle.'),
            createProduct('reinigung', 'erdarbeiten', 'aushub', 'Untergrundreinigung', 25, 'qm', 'Reinigung des freigelegten Mauerwerks.')
          ]
        }
      ]
    },
    {
      id: 'abdichtung-aussen',
      title: 'Abdichtung',
      lead: 'Bitumendickbeschichtung und Perimeterdämmung.',
      subsections: [
        {
          id: 'kmb',
          title: 'Beschichtung',
          type: 'material',
          products: [
            createProduct('kmb-2lagig', 'abdichtung-aussen', 'kmb', 'KMB-Beschichtung (2-lagig)', 75, 'qm', 'Kunststoffmodifizierte Bitumendickbeschichtung.'),
            createProduct('xps', 'abdichtung-aussen', 'kmb', 'Perimeterdämmung XPS', 45, 'qm', 'Wärmedämmung für erdberührte Bauteile (100mm).'),
            createProduct('noppenbahn', 'abdichtung-aussen', 'kmb', 'Noppenbahn', 15, 'qm', 'Mechanischer Schutz der Abdichtung.')
          ]
        }
      ]
    }
  ]
};

export const packageAbdichtungKeller: RenovationPackage = {
  id: 'abdichtungKeller',
  title: 'Keller-Abdichtung (Innen)',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'vorbereitung',
      title: 'Vorbereitung',
      lead: 'Alten Putz entfernen und Mauerwerk vorbereiten.',
      subsections: [
        {
          id: 'abbruch',
          title: 'Abbruch',
          type: 'service',
          products: [
            createProduct('altputz', 'vorbereitung', 'abbruch', 'Altputz entfernen', 35, 'qm', 'Abschlagen und Entsorgen des alten Putzes.'),
            createProduct('fugen', 'vorbereitung', 'abbruch', 'Fugennetz auskratzen', 20, 'qm', 'Vorbereitung für die Haftbrücke.')
          ]
        }
      ]
    },
    {
      id: 'innenabdichtung',
      title: 'Innenabdichtung',
      lead: 'Mineralische Abdichtung von innen.',
      subsections: [
        {
          id: 'schlaemme',
          title: 'Dichtsystem',
          type: 'material',
          products: [
            createProduct('dichtschlaemme', 'innenabdichtung', 'schlaemme', 'Dichtschlämme (mineralisch)', 65, 'qm', 'Auftrag in 2-3 Lagen zur dauerhaften Abdichtung.'),
            createProduct('sperrputz', 'innenabdichtung', 'schlaemme', 'Sperrputz', 40, 'qm', 'Wasserabweisender Putz für erhöhte Sicherheit.', false, true),
            createProduct('klimaplatte', 'innenabdichtung', 'schlaemme', 'Klimaplatten', 95, 'qm', 'Innendämmung und Schimmelprävention.', false, true)
          ]
        }
      ]
    }
  ]
};

export const packageAbdichtungAlles: RenovationPackage = {
  id: 'abdichtung',
  title: 'Komplette Abdichtung',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    ...packageAbdichtungHorizontal.categories,
    ...packageAbdichtungPerimeter.categories,
    ...packageAbdichtungKeller.categories
  ]
};
