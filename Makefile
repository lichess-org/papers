SORT_FIELDS  = title,shorttitle,titleaddon,author,editor,year,month,day,journal,booktitle,organization,location,publisher,address,series,volume,number,pages,doi,isbn,issn,eprint,eprinttype,eprintclass,url,urldate,copyright,category,type,institution,supervisor,langid,pagetotal,numpages,articleno,note,tldr,abstract,keywords,affiliation,website,blog,poster,slides,talk,video,pdf,preprint,github,code,dataset,model,huggingface,figshare,pypi,software,todo

tidy:
	bibtex-tidy --sort --curly --no-escape --blank-lines --duplicates --sort-fields=$(SORT_FIELDS) --modify --remove-empty-fields --trailing-commas --omit=timestamp,biburl,bibsource lichess.bib

stats count:
	@echo "$$(grep -c '^@' lichess.bib) entries"

hf:
	uvx --with bibtexparser --with pandas --with datasets python scripts/bib2parquet.py