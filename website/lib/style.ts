import { tw } from '~/lib/utils';

export const CONTENT_WRAPPER_CLASSES = tw(
  'mx-auto w-[calc(100%-48px)] max-w-[1280px] max-lg:w-[calc(100%-40px)] max-sm:w-[calc(100%-36px)]'
);

export const FOCUS_ACTIVE_CLASSES = tw(
  'focus-visible:outline-pencil focus-visible:outline-2 focus-visible:outline-offset-3'
);

export const LINK_HOVER_CLASSES = tw(
  'decoration-pencil no-underline decoration-1 underline-offset-2',
  'hover:underline',
  FOCUS_ACTIVE_CLASSES
);
