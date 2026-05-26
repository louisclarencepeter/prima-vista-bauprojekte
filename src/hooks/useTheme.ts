import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'prima-vista-theme-choice';
const LEGACY_STORAGE_KEY = 'prima-vista-theme';

function isThemeMode(theme: string | null): theme is ThemeMode {
  return theme === 'dark' || theme === 'light';
}

function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isThemeMode(saved) ? saved : null;
}

function readTheme(): ThemeMode {
  const saved = readStoredTheme();
  if (saved) return saved;

  if (typeof document !== 'undefined') {
    const attr = document.documentElement.dataset.theme ?? null;
    if (isThemeMode(attr)) return attr;
  }
  return getSystemTheme();
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#11100f' : '#1a1a1a');
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(readTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (readStoredTheme()) return undefined;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemThemeChange = (event: MediaQueryListEvent) => {
      setThemeState(event.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', onSystemThemeChange);
    return () => media.removeEventListener('change', onSystemThemeChange);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (isThemeMode(event.newValue)) {
        setThemeState(event.newValue);
      } else if (event.newValue === null) {
        setThemeState(getSystemTheme());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(STORAGE_KEY, next);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
