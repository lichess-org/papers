import bibtexparser
from bibtexparser.bparser import BibTexParser
import pandas as pd
from datasets import Dataset


parser = BibTexParser(common_strings=True)
parser.ignore_nonstandard_types = False

with open("lichess.bib") as f:
    db = bibtexparser.load(f, parser=parser)

df = pd.DataFrame(db.entries)
Dataset.from_pandas(df).push_to_hub("lichess/papers")