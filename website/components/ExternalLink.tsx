import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';

import { LINK_HOVER_CLASSES } from '~/lib/style';
import { tw } from '~/lib/utils';

type Props = {
  href: string;
  label: string;
};

export default function ExternalLink({ href, label }: Props) {
  return (
    <a
      className={tw('text-pencil flex items-center gap-0.5 text-xs font-semibold', LINK_HOVER_CLASSES)}
      href={href}
      target="_blank"
      rel="noopener noreferrer">
      {label}
      <ArrowUpRightIcon weight="bold" className="shrink-0" />
    </a>
  );
}
