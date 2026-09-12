import { useMemo, useState } from 'react';

import { useDebouncedValue } from './use-debounced-value';

export function useSearchFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[]
) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 250);

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return items;

    return items.filter((item) =>
      fields.some((field) => {
        const value = item[field];
        if (Array.isArray(value)) {
          return value.some((v) => String(v).toLowerCase().includes(query));
        }
        return typeof value === 'string' && value.toLowerCase().includes(query);
      })
    );
  }, [items, debouncedSearch, fields]);

  return { search, setSearch, filtered, debouncedSearch };
}
