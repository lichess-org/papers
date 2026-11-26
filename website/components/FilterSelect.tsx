import { useId } from 'react';

import { tw } from '~/lib/utils';

import Select from './Select';

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
};

export default function FilterSelect({ label, value, onChange, options, className }: FilterSelectProps) {
  const labelId = useId();

  return (
    <div className={tw('min-w-0', className)}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <Select value={value} onChange={onChange} options={options} labelledBy={labelId} />
    </div>
  );
}
