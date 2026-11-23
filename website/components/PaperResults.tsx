import { usePaperSearch } from '~/context/PaperSearchContext';
import { FOCUS_ACTIVE_CLASSES } from '~/lib/style';
import { tw } from '~/lib/utils';

import PaperRow from './PaperRow';

type PaperResultsProps = {
  expandedId: string | null;
  onToggle: (paperId: string) => void;
};

export default function PaperResults({ expandedId, onToggle }: PaperResultsProps) {
  const { papers, clearFilters } = usePaperSearch();

  if (papers.length === 0) {
    return (
      <div className="border-rule bg-paper-raised rounded-sm border p-10 text-center max-sm:px-4.5 max-sm:py-7.5">
        <h3 className="font-slab m-0 text-lg">No papers match this search.</h3>
        <p className="text-muted mt-2.5 mb-4.5 text-sm">Try a different title, author, keyword, year, or paper type.</p>
        <button
          className={tw(
            'border-rule text-ink cursor-pointer rounded-sm border px-4 py-2.5 text-[12px]',
            'hover:text-pencil focus-visible:text-pencil',
            FOCUS_ACTIVE_CLASSES
          )}
          type="button"
          onClick={clearFilters}>
          Clear search and filters
        </button>
      </div>
    );
  }

  return (
    <div className="border-rule overflow-hidden rounded-sm border shadow-2xs">
      <table className="w-full border-collapse text-left max-sm:block">
        <thead className="bg-rule/40 border-rule text-ink dark:bg-rule/60 sticky top-0 border-b text-[11px] tracking-wide uppercase max-sm:sr-only">
          <tr>
            <th scope="col" className="px-3 py-2 font-semibold">
              Paper & authors
            </th>
            <th scope="col" className="w-[152px] px-3 py-2 font-semibold max-lg:w-[136px]">
              Type
            </th>
            <th scope="col" className="w-[82px] px-3 py-2 font-semibold">
              Year
            </th>
            <th scope="col" className="w-[116px] px-3 py-2 font-semibold max-lg:w-[96px]">
              Source
            </th>
          </tr>
        </thead>
        <tbody className="max-sm:block max-sm:w-full">
          {papers.map(paper => (
            <PaperRow key={paper.id} paper={paper} isExpanded={expandedId === paper.id} onToggle={onToggle} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
