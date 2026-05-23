import { packageBlitzHaus1 } from './blitz-haus-1';
import { packageBlitzHaus2 } from './blitz-haus-2';
import { packageBlitzHaus3 } from './blitz-haus-3';
import { packageBlitzHaus4 } from './blitz-haus-4';
import { 
  packageWohnungStudio, 
  packageWohnung2zi, 
  packageWohnung3zi, 
  packageWohnungMaisonette 
} from './wohnung';
import {
  packageAbdichtungHorizontal,
  packageAbdichtungPerimeter,
  packageAbdichtungKeller,
  packageAbdichtungAlles
} from './abdichtung';
import type { RenovationPackage } from '../types';

export const RENOVATION_PACKAGES: RenovationPackage[] = [
  packageBlitzHaus1,
  packageBlitzHaus2,
  packageBlitzHaus3,
  packageBlitzHaus4,
  packageWohnungStudio,
  packageWohnung2zi,
  packageWohnung3zi,
  packageWohnungMaisonette,
  packageAbdichtungHorizontal,
  packageAbdichtungPerimeter,
  packageAbdichtungKeller,
  packageAbdichtungAlles,
];

// Helper to get a package by ID
export function getRenovationPackage(id: string): RenovationPackage | undefined {
  return RENOVATION_PACKAGES.find(pkg => pkg.id === id);
}

// Default export if needed
export default RENOVATION_PACKAGES;
