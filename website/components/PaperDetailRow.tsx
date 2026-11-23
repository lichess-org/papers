import { Fragment } from 'react';

import ExternalLink from '~/components/ExternalLink';
import { type Paper } from '~/lib/types';
import { tw } from '~/lib/utils';

import QueryHighlight from './QueryHighlight';

type PaperDetailRowProps = {
  id: string;
  paper: Paper;
  query: string;
  isExpanded: boolean;
  onCloseEnd: () => void;
};

export default function PaperDetailRow({ id, paper, query, isExpanded, onCloseEnd }: PaperDetailRowProps) {
  const keywords = paper.keywords
    .split(/[,;]/)
    .map(keyword => keyword.trim())
    .filter(Boolean);
  const affiliations = paper.affiliation
    .split(';')
    .map(affiliation => affiliation.trim())
    .filter(Boolean);
  const affiliationOccurrences = new Map<string, number>();
  const keywordOccurrences = new Map<string, number>();

  return (
    <tr id={id} className="group max-sm:block">
      <td
        className="border-rule bg-active/60 border-b p-0 group-last:border-b-0 max-sm:block"
        colSpan={5}
        aria-label={`Details for ${paper.title}`}>
        <div
          className="paper-detail-panel"
          data-expanded={isExpanded}
          aria-hidden={!isExpanded}
          inert={!isExpanded}
          onTransitionEnd={event => {
            if (!isExpanded && event.target === event.currentTarget && event.propertyName === 'height') {
              onCloseEnd();
            }
          }}>
          <div
            className={tw(
              'grid grid-cols-[minmax(0,1fr)_160px] gap-8 px-10 py-5',
              'max-sm:grid-cols-1 max-sm:gap-3.5 max-sm:p-4'
            )}>
            <div>
              <h3 className="font-slab mt-0 mb-2 text-[13px] font-medium">Abstract</h3>
              <p className="text-ink m-0 text-[13px] leading-snug">
                {paper.abstract ? (
                  <QueryHighlight text={paper.abstract} query={query} />
                ) : (
                  'No abstract is included for this record.'
                )}
              </p>
              {affiliations.length > 0 && (
                <p className="text-ink mt-3 mb-0 text-xs">
                  <strong className="font-slab mr-1.5 text-[13px] font-medium">Affiliation</strong>{' '}
                  {affiliations.map((affiliation, index) => {
                    const occurrence = affiliationOccurrences.get(affiliation) ?? 0;
                    affiliationOccurrences.set(affiliation, occurrence + 1);

                    return (
                      <Fragment key={`${affiliation}-${occurrence}`}>
                        {index > 0 && <span className="px-1 opacity-75">•</span>}
                        <QueryHighlight text={affiliation} query={query} />
                      </Fragment>
                    );
                  })}
                </p>
              )}
              {keywords.length > 0 && (
                <p className="text-ink mt-3 mb-0 text-xs">
                  <strong className="font-slab mr-1.5 text-[13px] font-medium">Keywords</strong>{' '}
                  {keywords.map((keyword, index) => {
                    const occurrence = keywordOccurrences.get(keyword) ?? 0;
                    keywordOccurrences.set(keyword, occurrence + 1);

                    return (
                      <Fragment key={`${keyword}-${occurrence}`}>
                        {index > 0 && <span className="px-1 opacity-75">•</span>}
                        <QueryHighlight text={keyword} query={query} />
                      </Fragment>
                    );
                  })}
                </p>
              )}
            </div>
            {paper.links.length > 1 && (
              <div
                className={tw(
                  'flex flex-col items-start gap-2 pt-0.5',
                  'max-sm:flex-row max-sm:flex-wrap max-sm:gap-x-2.5 max-sm:gap-y-3.5'
                )}
                role="group">
                <h3 className="font-slab mt-0 mb-2 text-[13px] font-medium">Additional links</h3>
                {paper.links.slice(1).map(link => (
                  <ExternalLink key={`${link.label}-${link.url}`} href={link.url} label={link.label} />
                ))}
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
