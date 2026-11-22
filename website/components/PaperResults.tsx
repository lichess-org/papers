import { usePaperSearch } from '~/context/PaperSearchContext';
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
      <div className="border-rule bg-paper-raised border p-10 text-center max-sm:px-4.5 max-sm:py-7.5">
        <h3 className="font-slab m-0 text-lg">No papers match this search.</h3>
        <p className="text-muted mt-2.5 mb-4.5 text-sm">Try a different title, author, keyword, year, or paper type.</p>
        <button
          className={tw(
            'border-ink text-ink cursor-pointer border bg-transparent px-4 py-2.5 text-[12px]',
            'hover:bg-ink hover:text-paper',
            'focus-visible:outline-pencil focus-visible:outline-3 focus-visible:outline-offset-[3px]'
          )}
          type="button"
          onClick={clearFilters}>
          Clear search and filters
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-sm:overflow-visible">
      <table className="w-full border-collapse text-left max-sm:block">
        <thead className="bg-rule/50 border-rule text-ink sticky top-0 border text-[10px] font-semibold uppercase max-sm:sr-only">
          <tr>
            <th scope="col" className="px-3 py-2">
              Paper / author
            </th>
            <th scope="col" className="w-[170px] px-3 py-2 max-lg:w-[142px]">
              Type
            </th>
            <th scope="col" className="w-[82px] px-3 py-2">
              Year
            </th>
            <th scope="col" className="w-[142px] px-3 py-2 max-lg:w-[116px]">
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
