export type Paper = {
  id: string;
  number: number;
  title: string;
  authors: string;
  year: string;
  entryType: string;
  publication: string;
  abstract: string;
  keywords: string;
  searchText: string;
  links: { label: string; url: string }[];
};

export type RawPaper = {
  id: string;
  entryType: string;
  fields: Record<string, string | undefined>;
};
