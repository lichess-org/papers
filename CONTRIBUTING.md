# Contributing and Style Guide

## What to include

- Works that rely on Lichess data.
- Works that rely on Lichess code (For example, some papers are included because they rely on the definition or implementation of the [`accuracy`](https://lichess.org/page/accuracy) metric.
- Works that rely on Lichess content.
- Works that make statements about Lichess.

## Style

Use BibLaTeX conventions and try to include as much metadata as possible. A good example is:

```
@inproceedings{ruoss:2024:amortized-planning-transformers-case-study-chess,
  title         = {Amortized planning with large-scale transformers: a case study on chess},
  author        = {Ruoss, Anian and Del\'{e}tang, Gr\'{e}goire and Medapati, Sourabh and Grau-Moya, Jordi and Wenliang, Li Kevin and Catt, Elliot and Reid, John and Lewis, Cannada A. and Veness, Joel and Genewein, Tim},
  year          = {2024},
  booktitle     = {Proceedings of the 38th International Conference on Neural Information Processing Systems},
  location      = {Vancouver, BC, Canada},
  publisher     = {Curran Associates Inc.},
  address       = {Red Hook, NY, USA},
  series        = {NeurIPS '24},
  isbn          = {9798331314385},
  url           = {https://dl.acm.org/doi/10.5555/3737916.3740018},
  note          = {Previously known as "Grandmaster-Level Chess Without Search" (https://arxiv.org/pdf/2402.04494v1)},
  abstract      = {This paper uses chess, a landmark planning problem in AI, to assess transformers' performance on a planning task where memorization is futile -- even at a large scale. To this end, we release ChessBench, a large-scale benchmark dataset of 10 million chess games with legal move and value annotations (15 billion data points) provided by Stockfish 16, the state-of-the-art chess engine. We train transformers with up to 270 million parameters on ChessBench via supervised learning and perform extensive ablations to assess the impact of dataset size, model size, architecture type, and different prediction targets (state-values, action-values, and behavioral cloning). Our largest models learn to predict action-values for novel boards quite accurately, implying highly non-trivial generalization. Despite performing no explicit search, our resulting chess policy solves challenging chess puzzles and achieves a surprisingly strong Lichess blitz Elo of 2895 against humans (grandmaster level). We also compare to Leela Chess Zero and AlphaZero (trained without supervision via self-play) with and without search. We show that, although a remarkably good approximation of Stockfish's search-based algorithm can be distilled into large-scale transformers via supervised learning, perfect distillation is still beyond reach, thus making ChessBench well-suited for future research.},
  articleno     = {2102},
  numpages      = {26},
  keywords      = {chess, supervised learning, transformer, scaling, benchmark},
  website       = {https://neurips.cc/virtual/2024/poster/94747},
  poster        = {https://neurips.cc/media/PosterPDFs/NeurIPS%202024/94747.png},
  github        = {https://github.com/google-deepmind/searchless_chess},
  dataset       = {https://storage.googleapis.com/searchless_chess},
  pdf           = {https://proceedings.neurips.cc/paper_files/paper/2024/file/78f0db30c39c850de728c769f42fc903-Paper-Conference.pdf},
  preprint      = {https://arxiv.org/abs/2402.04494},
}
```

To properly format the .bib file after you change it, please run the `tidy` recipe from the [Makefile](Makefile). You will need to have [`bibtex-tidy`](https://github.com/FlamingTempura/bibtex-tidy?tab=readme-ov-file#sec-cli) installed.
