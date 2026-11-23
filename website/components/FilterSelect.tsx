import { CaretDownIcon } from '@phosphor-icons/react/ssr';

import { tw } from '~/lib/utils';

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
};

export default function FilterSelect({ label, value, onChange, options, className }: FilterSelectProps) {
  return (
    <label className={tw('group relative min-w-0', className)}>
      <span className="sr-only">{label}</span>
      <select
        className={tw(
          'bg-paper-raised text-ink border-rule h-[46px] w-full cursor-pointer appearance-none rounded-sm border py-0 pr-9 pl-3 text-sm shadow-2xs',
          'focus-visible:outline-pencil focus-visible:outline-3 focus-visible:outline-offset-[3px]',
          'max-sm:h-11 max-sm:text-[12px]'
        )}
        value={value}
        onChange={event => onChange(event.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value} className="hover:bg-pencil hover:text-paper-raised">
            {option.label}
          </option>
        ))}
      </select>
      <CaretDownIcon
        size={14}
        className="text-muted pointer-events-none absolute top-4 right-3.5 transition-transform duration-150 ease-out group-has-[select:open]:rotate-180"
        aria-hidden="true"
      />
    </label>
  );
}
