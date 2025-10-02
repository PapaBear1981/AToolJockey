'use client';

import { createContext, useEffect } from 'react';
import { atom, Provider as JotaiProvider, useAtom } from 'jotai';

export const themeAtom = atom<'light' | 'dark'>(() => {
  if (typeof window === 'undefined') return 'light';
  return (window.localStorage.getItem('theme') as 'light' | 'dark') || 'light';
});

themeAtom.onMount = (setAtom) => {
  if (typeof window === 'undefined') return;
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    setAtom(stored);
  }
};

const ThemeContext = createContext<'light' | 'dark'>('light');

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeInternal>{children}</ThemeInternal>
    </JotaiProvider>
  );
}

function ThemeInternal({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
