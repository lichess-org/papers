import re, sys
from collections import Counter
import bibtexparser
from bibtexparser.bparser import BibTexParser
from rich import box
from rich.console import Console
from rich.table import Table
from rich.columns import Columns
from rich.panel import Panel
from rich.text import Text

parser = BibTexParser(common_strings=True)
parser.ignore_nonstandard_types = False
with open(sys.argv[1]) as f:
    db = bibtexparser.load(f, parser=parser)
entries = db.entries
n = len(entries)

has_code = sum(1 for e in entries if e.get("code") or e.get("github"))
has_dataset = sum(1 for e in entries if e.get("dataset"))
has_bot = sum(1 for e in entries if e.get("bot"))
years = sorted(int(e["year"]) for e in entries if e.get("year"))
year_counts = Counter(years)
min_y, max_y = min(years), max(years)

type_map = {"inproceedings": "conference", "article": "journal", "misc": "preprint", "thesis": "thesis"}
type_counts = Counter(type_map.get(e["ENTRYTYPE"], "other") for e in entries)

aff_counter = Counter()
for e in entries:
    aff = e.get("affiliation", "")
    if aff and aff.lower() != "independent":
        for a in re.split(r"\s*;\s*", aff):
            a = a.strip()
            if a:
                aff_counter[a] += 1

venue_counter = Counter()
for e in entries:
    venue = e.get("journal") or e.get("booktitle") or ""
    venue = re.sub(r"\{[^}]*\}", lambda m: m.group(0).strip("{}"), venue)
    venue = re.sub(r"\s*,\s*(19|20)\d{2}.*", "", venue)
    venue = re.sub(r"\s*,\s*(Virtual|Online|Held).*", "", venue, flags=re.IGNORECASE)
    venue = venue.strip().rstrip(",")
    if venue and len(venue) > 5:
        venue_counter[venue] += 1

console = Console(record=True, width=140)

summary = Table(box=box.SIMPLE, show_header=False, pad_edge=False)
summary.add_column("key", style="bold")
summary.add_column("val", justify="right")
summary.add_row("Papers", str(n))
summary.add_row("With code", f"{has_code} ({100*has_code//n}%)")
summary.add_row("With data", f"{has_dataset} ({100*has_dataset//n}%)")
summary.add_row("Lichess bot", f"{has_bot} ({100*has_bot//n}%)")
for t in ["conference", "journal", "preprint", "thesis", "other"]:
    if type_counts[t]:
        summary.add_row(t, str(type_counts[t]))

max_count = max(year_counts.values())
bar_width = 20
year_table = Table(box=box.SIMPLE, show_header=False, pad_edge=False)
year_table.add_column("year", style="dim", justify="right")
year_table.add_column("bar")
year_table.add_column("n", style="dim", justify="right")
for y in range(min_y, max_y + 1):
    c = year_counts.get(y, 0)
    filled = round(c / max_count * bar_width)
    bar = Text("█" * filled, style="bold blue") + Text("░" * (bar_width - filled), style="dim")
    year_table.add_row(str(y), bar, str(c))

console.print(Columns([Panel(summary, title="Bibliography Statistics", border_style="dim", box=box.ROUNDED), Panel(year_table, title="Papers by Year", border_style="dim", box=box.ROUNDED)]))

kw_counter = Counter()
for e in entries:
    kw = e.get("keywords", "")
    if kw:
        for k in re.split(r"\s*[;,]\s*", kw):
            k = k.strip().lower()
            if k and len(k) > 2 and k != "chess":
                kw_counter[k] += 1

aff_table = Table(title="Top Affiliations", box=box.SIMPLE_HEAVY, show_edge=False)
aff_table.add_column("Affiliation", no_wrap=False)
aff_table.add_column("Papers", justify="right", style="bold")
for aff, count in aff_counter.most_common(20):
    aff_table.add_row(aff, str(count))

kw_table = Table(title="Top Keywords", box=box.SIMPLE_HEAVY, show_edge=False)
kw_table.add_column("Keyword", no_wrap=True)
kw_table.add_column("Papers", justify="right", style="bold")
for kw, count in kw_counter.most_common(20):
    kw_table.add_row(kw, str(count))

console.print(Columns([aff_table, kw_table], padding=(0, 4)))

CONSOLE_HTML_FORMAT = '<pre style="font-family:Menlo,\'DejaVu Sans Mono\',consolas,\'Courier New\',monospace">{code}</pre>'
html = console.export_html(inline_styles=True, code_format=CONSOLE_HTML_FORMAT)

readme_path = sys.argv[2] if len(sys.argv) > 2 else "README.md"
with open(readme_path) as f:
    readme = f.read()

START, END = "<!-- stats:start -->", "<!-- stats:end -->"
if START in readme:
    readme = re.sub(re.escape(START) + r".*?" + re.escape(END), f"{START}\n{html}\n{END}", readme, flags=re.DOTALL)
else:
    readme = readme.rstrip() + f"\n\n{START}\n{html}\n{END}\n"

with open(readme_path, "w") as f:
    f.write(readme)
print(f"Updated {readme_path} with stats for {n} entries.")
