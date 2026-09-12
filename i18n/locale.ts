import { routing } from './routing';

export type Locale = (typeof routing.locales)[number];

const locales = routing.locales;

export function getNextLocale(current: Locale): Locale {
  const index = locales.indexOf(current);

  if (index === -1) {
    return locales[0];
  }

  const next = locales[(index + 1) % locales.length];

  if (next === undefined) {
    return locales[0];
  }

  return next;
}
