import { useEffect, useMemo, useReducer } from 'react';
import {
  RENOVATION_CATEGORIES,
  RENOVATION_DEFAULT_AREA,
  RENOVATION_MIN_AREA,
  RENOVATION_VAT_RATE,
  createRenovationProducts,
  type RenovationProduct,
  type RenovationProductAlternative,
} from '../data/renovationCalculator';

export type RenovationCalculatorState = {
  livingArea: number;
  rows: RenovationProduct[];
  collapsed: Record<string, boolean>;
};

type RenovationCalculatorAction =
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

const STORAGE_KEY = 'prima-vista-renovation-calculator-v1';

function clampQuantity(value: number, min: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, value);
}

function scaleQuantity(row: RenovationProduct, livingArea: number): number {
  if (!row.scalable) return row.quantity;

  const raw = row.scalingFactor > 0
    ? livingArea * row.scalingFactor
    : row.baseQuantity * (livingArea / RENOVATION_DEFAULT_AREA);
  const stepped = Math.round(raw / row.quantityStep) * row.quantityStep;

  return clampQuantity(stepped, row.minQuantity);
}

function createInitialState(): RenovationCalculatorState {
  const collapsed = RENOVATION_CATEGORIES.reduce<Record<string, boolean>>((acc, category) => {
    acc[category.id] = false;
    category.subsections.forEach((subsection) => {
      if (subsection.collapsedByDefault) acc[`${category.id}:${subsection.id}`] = true;
    });
    return acc;
  }, {});

  return {
    livingArea: RENOVATION_DEFAULT_AREA,
    rows: createRenovationProducts(),
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

function readPersistedState(): RenovationCalculatorState {
  const initial = createInitialState();
  if (typeof window === 'undefined') return initial;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
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
    case 'setArea': {
      const livingArea = Math.max(0, action.value);
      return {
        ...state,
        livingArea,
        rows: state.rows.map((row) => ({
          ...row,
          quantity: scaleQuantity(row, livingArea),
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
      return createInitialState();

    default:
      return state;
  }
}

export function useRenovationCalculator() {
  const [state, dispatch] = useReducer(renovationReducer, undefined, readPersistedState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state));
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

  const rowsByCategory = useMemo(() => (
    RENOVATION_CATEGORIES.map((category) => ({
      ...category,
      subsections: category.subsections.map((subsection) => ({
        ...subsection,
        rows: state.rows.filter((row) => (
          row.category === category.id && row.subcategory === subsection.id
        )),
      })),
    }))
  ), [state.rows]);

  return {
    state,
    totals,
    rowsByCategory,
    dispatch,
    minArea: RENOVATION_MIN_AREA,
  };
}
