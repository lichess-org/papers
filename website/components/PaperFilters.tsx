import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react/ssr';

import { usePaperSearch } from '~/context/PaperSearchContext';
import { FOCUS_ACTIVE_CLASSES, LINK_HOVER_CLASSES } from '~/lib/style';
import { formatPaperType, tw } from '~/lib/utils';

import FilterSelect from './FilterSelect';

export default function PaperFilters() {
  const {
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
    totalCount,
    hasFilters,
    clearFilters,
  } = usePaperSearch();

  return (
    <>
      <search
        className={tw(
          'grid grid-cols-[minmax(240px,1fr)_174px_142px_150px] gap-2',
          'max-lg:grid-cols-3',
          'max-sm:grid-cols-2 max-sm:gap-2'
        )}>
        <div className="relative min-w-0 max-lg:col-span-full">
          <span className="text-muted pointer-events-none absolute top-3.5 left-3.5 z-1" aria-hidden="true">
            <MagnifyingGlassIcon size={18} />
          </span>
          <label htmlFor="paper-search" className="sr-only">
            Search papers
          </label>
          <input
            className={tw(
              'bg-paper-raised text-ink caret-pencil focus-visible:outline-pencil border-rule h-11.5 w-full rounded-sm border py-0 pr-12 pl-10.5 text-sm shadow-2xs',
              'placeholder:text-muted placeholder:opacity-80',
              'max-sm:h-11 max-sm:text-xs',
              FOCUS_ACTIVE_CLASSES
            )}
            id="paper-search"
            autoComplete="off"
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search title, author, keyword…"
          />
          {query && (
            <button
              className={tw(
                'text-muted absolute top-0 right-0 inline-flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent',
                'max-sm:h-11 max-sm:w-11',
                'hover:text-pencil',
                FOCUS_ACTIVE_CLASSES,
                'focus-visible:outline-offset-[-5px]'
              )}
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}>
              <XIcon size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <FilterSelect
          label="Filter by publication type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: '', label: 'All paper types' },
            ...types.map(type => ({
              value: type,
              label: formatPaperType(type),
            })),
          ]}
        />
        <FilterSelect
          label="Filter by year"
          value={yearFilter}
          onChange={setYearFilter}
          options={[{ value: '', label: 'Any year' }, ...years.map(year => ({ value: year, label: year }))]}
        />
        <FilterSelect
          label="Sort papers"
          value={sortOrder}
          onChange={setSortOrder}
          className="max-sm:col-span-full"
          options={[
            { value: 'newest', label: 'Newest first' },
            { value: 'oldest', label: 'Oldest first' },
            { value: 'title', label: 'Title A–Z' },
          ]}
        />
      </search>
      <div className="flex min-h-12 items-center justify-between pb-1">
        <p className="text-muted m-0 text-xs font-semibold tabular-nums" role="status" aria-live="polite">
          {papers.length} {papers.length === 1 ? 'paper' : 'papers'}
          {hasFilters ? ` of ${totalCount}` : ''}
        </p>
        {hasFilters && (
          <button
            className={tw(
              'text-pencil cursor-pointer rounded-sm border-0 bg-transparent py-2 text-xs font-semibold',
              LINK_HOVER_CLASSES
            )}
            type="button"
            onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>
    </>
  );
}
