import { useEffect, useMemo, useReducer } from 'react';
import { RENOVATION_PACKAGES, getRenovationPackage } from '../data/calculator/packages';
import { computeQuantity, clampQuantity } from '../data/calculator/engine';
import type { RenovationProduct, RenovationProductAlternative } from '../data/calculator/types';

export const RENOVATION_VAT_RATE = 0.19;
export const RENOVATION_MIN_AREA = 10;

export type RenovationCalculatorState = {
  packageId: string;
  livingArea: number;
  floorCount: number;
  rows: RenovationProduct[];
  collapsed: Record<string, boolean>;
};

type RenovationCalculatorAction =
  | { type: 'switchPackage'; packageId: string }
  | { type: 'setArea'; value: number }
  | { type: 'toggleRow'; id: string }
  | { type: 'updateQuantity'; id: string; value: number }
  | { type: 'duplicateRow'; id: string }
  | { type: 'removeRow'; id: string }
  | { type: 'replaceRow'; id: string; alternative: RenovationProductAlternative }
  | { type: 'toggleCategory'; id: string }
  | { type: 'enableSubsection'; category: string; subcategory: string }
  | { type: 'reset' };

type PersistedState = Partial<Pick<RenovationCalculatorState, 'livingArea' | 'rows' | 'collapsed'>>;

const getStorageKey = (packageId: string) => `prima-vista-renovation-calculator-modular-${packageId}`;

function createInitialState(packageId: string): RenovationCalculatorState {
  const pkg = getRenovationPackage(packageId) || RENOVATION_PACKAGES[0];
  const collapsed = pkg.categories.reduce<Record<string, boolean>>((acc, category) => {
    acc[category.id] = Boolean(category.collapsedByDefault);
    category.subsections.forEach((subsection) => {
      if (subsection.collapsedByDefault) acc[`${category.id}:${subsection.id}`] = true;
    });
    return acc;
  }, {});

  const rows = pkg.categories.flatMap(category => 
    category.subsections.flatMap(subsection => subsection.products)
  );

  return {
    packageId: pkg.id,
    livingArea: pkg.defaultArea,
    floorCount: pkg.defaultFloorCount,
    rows,
    collapsed,
  };
}

function isValidRow(row: unknown): row is RenovationProduct {
  if (!row || typeof row !== 'object') return false;
  const maybe = row as Partial<RenovationProduct>;
  return typeof maybe.id === 'string'
    && typeof maybe.title === 'string'
    && typeof maybe.sku === 'string'
    && typeof maybe.category === 'string'
    && typeof maybe.subcategory === 'string'
    && typeof maybe.basePrice === 'number'
    && typeof maybe.quantity === 'number';
}

function readPersistedState(packageId: string): RenovationCalculatorState {
  const initial = createInitialState(packageId);
  if (typeof window === 'undefined') return initial;

  try {
    const raw = window.localStorage.getItem(getStorageKey(packageId));
    if (!raw) return initial;

    const saved = JSON.parse(raw) as PersistedState;
    const rows = Array.isArray(saved.rows) && saved.rows.every(isValidRow)
      ? saved.rows
      : initial.rows;
    const livingArea = typeof saved.livingArea === 'number'
      ? Math.max(0, saved.livingArea)
      : initial.livingArea;
    const collapsed = saved.collapsed && typeof saved.collapsed === 'object'
      ? { ...initial.collapsed, ...saved.collapsed }
      : initial.collapsed;

    return {
      packageId: initial.packageId,
      floorCount: initial.floorCount,
      livingArea,
      rows,
      collapsed,
    };
  } catch {
    return initial;
  }
}

function renovationReducer(
  state: RenovationCalculatorState,
  action: RenovationCalculatorAction,
): RenovationCalculatorState {
  switch (action.type) {
    case 'switchPackage': {
      return readPersistedState(action.packageId);
    }
    case 'setArea': {
      const livingArea = Math.max(0, action.value);
      return {
        ...state,
        livingArea,
        rows: state.rows.map((row) => ({
          ...row,
          quantity: computeQuantity(row, { livingArea, floorCount: state.floorCount }),
        })),
      };
    }

    case 'toggleRow':
      return {
        ...state,
        rows: state.rows.map((row) => (
          row.id === action.id ? { ...row, enabled: !row.enabled } : row
        )),
      };

    case 'updateQuantity':
      return {
        ...state,
        rows: state.rows.map((row) => (
          row.id === action.id
            ? { ...row, quantity: clampQuantity(action.value, row.minQuantity) }
            : row
        )),
      };

    case 'duplicateRow': {
      const index = state.rows.findIndex((row) => row.id === action.id);
      if (index === -1) return state;

      const source = state.rows[index];
      const duplicate: RenovationProduct = {
        ...source,
        id: `${source.id}-copy-${Date.now()}`,
        title: `${source.title} - Kopie`,
        enabled: true,
        optional: false,
      };

      return {
        ...state,
        rows: [
          ...state.rows.slice(0, index + 1),
          duplicate,
          ...state.rows.slice(index + 1),
        ],
      };
    }

    case 'removeRow':
      return {
        ...state,
        rows: state.rows.filter((row) => row.id !== action.id),
      };

    case 'replaceRow':
      return {
        ...state,
        rows: state.rows.map((row) => (
          row.id === action.id
            ? {
                ...row,
                title: action.alternative.title,
                sku: action.alternative.sku,
                unit: action.alternative.unit,
                basePrice: action.alternative.basePrice,
                description: action.alternative.description ?? row.description,
                image: action.alternative.image ?? row.image,
              }
            : row
        )),
      };

    case 'toggleCategory':
      return {
        ...state,
        collapsed: {
          ...state.collapsed,
          [action.id]: !state.collapsed[action.id],
        },
      };

    case 'enableSubsection':
      return {
        ...state,
        rows: state.rows.map((row) => (
          row.category === action.category && row.subcategory === action.subcategory
            ? { ...row, enabled: true }
            : row
        )),
        collapsed: {
          ...state.collapsed,
          [`${action.category}:${action.subcategory}`]: false,
        },
      };

    case 'reset':
      return createInitialState(state.packageId);

    default:
      return state;
  }
}

export function useRenovationCalculator(packageId: string = '1e') {
  const [state, dispatch] = useReducer(renovationReducer, undefined, () => readPersistedState(packageId));

  useEffect(() => {
    if (state.packageId !== packageId) {
      dispatch({ type: 'switchPackage', packageId });
    }
  }, [packageId, state.packageId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage?.setItem(getStorageKey(state.packageId), JSON.stringify(state));
    } catch {
      // The calculator still works when storage is unavailable.
    }
  }, [state]);

  const totals = useMemo(() => {
    const activeRows = state.rows.filter((row) => row.enabled);
    const net = activeRows.reduce((sum, row) => sum + row.quantity * row.basePrice, 0);
    const vat = net * RENOVATION_VAT_RATE;
    const gross = net + vat;
    const perM2 = state.livingArea > 0 ? net / state.livingArea : 0;

    return {
      net,
      vat,
      gross,
      perM2,
      activeRows,
      activeCount: activeRows.length,
      totalCount: state.rows.length,
    };
  }, [state.livingArea, state.rows]);

  const rowsByCategory = useMemo(() => {
    const pkg = getRenovationPackage(state.packageId) || RENOVATION_PACKAGES[0];
    return pkg.categories.map((category) => ({
      ...category,
      subsections: category.subsections.map((subsection) => ({
        ...subsection,
        rows: state.rows.filter((row) => (
          row.category === category.id && row.subcategory === subsection.id
        )),
      })),
    }));
  }, [state.rows, state.packageId]);

  return {
    state,
    totals,
    rowsByCategory,
    dispatch,
    minArea: RENOVATION_MIN_AREA,
  };
}
