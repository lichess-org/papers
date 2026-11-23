import { CaretDownIcon } from '@phosphor-icons/react/ssr';
import { useState } from 'react';

import ExternalLink from '~/components/ExternalLink';
import { FOCUS_ACTIVE_CLASSES } from '~/lib/style';
import { type Paper } from '~/lib/types';
import { formatPaperType, tw } from '~/lib/utils';

import PaperDetailRow from './PaperDetailRow';
import QueryHighlight from './QueryHighlight';

type PaperRowProps = {
  paper: Paper;
  query: string;
  isExpanded: boolean;
  onToggle: (paperId: string) => void;
};

export default function PaperRow({ paper, query, isExpanded, onToggle }: PaperRowProps) {
  const detailsId = `paper-detail-${paper.number}`;
  const [isDetailMounted, setIsDetailMounted] = useState(false);

  function toggleExpanded() {
    if (!isExpanded) {
      setIsDetailMounted(true);
    }
    onToggle(paper.id);
  }

  return (
    <>
      <tr
        className={tw(
          'border-rule bg-paper-raised border-b duration-180 ease-out',
          'last:border-b-0',
          'max-sm:grid max-sm:grid-cols-[minmax(0,1fr)_auto] max-sm:gap-y-0 max-sm:border-b max-sm:p-4 max-sm:first:border-t',
          'hover:bg-active hover:transition-colors',
          isExpanded && 'bg-active/60'
        )}>
        <td
          className={tw(
            'group cursor-pointer px-3 py-4 align-middle',
            FOCUS_ACTIVE_CLASSES,
            'focus-visible:outline-offset-[-2px]',
            'max-sm:col-start-1 max-sm:col-end-4 max-sm:min-w-0 max-sm:p-0'
          )}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-controls={isExpanded ? detailsId : undefined}
          onClick={toggleExpanded}
          onKeyDown={event => {
            if (event.key !== 'Enter' && event.key !== ' ') {
              return;
            }
            event.preventDefault();
            toggleExpanded();
          }}>
          <div
            className={tw(
              'font-slab text-ink flex w-full items-center gap-3 border-0 bg-transparent p-0 text-left text-[15px] leading-[1.35] font-semibold',
              'max-sm:text-[14px]'
            )}>
            <CaretDownIcon
              size={18}
              className={tw(
                'text-muted shrink-0 transition-transform duration-180 ease-out',
                isExpanded && 'rotate-180'
              )}
            />
            <span className="group-hover:decoration-pencil group-hover:underline group-hover:underline-offset-2">
              <QueryHighlight text={paper.title} query={query} />
            </span>
          </div>
          <span className="text-muted mt-1 block overflow-hidden pl-7.5 text-xs leading-[1.45] text-ellipsis max-sm:line-clamp-2">
            <QueryHighlight text={paper.authors ?? 'Author not listed'} query={query} />
            {paper.publication && (
              <>
                <span className="px-1 opacity-75">•</span>
                <QueryHighlight text={paper.publication} query={query} />
              </>
            )}
          </span>
        </td>
        <td className={tw('px-3 py-4 align-middle', 'max-sm:col-start-1 max-sm:row-start-2 max-sm:p-0 max-sm:pt-2.5')}>
          <span className="text-muted inline-block text-xs leading-[1.45]">{formatPaperType(paper.entryType)}</span>
        </td>
        <td
          className={tw(
            'text-muted px-3 py-4 align-middle text-xs tabular-nums',
            'max-sm:col-start-3 max-sm:row-start-2 max-sm:flex max-sm:items-center max-sm:justify-end max-sm:p-0 max-sm:pt-2.5 max-sm:text-right'
          )}>
          <QueryHighlight text={paper.year ?? '—'} query={query} />
        </td>
        <td
          className={tw(
            'px-3 py-4 align-middle',
            'max-sm:col-start-1 max-sm:col-end-4 max-sm:row-start-3 max-sm:p-0 max-sm:pt-2.5'
          )}>
          {paper.links[0] ? (
            <ExternalLink href={paper.links[0].url} label={paper.links[0].label} />
          ) : (
            <span className="text-muted text-xs">No source link</span>
          )}
        </td>
      </tr>
      {(isExpanded || isDetailMounted) && (
        <PaperDetailRow
          id={detailsId}
          paper={paper}
          query={query}
          isExpanded={isExpanded}
          onCloseEnd={() => setIsDetailMounted(false)}
        />
      )}
    </>
  );
}
