import re
import sys
import unicodedata

import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.bwriter import BibTexWriter


STOP_WORDS = {
    "a", "an", "the", "and",
}


def to_ascii(text):
    return unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    
def slugify(text):
    text = re.sub(r"[{}\\]", "", text)
    text = re.sub(r"[^a-zA-Z0-9\s-]", "", text)
    text = to_ascii(text)
    words = text.lower().split()
    result = "-".join(w for w in words if w not in STOP_WORDS)
    return re.sub(r"-{2,}", "-", result)


def first_author_last_name(author):
    first = re.split(r"\s+and\s+", author, maxsplit=1)[0].strip()
    name = first.split(",")[0].strip() if "," in first else first.split()[-1].strip()
    return re.sub(r"[^a-z]", "", to_ascii(name).lower())


def generate_key(entry):
    author = first_author_last_name(entry.get("author", "unknown"))
    year = entry.get("year", "0000")
    title = slugify(entry.get("title", "untitled"))
    return f"{author}:{year}:{title}"


parser = BibTexParser(common_strings=True)
parser.ignore_nonstandard_types = False

with open(sys.argv[1]) as f:
    db = bibtexparser.load(f, parser=parser)

for entry in db.entries:
    entry["ID"] = generate_key(entry)

with open(sys.argv[1], "w") as f:
    f.write(BibTexWriter().write(db))
