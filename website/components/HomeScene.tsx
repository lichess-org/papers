'use client';

import { ArrowUpIcon, CircleHalfIcon, GithubLogoIcon, MoonIcon, SunIcon } from '@phosphor-icons/react/ssr';
import { useCallback, useEffect, useRef, useState } from 'react';

import LichessLogo from '~/components/LichessLogo';
import { PaperSearchProvider } from '~/context/PaperSearchContext';
import { CONTENT_WRAPPER_CLASSES, FOCUS_ACTIVE_CLASSES, LINK_HOVER_CLASSES } from '~/lib/style';
import { applyTheme, toggleTheme } from '~/lib/theme';
import { type Paper } from '~/lib/types';
import { tw } from '~/lib/utils';

import PaperFilters from './PaperFilters';
import PaperResults from './PaperResults';
import ResearchOverviewGraphic from './ResearchOverviewGraphic';

type PaperLibraryProps = {
  papers: Paper[];
};

export default function HomeScene({ papers }: PaperLibraryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPapersSticky, setIsPapersSticky] = useState(false);
  const papersStickySentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = papersStickySentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsPapersSticky(!entry.isIntersecting);
        }
      },
      { rootMargin: '-1px 0px 0px 0px' }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function syncSystemTheme(event: MediaQueryList | MediaQueryListEvent = colorScheme) {
      if ((root.dataset.themeMode ?? 'automatic') !== 'automatic') {
        return;
      }

      applyTheme('automatic', event.matches);
    }

    syncSystemTheme();
    colorScheme.addEventListener('change', syncSystemTheme);
    return () => colorScheme.removeEventListener('change', syncSystemTheme);
  }, []);

  function toggleExpanded(paperId: string) {
    setExpandedId(expandedId === paperId ? null : paperId);
  }

  const clearExpandedId = useCallback(() => {
    setExpandedId(null);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header
        id="top"
        className={tw(
          'border-rule flex h-18 items-center justify-between border-b',
          'max-sm:h-15.5',
          CONTENT_WRAPPER_CLASSES
        )}>
        <a
          className={tw(
            'text-ink inline-flex items-center gap-2.5 rounded-sm text-xl font-semibold tracking-[-0.035em]',
            'max-sm:text-base',
            LINK_HOVER_CLASSES,
            'focus-visible:outline-offset-4'
          )}
          href="https://lichess.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lichess Bibliography">
          <LichessLogo className="h-8 max-sm:h-5" />
          Lichess.org
        </a>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Cycle color theme"
            onClick={toggleTheme}
            className={tw(
              'text-muted inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0',
              'hover:text-pencil',
              FOCUS_ACTIVE_CLASSES
            )}>
            <CircleHalfIcon size={20} className="theme-toggle-icon theme-toggle-icon-automatic" aria-hidden="true" />
            <SunIcon size={20} className="theme-toggle-icon theme-toggle-icon-light" aria-hidden="true" />
            <MoonIcon size={20} className="theme-toggle-icon theme-toggle-icon-dark" aria-hidden="true" />
          </button>
          <a
            href="https://github.com/lichess-org/papers"
            target="_blank"
            rel="noopener noreferrer"
            className={tw(
              'text-muted inline-flex h-10 items-center gap-1.5 rounded-sm text-sm',
              'max-sm:text-xs',
              'hover:text-pencil',
              FOCUS_ACTIVE_CLASSES
            )}>
            <GithubLogoIcon size={20} />
            GitHub
          </a>
        </div>
      </header>
      <main className={tw('flex-1', CONTENT_WRAPPER_CLASSES)}>
        <section
          className={tw(
            'border-rule relative isolate flex min-h-60 items-center justify-start gap-8 overflow-hidden border-b py-6',
            'max-lg:min-h-[230px]',
            'max-sm:min-h-0 max-sm:flex-col max-sm:items-start'
          )}
          aria-labelledby="page-title">
          <div className="min-w-0 flex-1 max-sm:w-full">
            <h1
              id="page-title"
              className={tw(
                'font-slab m-0 text-[clamp(40px,5vw,65px)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance',
                'max-sm:text-[clamp(38px,11vw,52px)]'
              )}>
              Lichess Bibliography
            </h1>
            <p className="text-muted mt-4 mb-0 leading-[1.6] max-sm:mt-3 max-sm:text-sm">
              Publications that study Lichess, use Lichess data, or otherwise use or mention Lichess in a meaningful
              way.
            </p>
          </div>
          <ResearchOverviewGraphic className="w-[30%] max-w-[340px] min-w-[250px] max-lg:min-w-[220px] max-sm:hidden max-sm:w-[52%]" />
        </section>
        <PaperSearchProvider papersData={papers} onClear={clearExpandedId}>
          <section
            id="papers"
            className="scroll-mt-6 pt-2.5 pb-18 max-sm:pt-2 max-sm:pb-12"
            aria-labelledby="papers-title">
            <div ref={papersStickySentinelRef} className="h-px" aria-hidden="true" />
            <div
              className={tw(
                'bg-paper sticky top-0 z-20 border-b border-transparent pt-3 transition-[padding,border-color] duration-150 ease-out max-sm:pt-2',
                isPapersSticky && 'border-rule'
              )}>
              <div className="mb-4 flex items-center justify-between gap-5 max-sm:mb-4 max-sm:items-start">
                <div className="min-w-0 flex-1">
                  <h2 id="papers-title" className="font-slab m-0 text-2xl font-semibold tracking-tight">
                    The paper index
                  </h2>
                  <p className="text-muted mt-1 mb-0 text-sm max-sm:max-w-[31ch] max-sm:text-[12px]">
                    Search the record, then click the title cell to see its abstract and additional links.
                  </p>
                </div>
                {isPapersSticky && (
                  <button
                    type="button"
                    aria-label="Scroll to top"
                    title="Scroll to top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={tw(
                      'text-muted border-rule bg-paper-raised inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-sm border p-0 shadow-2xs',
                      'hover:text-pencil',
                      FOCUS_ACTIVE_CLASSES
                    )}>
                    <ArrowUpIcon size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
              <PaperFilters />
            </div>
            <PaperResults expandedId={expandedId} onToggle={toggleExpanded} />
          </section>
        </PaperSearchProvider>
      </main>
      <footer
        className={tw(
          'border-rule text-muted flex min-h-16 items-center justify-between gap-x-5 gap-y-3 border-t',
          'max-sm:flex-col max-sm:py-4 max-sm:text-center max-sm:text-[10px]',
          CONTENT_WRAPPER_CLASSES
        )}>
        <a href="#top" className={tw('text-ink font-slab rounded-sm text-sm font-bold', FOCUS_ACTIVE_CLASSES)}>
          Lichess Bibliography
        </a>
        <a
          href="https://github.com/lichess-org/papers/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className={tw('rounded-sm text-xs', 'hover:text-pencil', FOCUS_ACTIVE_CLASSES)}>
          If we missed your work, feel free to open an issue or submit a PR.
        </a>
      </footer>
    </div>
  );
}
