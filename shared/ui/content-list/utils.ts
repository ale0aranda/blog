const formatters = new Map<string, Intl.DateTimeFormat>();

function getFormatter(locale: string) {
  const cached = formatters.get(locale);

  if (cached) {
    return cached;
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric'
  });

  formatters.set(locale, formatter);

  return formatter;
}

export function formatItemDate(date: string, locale: string): string {
  return getFormatter(locale).format(new Date(date));
}
