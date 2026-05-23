import type { RenovationPackage } from '../types';
import { createProduct } from '../engine';
import { COMMON_CATEGORY_SEEDS } from './common';

// Categories excluded from standard Wohnung packages
const EXCLUDED_CATEGORIES = ['roof', 'facade-outdoor', 'stairs'];

// Extract the 'container' subsection from 'facade-outdoor' to make it a standalone category
const facadeCategory = COMMON_CATEGORY_SEEDS.find(c => c.id === 'facade-outdoor');
const containerSubsection = facadeCategory?.subsections.find(s => s.id === 'container');

const WOHNUNG_BASE_SEEDS = COMMON_CATEGORY_SEEDS
  .filter(c => !EXCLUDED_CATEGORIES.includes(c.id))
  .map(c => {
    // Apartments typically don't have heat pumps / standalone thermes installed by us
    if (c.id === 'heating') {
      return {
        ...c,
        subsections: c.subsections.filter(sub => sub.id !== 'therme-waermepumpe')
      };
    }
    return c;
  });

// Add the container category as a standalone master category at the end
if (containerSubsection) {
  WOHNUNG_BASE_SEEDS.push({
    id: 'entsorgung',
    title: 'Container & Entsorgung',
    lead: 'Bauschutt und Mischabfall Container',
    subsections: [containerSubsection]
  });
}

function buildWohnungPackage(id: string, title: string, defaultArea: number, isMaisonette: boolean = false): RenovationPackage {
  let seeds = [...WOHNUNG_BASE_SEEDS];
  
  if (isMaisonette) {
    const stairsCategory = COMMON_CATEGORY_SEEDS.find(c => c.id === 'stairs');
    if (stairsCategory) {
      // Insert stairs right before the container category
      seeds.splice(seeds.length - 1, 0, stairsCategory);
    }
  }

  return {
    id,
    title,
    defaultArea,
    defaultFloorCount: isMaisonette ? 2 : 1,
    categories: seeds.map(category => ({
      ...category,
      subsections: category.subsections.map(section => ({
        ...section,
        products: section.products.map(seed => createProduct(category.id, section.id, seed))
      }))
    }))
  };
}

export const packageWohnungStudio = buildWohnungPackage('studio', '1-Zimmer · Studio', 50);
export const packageWohnung2zi = buildWohnungPackage('2zi', '2-Zimmer-Wohnung', 100);
export const packageWohnung3zi = buildWohnungPackage('3zi', '3-Zimmer-Wohnung', 150);
export const packageWohnungMaisonette = buildWohnungPackage('maisonette', 'Maisonette · 4+ Zimmer', 150, true);
