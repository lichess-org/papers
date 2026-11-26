'use client';

import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { type Paper, type RawPaper } from '~/lib/types';
import { formatPaper, normalizeSearchText } from '~/lib/utils';

type PaperSearchContextValue = {
  query: string;
  setQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  yearFilter: string;
  setYearFilter: (year: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  types: string[];
  years: string[];
  papers: Paper[];
  totalCount: number;
  isLoading: boolean;
  loadError: string | null;
  hasFilters: boolean;
  clearFilters: () => void;
};

type PaperSearchProviderProps = PropsWithChildren<{
  dataUrl: string;
  onClear: () => void;
}>;

const PaperSearchContext = createContext<PaperSearchContextValue | null>(null);

export function PaperSearchProvider({ dataUrl, children, onClear }: PaperSearchProviderProps) {
  const [papersData, setPapersData] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPapers() {
      try {
        const response = await fetch(dataUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Paper data request failed with status ${response.status}`);
        }

        const rawPapers = (await response.json()) as RawPaper[];
        setPapersData(rawPapers.map(formatPaper).filter(paper => paper.title !== 'Untitled paper'));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Failed to load paper data', error);
          setLoadError('Could not load the paper list. Please refresh to try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPapers();
    return () => controller.abort();
  }, [dataUrl]);

  const types = useMemo(() => [...new Set(papersData.map(paper => paper.entryType))].sort(), [papersData]);
  const years = useMemo(() => {
    const availableYears = new Set<string>();
    for (const paper of papersData) {
      if (paper.year) {
        availableYears.add(paper.year);
      }
    }
    return [...availableYears].sort((first, second) => second.localeCompare(first, undefined, { numeric: true }));
  }, [papersData]);

  const normalizedQuery = normalizeSearchText(query.trim());

  const papers = useMemo(() => {
    const filteredPapers = papersData.filter(paper => {
      const matchesQuery = !normalizedQuery || paper.searchText.includes(normalizedQuery);
      const matchesType = !typeFilter || paper.entryType === typeFilter;
      const matchesYear = !yearFilter || paper.year === yearFilter;
      return matchesQuery && matchesType && matchesYear;
    });

    return filteredPapers.sort((first, second) => {
      if (sortOrder === 'title') {
        return first.title.localeCompare(second.title);
      }
      const direction = sortOrder === 'newest' ? -1 : 1;
      return direction * first.year.localeCompare(second.year, undefined, { numeric: true });
    });
  }, [papersData, normalizedQuery, typeFilter, yearFilter, sortOrder]);

  const hasFilters = Boolean(normalizedQuery || typeFilter || yearFilter);

  const clearFilters = useCallback(() => {
    setQuery('');
    setTypeFilter('');
    setYearFilter('');
    setSortOrder('newest');
    onClear();
  }, [onClear]);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      typeFilter,
      setTypeFilter,
      yearFilter,
      setYearFilter,
      sortOrder,
      setSortOrder,
      types,
      years,
      papers,
      totalCount: papersData.length,
      isLoading,
      loadError,
      hasFilters,
      clearFilters,
    }),
    [
      query,
      typeFilter,
      yearFilter,
      sortOrder,
      types,
      years,
      papers,
      papersData.length,
      isLoading,
      loadError,
      hasFilters,
      clearFilters,
    ]
  );

  return <PaperSearchContext.Provider value={value}>{children}</PaperSearchContext.Provider>;
}

export function usePaperSearch() {
  const context = useContext(PaperSearchContext);
  if (!context) {
    throw new Error('usePaperSearch must be used within a PaperSearchProvider');
  }
  return context;
}
