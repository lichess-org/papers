# Lichess Bibliography Website

The website is a Next.js app in this directory. It displays the bibliography from `public/data.json`. That data is generated from the repository's root-level `lichess.bib`.

## Setup

Install [Bun](https://bun.sh/), then from the repository root run:

```sh
cd website
bun install
```

## Development

Start the development server:

```sh
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). The app reloads as you edit files in `app/` and `components/`.

> [!note]
> When you change `lichess.bib`, run `bun run convert:bib` to update the website data.

## Project commands

Run these from `website/`:

| Command               | Description                                         |
| --------------------- | --------------------------------------------------- |
| `bun run dev`         | Start the development server                        |
| `bun run build`       | Create a production build                           |
| `bun run start`       | Serve the production build                          |
| `bun run lint`        | Run lint and check formatting                       |
| `bun run typecheck`   | Type-check the project                              |
| `bun run convert:bib` | Regenerate `public/data.json` from `../lichess.bib` |

## GitHub Pages deployment

The website CI workflow runs lint and type checks on pushes and pull requests. The deploy workflow builds and publishes the static site to GitHub Pages on pushes to `main` and can also be started manually. Set the repository's Pages source to **GitHub Actions** in Settings > Pages.

## Additional information

See the [Next.js documentation](https://nextjs.org/docs) for framework details.
