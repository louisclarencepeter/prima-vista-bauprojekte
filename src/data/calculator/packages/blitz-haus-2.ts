import type { RenovationPackage } from '../types';
import { createProduct } from '../engine';
import { COMMON_CATEGORY_SEEDS, ROOF_CATEGORY_SEED } from './common';

export const packageBlitzHaus2: RenovationPackage = {
  id: '2e-d',
  title: '2× Etagen + 1× Dach',
  defaultArea: 120,
  defaultFloorCount: 2,
  categories: [ROOF_CATEGORY_SEED, ...COMMON_CATEGORY_SEEDS].map(category => {
    const mappedCategory = { ...category };
    if (mappedCategory.id === 'stairs') {
      mappedCategory.subsections = mappedCategory.subsections.map(section => ({
        ...section,
        products: section.products.map(seed => ({ ...seed, enabled: true, optional: false }))
      }));
    }
    
    return {
      ...mappedCategory,
      subsections: mappedCategory.subsections.map(section => ({
        ...section,
        products: section.products.map(seed => createProduct(mappedCategory.id, section.id, seed))
      }))
    };
  })
};
