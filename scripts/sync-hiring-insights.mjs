#!/usr/bin/env node
/**
 * Syncs live hiring survey metrics from storyline.design into
 * knowledge/hiring-insights/ so Storyline Studio stays up to date.
 *
 * Source: https://storyline.design/api/metrics
 * (Vercel serverless function reading the private Google Sheet)
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "knowledge", "hiring-insights");
const METRICS_URL =
  process.env.HIRING_INSIGHTS_URL || "https://storyline.design/api/metrics";

function percentList(items = []) {
  return items.map((item) => `- ${item.label}: ${item.percent}%`).join("\n");
}

function segmentList(segments = []) {
  return segments
    .map((segment) => `- ${segment.label}: ${segment.percent}%`)
    .join("\n");
}

function weightByRoleList(items = []) {
  return items
    .map(
      (item) =>
        `- ${item.role}: thinking ${item.thinkingPercent}%, quality ${item.qualityPercent}%`
    )
    .join("\n");
}

function buildSummaryMarkdown(metrics, syncedAt) {
  const impact = metrics.impact || {};

  return `# Hiring insights

Synced from [storyline.design/hiring-insights](https://storyline.design/hiring-insights/) via the live Vercel metrics API.

- Synced at: ${syncedAt}
- Survey last updated: ${metrics.lastUpdated || "unknown"}
- Data source: ${metrics.source || "unknown"}

## Headline metrics

- Portfolios strongly influence first interviews: ${impact.portfolioStrongInfluence ?? "—"}%
- Reviewers decide in 3 minutes or less: ${impact.threeMinutesOrLess ?? "—"}%
- AI has changed evaluation: ${impact.aiChangedEvaluation ?? "—"}%
- Thinking/decisions weight: ${impact.thinkingWeight ?? "—"}%
- Work quality weight: ${impact.workQuality ?? "—"}%
- Portfolios feel generic: ${impact.genericPortfolios ?? "—"}%

## Portfolio influence on first interview

${segmentList(metrics.influence?.segments)}

## Time spent on initial portfolio review

${segmentList(metrics.timeSpent?.segments)}

## What carries more weight

${percentList(metrics.carriesMoreWeight?.items)}

### Weight by role

${weightByRoleList(metrics.weightByRole?.items)}

## What matters when progressing a candidate

${percentList(metrics.whatMatters?.items)}

## Case study importance

${percentList(metrics.caseStudies?.items)}

## What prevents candidates from progressing

${percentList(metrics.progressionBlockers?.items)}

## Biggest portfolio problems

${percentList(metrics.portfolioProblems?.items)}

## Who answered

${segmentList(metrics.roles?.segments)}

## Files

- Live snapshot: \`latest.json\`
- Narrative context: \`narrative.md\`
`;
}

async function main() {
  const response = await fetch(METRICS_URL, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch metrics: ${response.status}`);
  }

  const metrics = await response.json();
  const syncedAt = new Date().toISOString();
  const payload = {
    syncedAt,
    sourceUrl: METRICS_URL,
    pageUrl: "https://storyline.design/hiring-insights/",
    metrics,
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    path.join(OUT_DIR, "latest.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8"
  );
  await writeFile(
    path.join(OUT_DIR, "summary.md"),
    `${buildSummaryMarkdown(metrics, syncedAt)}\n`,
    "utf8"
  );

  console.log(
    `Synced hiring insights (${metrics.source || "unknown"}) updated ${metrics.lastUpdated || "unknown"}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
