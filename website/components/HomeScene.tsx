'use client';

import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { useCallback, useEffect, useRef, useState } from 'react';

import { PaperSearchProvider } from '~/context/PaperSearchContext';
import { CONTENT_WRAPPER_CLASSES, LINK_HOVER_CLASSES } from '~/lib/style';
import { type Paper } from '~/lib/types';
import { tw } from '~/lib/utils';

import ChessboardBackground from './ChessboardBackground';
import PaperFilters from './PaperFilters';
import PaperResults from './PaperResults';

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
            'text-ink inline-flex items-center gap-2.5 text-xl font-bold tracking-[-0.035em]',
            'max-sm:text-base',
            LINK_HOVER_CLASSES
          )}
          href="https://lichess.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lichess Bibliography">
          <img src="/lichess.svg" alt="Lichess.org" className="h-8 max-sm:h-5" />
          Lichess.org
        </a>
        <a
          href="https://github.com/lichess-org/papers"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-pencil inline-flex items-center gap-1.5 text-sm max-sm:text-xs">
          <GithubLogoIcon size={20} />
          GitHub
        </a>
      </header>
      <main className={tw('flex-1', CONTENT_WRAPPER_CLASSES)}>
        <section
          className={tw(
            'border-rule relative isolate flex min-h-60 items-center justify-start gap-12 overflow-hidden border-b py-9',
            'max-lg:min-h-[230px]',
            'max-sm:min-h-0 max-sm:flex-col max-sm:items-start max-sm:gap-5.5 max-sm:py-10 max-sm:pb-7'
          )}
          aria-labelledby="page-title">
          <ChessboardBackground />
          <div>
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
        </section>
        <PaperSearchProvider papersData={papers} onClear={clearExpandedId}>
          <section
            id="papers"
            className="scroll-mt-6 pt-3 pb-18 max-sm:pt-2 max-sm:pb-12"
            aria-labelledby="papers-title">
            <div ref={papersStickySentinelRef} className="h-px" aria-hidden="true" />
            <div
              className={tw(
                'bg-paper sticky top-0 z-20 border-b border-transparent pt-3 transition-[padding,border-color] duration-150 ease-out max-sm:pt-2',
                isPapersSticky && 'border-rule'
              )}>
              <div className="mb-5 flex items-end justify-between gap-5 max-sm:mb-4 max-sm:items-start">
                <div>
                  <h2 id="papers-title" className="font-slab m-0 text-2xl font-semibold tracking-tight">
                    The paper index
                  </h2>
                  <p className="text-muted mt-1.5 mb-0 text-sm max-sm:max-w-[31ch] max-sm:text-[12px]">
                    Search the record, then click the title cell to see its abstract and additional links.
                  </p>
                </div>
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
        <a href="#top" className="text-ink font-slab text-sm font-bold">
          Lichess Bibliography
        </a>
        <a
          href="https://github.com/lichess-org/papers/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pencil text-xs">
          If we missed your work, feel free to open an issue or submit a PR.
        </a>
      </footer>
    </div>
  );
}
