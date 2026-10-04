'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

export const THEMES = ['light', 'dark', 'dracula', 'sepia'] as const;

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      scriptProps={{
        type: typeof window === 'undefined' ? 'text/javascript' : 'application/json'
      }}
      themes={[...THEMES]}
    >
      {children}
    </NextThemesProvider>
  );
}
