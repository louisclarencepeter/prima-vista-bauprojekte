import type { RenovationPackage } from '../types';
import { createBossmannHousePackage } from './bossmann-house';

export const packageBlitzHaus1: RenovationPackage = createBossmannHousePackage(
  '1e-d',
  '1× Etage + 1× Dach',
  60,
  1,
);
