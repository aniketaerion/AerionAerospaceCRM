// src/components/shared/utils/useFilterPersistence.js
import { useState, useEffect } from 'react';

export default function useFilterPersistence(key, defaultValue) {
  const [filters, setFilters] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(filters));
  }, [key, filters]);

  return [filters, setFilters];
}
