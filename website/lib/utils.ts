import { twMerge } from 'tailwind-merge';

import { formatLabels } from '~/lib/constants';
import { type Paper, type RawPaper } from '~/lib/types';

export function tw(...classes: (string | false | null | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(' '));
}

function isKnownPaperType(value: string): value is keyof typeof formatLabels {
  return Object.hasOwn(formatLabels, value);
}

export function formatPaperType(entryType: string) {
  const normalizedType = entryType.toLowerCase();
  return isKnownPaperType(normalizedType)
    ? formatLabels[normalizedType]
    : entryType.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function getField(fields: Record<string, string | undefined>, key: string) {
  const value = fields[key];
  return typeof value === 'string' ? value.trim() : '';
}

export function normalizeSearchText(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().replace(/ς/g, 'σ');
}

export function getUrl(value: string, key: string) {
  if (!value) {
    return null;
  }

  const candidate = key === 'doi' && !/^https?:\/\//i.test(value) ? `https://doi.org/${value}` : value;

  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export function getLinks(fields: Record<string, string | undefined>) {
  const linkFields = [
    ['url', 'Paper'],
    ['website', 'Website'],
    ['pdf', 'PDF'],
    ['doi', 'DOI'],
    ['code', 'Code'],
    ['preprint', 'Preprint'],
  ] as const;

  return linkFields.flatMap(([key, label]) => {
    const url = getUrl(getField(fields, key), key);
    return url ? [{ label, url }] : [];
  });
}

export function formatPaper(record: RawPaper, index: number): Paper {
  const fields = record.fields;
  const title = getField(fields, 'title').replace(/[{}]/g, '');
  const authors = getField(fields, 'author').replace(/\s+and\s+/g, ', ');
  const publication =
    getField(fields, 'journal') ||
    getField(fields, 'booktitle') ||
    getField(fields, 'institution') ||
    getField(fields, 'publisher') ||
    getField(fields, 'affiliation');

  return {
    id: record.id,
    number: index + 1,
    title: title || 'Untitled paper',
    authors,
    year: getField(fields, 'year'),
    entryType: record.entryType,
    publication,
    abstract: getField(fields, 'abstract'),
    affiliation: getField(fields, 'affiliation'),
    keywords: getField(fields, 'keywords'),
    searchText: normalizeSearchText(
      Object.values(fields)
        .filter((value): value is string => typeof value === 'string')
        .join(' ')
    ),
    links: getLinks(fields),
  };
}
