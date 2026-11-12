# Knowledge

Source material for Storyline Design — research, interviews, examples, and personal notes.

Use this folder as the long-term memory for content automation. Keep notes short, dated, and linked to a project or channel when possible.

| Folder | Use for |
| --- | --- |
| `hiring-insights/` | Live hiring survey metrics from storyline.design (auto-synced) |
| `research/icp/` | **Storage only** — ICP interviews archived here; do not use for content, positioning, or automation yet |
| `portfolio-examples/` | Strong / weak case study patterns and references |
| `personal-insights/` | Your own observations and framing that should shape the voice |

For content and automation, prefer `hiring-insights/`, `personal-insights/`, `portfolio-examples/`, and `rules/`. Ignore `research/icp/` unless explicitly asked.

Real names are OK in `knowledge/` for storage. Never use them in outbound content. See `rules/research-guidelines.md`.

## Hiring insights sync

Live survey stats used on [storyline.design/hiring-insights](https://storyline.design/hiring-insights/) are pulled from the Vercel `/api/metrics` endpoint and stored in `hiring-insights/`.

```bash
npm run sync:hiring-insights
```

This runs automatically every 6 hours via GitHub Actions, and can also be triggered manually from the Actions tab.

Add one markdown file per note for everything else. Prefer clear titles over nested folders until volume grows.
