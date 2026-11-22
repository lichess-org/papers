import { tw } from '~/lib/utils';

export const LINK_HOVER_CLASSES = tw(
  'decoration-pencil no-underline decoration-1 underline-offset-2',
  'hover:underline',
  'focus-visible:outline-pencil focus-visible:outline-3 focus-visible:outline-offset-[3px]'
);
