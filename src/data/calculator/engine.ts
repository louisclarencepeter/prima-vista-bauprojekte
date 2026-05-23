import type {
  RenovationProduct,
  RenovationProductAlternative,
  RenovationLineType,
  CalculatorContext
} from './types';

export const RENOVATION_VAT_RATE = 0.19;

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function makeAlternatives(type: RenovationLineType, title: string, sku: string, unit: string, basePrice: number, description?: string, image?: string): RenovationProductAlternative[] {
  const suffix = type === 'material' ? ['Basis', 'Robust', 'Premium'] : ['Standard', 'Komfort', 'Premium'];
  const multipliers = basePrice === 0 ? [1, 1, 1] : [1, 1.14, 1.28];

  return suffix.map((label, index) => {
    const altTitle = index === 0 ? title : `${title} - ${label}`;
    const altSku = index === 0 ? sku : `${sku}-${label.slice(0, 1).toUpperCase()}`;

    return {
      id: `${sku}-${label.toLowerCase()}`,
      title: altTitle,
      sku: altSku,
      unit,
      basePrice: roundMoney(basePrice * multipliers[index]),
      description,
      image,
    };
  });
}

export type ProductSeed = {
  id: string;
  title: string;
  sku: string;
  type: RenovationLineType;
  unit: string;
  basePrice: number;
  baseQuantity: number;
  enabled?: boolean;
  optional?: boolean;
  minQuantity?: number;
  quantityStep?: number;
  scalable?: boolean;
  formula?: string;
  description?: string;
};

export function createProduct(category: string, subcategory: string, seed: ProductSeed): RenovationProduct {
  const optional = seed.optional ?? false;
  return {
    id: seed.id,
    category,
    subcategory,
    title: seed.title,
    sku: seed.sku,
    type: seed.type,
    unit: seed.unit,
    basePrice: seed.basePrice,
    baseQuantity: seed.baseQuantity,
    quantity: seed.baseQuantity,
    enabled: seed.enabled ?? !optional,
    optional,
    scalable: seed.scalable ?? false,
    formula: seed.formula,
    minQuantity: seed.minQuantity ?? 1,
    quantityStep: seed.quantityStep ?? 1,
    canDuplicate: true,
    canRemove: true,
    canReplace: true,
    description: seed.description ?? 'Kalkulationsposition fuer Montage, Material oder Zusatzleistung.',
    alternatives: makeAlternatives(seed.type, seed.title, seed.sku, seed.unit, seed.basePrice, seed.description),
  };
}

export function clampQuantity(value: number, min: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, value);
}

export function computeQuantity(product: RenovationProduct, context: CalculatorContext): number {
  if (!product.scalable || !product.formula) return product.baseQuantity;
  
  try {
    const expression = product.formula
      .replace(/livingArea/g, String(context.livingArea))
      .replace(/floorCount/g, String(context.floorCount));
      
    // eslint-disable-next-line no-new-func
    const raw = new Function(`return ${expression}`)();
    const stepped = Math.round(raw / product.quantityStep) * product.quantityStep;
    return clampQuantity(stepped, product.minQuantity);
  } catch {
    return product.baseQuantity;
  }
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}
