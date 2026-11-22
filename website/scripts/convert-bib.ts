import { initSync, parseVerbatim } from '@retorquere/bibtex-parser';

const input = new URL('../../lichess.bib', import.meta.url);
const output = new URL('../public/data.json', import.meta.url);
const wasm = new URL('../node_modules/@retorquere/bibtex-parser/dist/bibtex_parser_bg.wasm', import.meta.url);

// The parser fails on a stray "$" (unclosed math), so dollars are swapped for a placeholder while parsing.
const DOLLAR = '\uE000';

initSync({ module: await Bun.file(wasm).arrayBuffer() });

const library = parseVerbatim((await Bun.file(input).text()).replaceAll('$', DOLLAR));

for (const { error } of library.errors) {
  console.warn(`BibTeX parser: ${error}`);
}

const entries = library.entries.map(({ key, type, fields }) => ({
  id: key,
  entryType: type,
  fields: Object.fromEntries(Object.entries(fields).map(([name, value]) => [name, value.replaceAll(DOLLAR, '$')])),
}));

await Bun.write(output, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} entries to public/data.json`);
