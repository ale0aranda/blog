export function formatDate(
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
