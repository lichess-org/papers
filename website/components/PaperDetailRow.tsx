import ExternalLink from '~/components/ExternalLink';
import { type Paper } from '~/lib/types';
import { tw } from '~/lib/utils';

type PaperDetailRowProps = {
  id: string;
  paper: Paper;
  isExpanded: boolean;
  onCloseEnd: () => void;
};

export default function PaperDetailRow({ id, paper, isExpanded, onCloseEnd }: PaperDetailRowProps) {
  return (
    <tr id={id} className="border-rule border-x max-sm:block">
      <td
        className="border-rule to-active/40 from-paper-raised border-b bg-linear-to-b from-75% p-0 max-sm:block"
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
              <h3 className="mt-0 mb-2 text-xs font-semibold">Abstract</h3>
              <p className="text-ink m-0 text-xs">{paper.abstract || 'No abstract is included for this record.'}</p>
              {paper.keywords && (
                <p className="text-ink mt-3 mb-0 text-xs">
                  <strong className="mr-1.5">Keywords</strong> {paper.keywords}
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
                <h3 className="mt-0 mb-2 text-xs font-semibold">Additional links</h3>
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
