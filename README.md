# Storyline Studio

Private editorial workspace and knowledge base for **Storyline Design**.

The Next.js studio (`src/`) stays as the interactive recording and project tool. The folders below collect research and content so you can automate pieces later.

## Structure

```text
storyline-studio/
├── knowledge/               # lasting research and notes
│   ├── hiring-insights/     # live survey metrics (auto-synced from Vercel)
│   ├── research/
│   │   └── icp/             # storage only — do not use for content yet
│   ├── portfolio-examples/
│   └── personal-insights/
├── content/                 # drafts and published pieces
│   ├── youtube/
│   ├── newsletters/
│   ├── articles/
│   └── linkedin/
├── assets/                  # diagrams, illustrations, templates
│   ├── diagrams/
│   ├── illustrations/
│   └── templates/
├── rules/                   # editorial, writing, research guidelines
├── scripts/
│   └── sync-hiring-insights.mjs
├── src/                     # Next.js studio app (do not break)
├── public/                  # web assets for the studio UI
└── README.md
```

## How the pieces fit

| Area | Role |
| --- | --- |
| `knowledge/` | Inputs — research, hiring insights, examples, personal notes |
| `knowledge/research/icp/` | Storage only — archived interviews; not for content/automation yet |
| `knowledge/hiring-insights/` | Live hiring survey metrics synced from storyline.design (Vercel) |
| `content/` | Outputs — YouTube, newsletters, articles, LinkedIn |
| `assets/` | Creative source files (not the Next.js `public/` folder) |
| `rules/` | Voice and quality constraints for humans and future automation |
| `src/` | Interactive studio for recording frames and project work |

## Sync hiring insights from Vercel

Live survey metrics from [storyline.design/hiring-insights](https://storyline.design/hiring-insights/) are pulled from the Vercel-hosted `/api/metrics` endpoint:

```bash
npm run sync:hiring-insights
```

This writes:

- `knowledge/hiring-insights/latest.json` — full live snapshot
- `knowledge/hiring-insights/summary.md` — readable summary
- `knowledge/hiring-insights/narrative.md` — page narrative context

GitHub Actions also syncs every 6 hours and commits updates automatically. You can trigger it manually from the Actions tab.

## Studio app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Create project folders for video asset collections
- Open a project into a workspace
- Build text-animation recording scenes
- Data for projects is stored locally in the browser (`localStorage`)

## Working rules

1. Do not move or rename `src/`, `public/`, or Next.js config unless the studio needs it.
2. Put research in `knowledge/`, drafts in `content/`.
3. Follow files in `rules/` before drafting or generating content.
4. Hiring survey stats stay current via `npm run sync:hiring-insights` or the GitHub Action.
