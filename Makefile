tidy:
	bibtex-tidy --sort --curly --no-escape --blank-lines --duplicates --sort-fields --modify --remove-empty-fields --trailing-commas --omit=timestamp,biburl,bibsource lichess.bib

stats count:
	@echo "$$(grep -c '^@' lichess.bib) entries"

hf:
	uvx --with bibtexparser --with pandas --with datasets python scripts/bib2parquet.py