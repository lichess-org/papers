import { type ReactNode } from 'react';

import { normalizeSearchText } from '~/lib/utils';

type Props = {
  text: string;
  query: string;
};

export default function QueryHighlight({ text, query }: Props) {
  const needle = normalizeSearchText(query.trim());
  if (!needle) {
    return text;
  }

  const ranges: { start: number; end: number }[] = [];
  let normalizedText = '';

  for (let offset = 0; offset < text.length;) {
    const character = String.fromCodePoint(text.codePointAt(offset)!)!;
    const end = offset + character.length;
    const normalized = normalizeSearchText(character);

    normalizedText += normalized;
    for (const _ of normalized) {
      ranges.push({ start: offset, end });
    }

    offset = end;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  let searchFrom = 0;

  while (true) {
    const index = normalizedText.indexOf(needle, searchFrom);
    if (index === -1) {
      break;
    }

    const start = ranges[index].start;
    let end = ranges[index + needle.length - 1].end;
    searchFrom = index + needle.length;

    // Keep trailing combining marks with the character they modify.
    while (end < text.length) {
      const character = String.fromCodePoint(text.codePointAt(end)!)!;
      if (!/\p{M}/u.test(character)) {
        break;
      }
      end += character.length;
    }

    if (start < cursor) {
      continue;
    }

    if (start > cursor) {
      parts.push(text.slice(cursor, start));
    }
    parts.push(
      <mark key={start} className="bg-pencil/20 text-inherit">
        {text.slice(start, end)}
      </mark>
    );
    cursor = end;
  }

  if (!parts.length) {
    return text;
  }
  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
}
