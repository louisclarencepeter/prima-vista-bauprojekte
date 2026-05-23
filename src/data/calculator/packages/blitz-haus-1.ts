import type { RenovationPackage } from '../types';
import { createProduct } from '../engine';
import { COMMON_CATEGORY_SEEDS, ROOF_CATEGORY_SEED } from './common';

export const packageBlitzHaus1: RenovationPackage = {
  id: '1e-d',
  title: '1× Etage + 1× Dach',
  defaultArea: 60,
  defaultFloorCount: 1,
  categories: [ROOF_CATEGORY_SEED, ...COMMON_CATEGORY_SEEDS].map(category => ({
    ...category,
    subsections: category.subsections.map(section => ({
      ...section,
      products: section.products.map(seed => createProduct(category.id, section.id, seed))
    }))
  }))
};
