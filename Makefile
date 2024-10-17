tidy:
	bibtex-tidy --sort --curly --escape --blank-lines --duplicates --sort-fields --remove-empty-fields --trailing-commas --omit=timestamp,biburl,bibsource lichess.bib

html:
	pandoc lichess.bib --citeproc --csl chicago-fullnote-bibliography.csl -s -o lichess.html	
