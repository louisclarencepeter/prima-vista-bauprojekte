import type { RenovationPackage } from '../types';
import { createProduct } from '../engine';
import { COMMON_CATEGORY_SEEDS } from './common';

export const packageBlitzHaus3: RenovationPackage = {
  id: '1e',
  title: '1× Etage ohne Dach',
  defaultArea: 60,
  defaultFloorCount: 1,
  categories: COMMON_CATEGORY_SEEDS.map(category => ({
    ...category,
    subsections: category.subsections.map(section => ({
      ...section,
      products: section.products.map(seed => createProduct(category.id, section.id, seed))
    }))
  }))
};
