"use client";

import { useState } from "react";

type Section = {
  id: "problem" | "research" | "solution" | "outcome";
  title: string;
  body: string[];
};

type Persona = {
  initials: string;
  name: string;
  meta: string;
  goal: string;
  frustrations: string[];
  accentFrom: string;
  accentTo: string;
  accentText: string;
};

type StickyNote = {
  title: string;
  lines: string[];
  rotate: string;
  className: string;
};

type FlowScreen = {
  step: string;
  label: string;
  title: string;
  detail: string;
  fields: string[];
  cta: string;
};

type InsightCard = {
  label: string;
  finding: string;
};

type CaseStudyExample =
  | {
      id: "onboarding";
      tab: string;
      title: string;
      subtitle: string;
      layout: "onboarding";
      sections: Section[];
      persona: Persona;
      stickyNotes: StickyNote[];
      flowLabel: string;
      flowScreens: FlowScreen[];
    }
  | {
      id: "analytics";
      tab: string;
      title: string;
      subtitle: string;
      layout: "analytics";
      sections: Section[];
      persona: Persona;
      insights: InsightCard[];
    }
  | {
      id: "search";
      tab: string;
      title: string;
      subtitle: string;
      layout: "search";
      sections: Section[];
    };

const EXAMPLES: CaseStudyExample[] = [
  {
    id: "onboarding",
    tab: "Onboarding",
    layout: "onboarding",
    title: "Redesigning the onboarding experience",
    subtitle: "Collecting the right user details without turning signup into a form marathon.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        body: [
          "New users were dropping off before they ever reached value. Onboarding asked for profile details, preferences, and payout info all at once, so completion sat below 40% and people left unsure what was required.",
        ],
      },
      {
        id: "research",
        title: "The User Research",
        body: [
          "We conducted user interviews and reviewed onboarding sessions to understand where users experienced friction. Through our research, we identified several pain points and opportunities to improve the experience.",
        ],
      },
      {
        id: "solution",
        title: "The Solution",
        body: [
          "We rebuilt onboarding as a short intake flow: who you are, how you work, then account details only when needed. Each screen collected one cluster of information with one primary continue action.",
        ],
      },
      {
        id: "outcome",
        title: "The Outcome",
        body: [
          "Profile completion rose from 38% to 67%, average time to finish required details fell from about 9 minutes to under 3, and support tickets about missing account setup dropped sharply.",
        ],
      },
    ],
    persona: {
      initials: "MC",
      name: "Maya Chen",
      meta: "28 · Product marketer",
      goal: "Get set up fast without dumping bank and profile details into one long form.",
      frustrations: [
        "Too many required fields before value",
        "Unclear why sensitive info is needed now",
      ],
      accentFrom: "from-[#D7E6FF]",
      accentTo: "to-[#E8EEF7]",
      accentText: "text-[#3A5A8C]",
    },
    stickyNotes: [
      {
        title: "About you",
        lines: [
          "Full name",
          "Work email",
          "Role / team",
          "Country",
        ],
        rotate: "-3deg",
        className: "sm:mt-1 sm:ml-1",
      },
      {
        title: "Work details",
        lines: [
          "Company size",
          "Use case",
          "Invite teammates?",
          "Goals this month",
        ],
        rotate: "2.5deg",
        className: "sm:mt-2 sm:ml-6",
      },
      {
        title: "Account details",
        lines: [
          "Account number",
          "Account name",
          "IFSC / routing",
          "Nominee + phone",
        ],
        rotate: "-2deg",
        className: "sm:mt-1 sm:ml-2",
      },
    ],
    flowLabel: "Info collection flow",
    flowScreens: [
      {
        step: "1",
        label: "About you",
        title: "Tell us who you are",
        detail: "Only the basics to open your workspace",
        fields: ["Full name", "Work email", "Role"],
        cta: "Continue",
      },
      {
        step: "2",
        label: "Work setup",
        title: "How will you use this?",
        detail: "Shape defaults from a few work details",
        fields: ["Company size", "Main use case", "Team invites"],
        cta: "Continue",
      },
      {
        step: "3",
        label: "Account info",
        title: "Add payout details",
        detail: "Collected only when you’re ready to transact",
        fields: ["Account number", "IFSC / routing", "Nominee"],
        cta: "Save & finish",
      },
    ],
  },
  {
    id: "analytics",
    tab: "Analytics",
    layout: "analytics",
    title: "Simplifying the analytics dashboard",
    subtitle: "Helping teams find the signal without drowning in charts.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        body: [
          "The analytics dashboard showed everything at once: dozens of charts, overlapping filters, and no default story. Teams spent meetings hunting for the metric that mattered instead of deciding what to do next.",
        ],
      },
      {
        id: "research",
        title: "The User Research",
        body: [
          "Stakeholder interviews and task studies showed operators wanted a weekly pulse they could trust in under a minute. Power users still needed depth, but most people only needed trend, comparison, and one clear next filter.",
        ],
      },
      {
        id: "solution",
        title: "The Solution",
        body: [
          "We redesigned analytics around a focused weekly view: a primary metric, a short comparison, and guided drill-downs. Advanced charts stayed available, but they no longer blocked the first answer.",
        ],
      },
      {
        id: "outcome",
        title: "The Outcome",
        body: [
          "Time to find a key metric dropped from about 4 minutes to under 45 seconds, weekly active dashboard users rose 24%, and teams reported fewer “can you pull that chart?” requests in standup.",
        ],
      },
    ],
    persona: {
      initials: "JR",
      name: "Jordan Reyes",
      meta: "34 · Ops lead",
      goal: "Check weekly performance in one glance before the Monday standup.",
      frustrations: [
        "Too many charts with no hierarchy",
        "Filters feel like a second job",
      ],
      accentFrom: "from-[#D8F3E7]",
      accentTo: "to-[#E8F2EE]",
      accentText: "text-[#2F6B55]",
    },
    insights: [
      {
        label: "Interview theme",
        finding: "“I only need the weekly number, then maybe one comparison.”",
      },
      {
        label: "Task study",
        finding: "Finding revenue took 4+ minutes across 11 visible widgets.",
      },
      {
        label: "Priority",
        finding: "Default to a pulse view. Keep deep filters one click away.",
      },
    ],
  },
  {
    id: "search",
    tab: "Search",
    layout: "search",
    title: "Rethinking marketplace search",
    subtitle: "Designing a search AI experience that narrows with the shopper.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        body: [
          "Search returned long, noisy result lists. Filters sat in a dense panel that most people ignored, so shoppers scrolled past better matches or abandoned the query altogether.",
        ],
      },
      {
        id: "research",
        title: "User Flows",
        body: [
          "We mapped how people moved from a first query into refinement, results, and AI assistance. The flow made one thing clear: search needed to stay conversational while still leading into browse, save, and explore paths.",
        ],
      },
      {
        id: "solution",
        title: "The Solution",
        body: [
          "We focused the solution on the search AI experience itself: a prompt-led query, suggested refinements, and ranked answers with reasons. Browse chrome stayed secondary so shoppers could stay in the conversation.",
        ],
      },
      {
        id: "outcome",
        title: "The Outcome",
        body: [
          "Successful searches rose 21%, average refinements per session dropped from 6 to 2.4, and add-to-cart from AI-assisted search improved 14% within the first month.",
        ],
      },
    ],
  },
];

/** Fixed writing frame so case study content stays consistent in size and rhythm. */
export const CASE_STUDY_FRAME = {
  width: 720,
  paddingX: 48,
  paddingY: 64,
} as const;

export const CASE_STUDY_TABS = EXAMPLES.map(({ id, tab }) => ({ id, tab }));

export function CaseStudyTabs({
  activeId,
  onChange,
}: {
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      className="inline-flex rounded-[10px] bg-[#EBEBEF] p-1"
      role="tablist"
      aria-label="Case study examples"
    >
      {CASE_STUDY_TABS.map((example) => {
        const active = example.id === activeId;
        return (
          <button
            key={example.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(example.id)}
            className={`rounded-[8px] px-3.5 py-1.5 text-[13px] font-medium transition-all ${
              active
                ? "bg-white text-[#1C1C1E] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
                : "text-[#636366] hover:text-[#1C1C1E]"
            }`}
          >
            {example.tab}
          </button>
        );
      })}
    </div>
  );
}

function PersonaCard({
  persona,
  compact = false,
}: {
  persona: Persona;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="w-full max-w-[200px] overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="border-b border-black/[0.04] bg-[#F7F7F8] px-3 py-1.5">
          <p className="text-[9px] font-medium tracking-[0.12em] text-[#8E8E93] uppercase">
            User persona
          </p>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-semibold tracking-tight ${persona.accentFrom} ${persona.accentTo} ${persona.accentText}`}
            >
              {persona.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold tracking-tight text-[#1C1C1E]">
                {persona.name}
              </p>
              <p className="text-[11px] text-[#8E8E93]">{persona.meta}</p>
            </div>
          </div>

          <div className="mt-3 space-y-2.5">
            <div>
              <p className="text-[9px] font-medium tracking-[0.1em] text-[#8E8E93] uppercase">
                Goal
              </p>
              <p className="mt-1 text-[11px] leading-snug text-[#3A3A3C]">
                {persona.goal}
              </p>
            </div>

            <div className="h-px bg-black/[0.05]" />

            <div>
              <p className="text-[9px] font-medium tracking-[0.1em] text-[#8E8E93] uppercase">
                Frustrations
              </p>
              <ul className="mt-1 space-y-1 text-[11px] leading-snug text-[#3A3A3C]">
                {persona.frustrations.map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="mt-[5px] size-1 shrink-0 rounded-full bg-[#C7C7CC]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
      <div className="border-b border-black/[0.04] bg-[#F7F7F8] px-4 py-3">
        <p className="text-[11px] font-medium tracking-[0.12em] text-[#8E8E93] uppercase">
          User persona
        </p>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3.5">
          <div
            className={`flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[15px] font-semibold tracking-tight ${persona.accentFrom} ${persona.accentTo} ${persona.accentText}`}
          >
            {persona.initials}
          </div>
          <div className="min-w-0">
            <p className="text-[16px] font-semibold tracking-tight text-[#1C1C1E]">
              {persona.name}
            </p>
            <p className="mt-0.5 text-[13px] text-[#8E8E93]">{persona.meta}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.1em] text-[#8E8E93] uppercase">
              Goal
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#3A3A3C]">
              {persona.goal}
            </p>
          </div>

          <div className="h-px bg-black/[0.05]" />

          <div>
            <p className="text-[11px] font-medium tracking-[0.1em] text-[#8E8E93] uppercase">
              Frustrations
            </p>
            <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-[#3A3A3C]">
              {persona.frustrations.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#C7C7CC]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingResearch({
  persona,
  stickyNotes,
  compact = false,
}: {
  persona: Persona;
  stickyNotes: StickyNote[];
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-start sm:flex-row ${
        compact
          ? "mt-4 gap-4 sm:gap-5"
          : "mt-8 gap-8 sm:gap-10"
      }`}
    >
      {compact ? null : <PersonaCard persona={persona} />}

      <div
        className={
          compact
            ? "flex flex-row flex-wrap items-start gap-2.5 pt-1"
            : "flex flex-col gap-4 pt-1"
        }
      >
        {stickyNotes.map((note, index) => (
          <div
            key={note.title}
            className={`bg-[#FFE566] text-[#1C1C1E] ${
              compact ? "w-[118px] shrink-0 p-2" : `w-[168px] p-3 ${note.className}`
            }`}
            style={{
              transform: `rotate(${note.rotate})`,
              marginTop: compact ? (index % 2 === 0 ? 0 : 8) : undefined,
              boxShadow: compact
                ? "0 1px 1px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.07)"
                : "0 1px 1px rgba(0,0,0,0.04), 0 8px 18px rgba(0,0,0,0.08)",
            }}
          >
            <p
              className={`font-bold leading-tight ${
                compact ? "text-[10px]" : "text-[12px]"
              }`}
            >
              {note.title}
            </p>
            <ul
              className={`leading-snug ${
                compact
                  ? "mt-1.5 space-y-0.5 text-[9px]"
                  : "mt-2 space-y-1 text-[11px]"
              }`}
            >
              {note.lines.map((line) => (
                <li key={line} className="flex gap-1.5">
                  <span className="mt-[6px] size-1 shrink-0 rounded-full bg-black/35" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowScreenCard({
  step,
  label,
  title,
  detail,
  fields,
  cta,
  compact = false,
}: FlowScreen & { compact?: boolean }) {
  if (compact) {
    return (
      <div className="w-[132px] shrink-0 overflow-hidden rounded-[16px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_3px_8px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-center bg-[#F7F7F8] px-2 py-1.5">
          <div className="h-1 w-10 rounded-full bg-[#D1D1D6]" />
        </div>

        <div className="flex min-h-[168px] flex-col px-2.5 pt-2.5 pb-2.5">
          <div className="flex items-center gap-1">
            <span className="flex size-4 items-center justify-center rounded-full bg-[#1C1C1E] text-[8px] font-semibold text-white">
              {step}
            </span>
            <span className="text-[8px] font-medium tracking-wide text-[#8E8E93] uppercase">
              {label}
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-snug font-semibold tracking-tight text-[#1C1C1E]">
            {title}
          </p>
          <p className="mt-0.5 text-[9px] leading-snug text-[#8E8E93]">{detail}</p>

          <div className="mt-2 space-y-1">
            {fields.map((field) => (
              <div
                key={field}
                className="rounded-md border border-black/[0.06] bg-[#FAFAFA] px-1.5 py-1"
              >
                <p className="text-[7px] tracking-wide text-[#8E8E93] uppercase">
                  {field}
                </p>
                <div className="mt-0.5 h-1.5 w-3/4 rounded-sm bg-[#E8E8ED]" />
              </div>
            ))}
          </div>

          <div className="mt-auto pt-2">
            <div className="flex h-6 items-center justify-center rounded-full bg-[#1C1C1E] text-[9px] font-medium text-white">
              {cta}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[176px] shrink-0 overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-center bg-[#F7F7F8] px-3 py-2.5">
        <div className="h-1.5 w-16 rounded-full bg-[#D1D1D6]" />
      </div>

      <div className="flex min-h-[250px] flex-col px-3.5 pt-4 pb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#1C1C1E] text-[10px] font-semibold text-white">
            {step}
          </span>
          <span className="text-[10px] font-medium tracking-wide text-[#8E8E93] uppercase">
            {label}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-snug font-semibold tracking-tight text-[#1C1C1E]">
          {title}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#8E8E93]">
          {detail}
        </p>

        <div className="mt-3 space-y-2">
          {fields.map((field) => (
            <div
              key={field}
              className="rounded-lg border border-black/[0.06] bg-[#FAFAFA] px-2.5 py-1.5"
            >
              <p className="text-[9px] tracking-wide text-[#8E8E93] uppercase">
                {field}
              </p>
              <div className="mt-1 h-2 w-3/4 rounded-sm bg-[#E8E8ED]" />
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex h-8 items-center justify-center rounded-full bg-[#1C1C1E] text-[11px] font-medium text-white">
            {cta}
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingSolution({
  label,
  screens,
  compact = false,
}: {
  label: string;
  screens: FlowScreen[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mt-3" : "mt-8"}>
      <p
        className={`font-medium tracking-[0.12em] text-[#8E8E93] uppercase ${
          compact ? "mb-2 text-[9px]" : "mb-4 text-[11px]"
        }`}
      >
        {label}
      </p>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {screens.map((screen, index) => (
          <div key={screen.step} className="flex items-center gap-1.5">
            <FlowScreenCard {...screen} compact={compact} />
            {index < screens.length - 1 ? (
              <div
                className={`hidden shrink-0 bg-[#D1D1D6] sm:block ${
                  compact ? "h-px w-3" : "h-px w-6"
                }`}
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSolutionExample() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const current = [18.2, 16.4, 19.1, 21.6, 17.8, 14.3, 20.4];
  const previous = [15.1, 14.8, 16.2, 18.0, 16.4, 13.1, 17.2];
  const yTicks = [0, 6, 12, 18, 24];
  const max = 24;
  const width = 420;
  const height = 168;
  const padL = 34;
  const padR = 8;
  const padT = 10;
  const padB = 24;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const xAt = (i: number) => padL + (i / (days.length - 1)) * plotW;
  const yAt = (v: number) => padT + plotH - (v / max) * plotH;

  const linePath = (values: number[]) =>
    values
      .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`)
      .join(" ");

  const areaPath = (values: number[]) =>
    `${linePath(values)} L ${xAt(values.length - 1).toFixed(1)} ${yAt(0).toFixed(1)} L ${xAt(0).toFixed(1)} ${yAt(0).toFixed(1)} Z`;

  return (
    <div className="mx-auto w-full max-w-[460px] rounded-2xl border border-[#E2E8E5] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.08em] text-[#7A9087] uppercase">
            Daily net revenue
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="font-[family-name:var(--font-analytics-serif)] text-[22px] leading-none text-[#14352C]">
              $128.4k
            </p>
            <p className="text-[11px] font-medium text-[#2F6B55]">+12.1%</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-[10px] text-[#5B736A]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-px w-3 bg-[#1F4D40]" />
            This week
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-px w-3 border-t border-dashed border-[#7A9087]"
              aria-hidden
            />
            Prior week
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 h-auto w-full"
        role="img"
        aria-label="Daily net revenue line chart comparing this week to prior week"
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padL}
              x2={width - padR}
              y1={yAt(tick)}
              y2={yAt(tick)}
              stroke="#E7EEEA"
              strokeWidth="1"
            />
            <text
              x={padL - 6}
              y={yAt(tick) + 3}
              textAnchor="end"
              className="fill-[#9AABB3]"
              style={{ fontSize: 9 }}
            >
              {tick}
            </text>
          </g>
        ))}

        <path d={areaPath(current)} fill="#1F4D40" fillOpacity="0.08" />
        <path
          d={linePath(previous)}
          fill="none"
          stroke="#8FA89C"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d={linePath(current)}
          fill="none"
          stroke="#1F4D40"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {current.map((value, i) => (
          <g key={days[i]}>
            <circle
              cx={xAt(i)}
              cy={yAt(value)}
              r="2.75"
              fill="#fff"
              stroke="#1F4D40"
              strokeWidth="1.5"
            />
            <text
              x={xAt(i)}
              y={height - 6}
              textAnchor="middle"
              className="fill-[#7A9087]"
              style={{ fontSize: 9 }}
            >
              {days[i]}
            </text>
          </g>
        ))}

        {/* peak callout */}
        <g>
          <line
            x1={xAt(3)}
            x2={xAt(3)}
            y1={yAt(current[3])}
            y2={yAt(current[3]) - 18}
            stroke="#1F4D40"
            strokeWidth="1"
            strokeOpacity="0.35"
          />
          <rect
            x={xAt(3) - 22}
            y={yAt(current[3]) - 34}
            width="44"
            height="16"
            rx="4"
            fill="#1F4D40"
          />
          <text
            x={xAt(3)}
            y={yAt(current[3]) - 23}
            textAnchor="middle"
            fill="#E7F0EC"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            $21.6k
          </text>
        </g>
      </svg>

      <div className="mt-2 flex items-center justify-between border-t border-[#EEF2F0] pt-2.5 text-[10px] text-[#7A9087]">
        <p>USD thousands · Mar 3–9</p>
        <p>vs Feb 24–Mar 2</p>
      </div>
    </div>
  );
}

function AnalyticsCaseStudy({
  example,
}: {
  example: Extract<CaseStudyExample, { layout: "analytics" }>;
}) {
  const problem = example.sections.find((s) => s.id === "problem")!;
  const research = example.sections.find((s) => s.id === "research")!;
  const solution = example.sections.find((s) => s.id === "solution")!;
  const outcome = example.sections.find((s) => s.id === "outcome")!;

  return (
    <article
      className="mx-auto w-full bg-white font-[family-name:var(--font-analytics-sans)] text-[#2A3D37]"
      style={{ maxWidth: CASE_STUDY_FRAME.width }}
    >
      <div
        className="flex flex-col gap-14"
        style={{
          paddingLeft: CASE_STUDY_FRAME.paddingX,
          paddingRight: CASE_STUDY_FRAME.paddingX,
          paddingTop: CASE_STUDY_FRAME.paddingY,
          paddingBottom: CASE_STUDY_FRAME.paddingY,
        }}
      >
        <header className="border-b border-[#E8EEEB] pb-10">
          <p className="text-[12px] font-medium tracking-[0.14em] text-[#5B736A] uppercase">
            Analytics
          </p>
          <h1 className="mt-3 max-w-[16ch] font-[family-name:var(--font-analytics-serif)] text-[2.4rem] leading-[1.05] tracking-[-0.03em] text-[#14352C] sm:text-[3rem]">
            {example.title}
          </h1>
          <p className="mt-5 max-w-[34em] text-[17px] leading-relaxed text-[#6A8076]">
            {example.subtitle}
          </p>
        </header>

        <section id="problem" className="scroll-mt-8">
          <h3 className="text-[1.375rem] font-semibold tracking-tight text-[#14352C]">
            {problem.title}
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-[17px] leading-[1.65] text-[#3a3a3c]">
              {problem.body[0]}
            </p>
          </div>
        </section>

        <section id="research" className="scroll-mt-8">
          <h3 className="text-[1.375rem] font-semibold tracking-tight text-[#14352C]">
            {research.title}
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-[17px] leading-[1.65] text-[#3a3a3c]">
              {research.body[0]}
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {example.insights.map((insight) => (
              <div key={insight.label} className="flex gap-3">
                <span
                  className="mt-1.5 size-2.5 shrink-0 rounded-[3px] bg-[#1F4D40]"
                  aria-hidden
                />
                <div>
                  <p className="text-[14px] font-semibold text-[#14352C]">
                    {insight.label}
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#5B736A]">
                    {insight.finding}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-[#E2E8E5] bg-[#F7FAF8] px-5 py-5">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[#1F4D40] font-[family-name:var(--font-analytics-serif)] text-[14px] text-[#E7F0EC]">
                {example.persona.initials}
              </div>
              <p className="mt-4 font-[family-name:var(--font-analytics-serif)] text-[18px] text-[#14352C]">
                {example.persona.name}
              </p>
              <p className="text-[12px] text-[#5B736A]">{example.persona.meta}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#2A3D37]">
                {example.persona.goal}
              </p>
            </div>
            <div className="rounded-[28px] border border-[#E2E8E5] bg-[#F7FAF8] px-5 py-5">
              <p className="text-[12px] font-semibold tracking-[0.08em] text-[#5B736A] uppercase">
                Methods
              </p>
              <ul className="mt-4 space-y-3 text-[14px] text-[#14352C]">
                <li className="flex justify-between gap-3 border-b border-[#E2E8E5] pb-2">
                  <span>Interviews</span>
                  <span className="text-[#5B736A]">8 ops leads</span>
                </li>
                <li className="flex justify-between gap-3 border-b border-[#E2E8E5] pb-2">
                  <span>Task study</span>
                  <span className="text-[#5B736A]">12 timed finds</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Synthesis</span>
                  <span className="text-[#5B736A]">3 themes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="solution" className="scroll-mt-8">
          <h3 className="text-[1.375rem] font-semibold tracking-tight text-[#14352C]">
            {solution.title}
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-[17px] leading-[1.65] text-[#3a3a3c]">
              {solution.body[0]}
            </p>
          </div>

          <div className="mt-6">
            <AnalyticsSolutionExample />
          </div>
        </section>

        <section id="outcome" className="scroll-mt-8">
          <h3 className="text-[1.375rem] font-semibold tracking-tight text-[#14352C]">
            {outcome.title}
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-[17px] leading-[1.65] text-[#3a3a3c]">
              {outcome.body[0]}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: "<45s", label: "Time to key metric" },
              { value: "+24%", label: "Weekly active users" },
              { value: "Fewer", label: "Standup chart requests" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-[#D2DED8] bg-white px-5 py-5"
              >
                <p className="font-[family-name:var(--font-analytics-serif)] text-[28px] leading-none text-[#14352C]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] text-[#5B736A]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function FlowPill({
  label,
  tone = "dark",
}: {
  label: string;
  tone?: "dark" | "accent";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap ${
        tone === "accent"
          ? "bg-[#D8FF3E] text-black"
          : "bg-black text-white"
      }`}
    >
      {label}
    </span>
  );
}

function SearchUserFlows() {
  const branches = [
    {
      hub: "search AI",
      nodes: ["ask question", "refine intent", "show matches", "why this fit"],
    },
    {
      hub: "results",
      nodes: ["list view", "grid view", "compare", "save item"],
    },
    {
      hub: "assist",
      nodes: ["similar finds", "under budget", "in stock now", "gift ideas"],
    },
    {
      hub: "explore",
      nodes: [
        "liked by people like you",
        "interesting nearby",
        "recently opened",
        "editor picks",
      ],
    },
  ];

  return (
    <div className="mt-8 overflow-x-auto pb-2">
      <div className="min-w-[640px] rounded-sm border border-[#D7DEE8] bg-[#F7F4EE] p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <FlowPill label="start" />
          <div className="h-px w-6 bg-black/70" />
          <FlowPill label="onboarding" />
        </div>

        <div className="mt-4 ml-4 border-l border-black/25 pl-4">
          <div className="flex flex-wrap gap-2">
            {branches.map((branch) => (
              <FlowPill key={branch.hub} label={branch.hub} tone="accent" />
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {branches.map((branch) => (
              <div key={branch.hub} className="space-y-2">
                <FlowPill label={branch.hub} tone="accent" />
                <div className="ml-3 space-y-2 border-l border-black/20 pl-3">
                  {branch.nodes.map((node) => (
                    <div key={node}>
                      <FlowPill label={node} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchSolution() {
  return (
    <div className="mt-8 overflow-hidden rounded-none border border-[#D7DEE8] bg-white">
      <div className="border-b border-[#D7DEE8] bg-[#0B1F3A] px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#8EB8B2] uppercase">
            Search AI
          </p>
          <span className="rounded-none bg-[#D8FF3E] px-2.5 py-1 text-[10px] font-semibold text-black">
            Live assist
          </span>
        </div>
        <div className="mt-4 rounded-none bg-white/10 px-4 py-3.5">
          <p className="text-[13px] leading-relaxed text-[#E8F7F5]">
            “Find a linen midi dress under $80 for a warm weekend trip.”
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Natural fabric",
            "Midi length",
            "Under $80",
            "Packable",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-none border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-[#D7E8E4]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-0 px-0 py-0">
        <div className="border-b border-[#D7DEE8] px-5 py-3">
          <p className="text-[12px] text-[#66758A]">
            AI ranked 3 strong matches and explained why each one fits.
          </p>
        </div>

        {[
          {
            title: "Soft linen midi",
            price: "$64",
            reason: "Matches fabric, length, and budget in one pick.",
          },
          {
            title: "Daylight wrap dress",
            price: "$72",
            reason: "Breathable for warm weather and travel packing.",
          },
          {
            title: "Coastal shift",
            price: "$58",
            reason: "Closest under-budget option still in stock.",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="flex items-start gap-3 border-b border-[#D7DEE8] px-5 py-3.5"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-none bg-[#0B1F3A] text-[11px] font-semibold text-white">
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[13px] font-semibold text-[#0B1F3A]">
                  {item.title}
                </p>
                <p className="shrink-0 text-[13px] tabular-nums text-[#0B1F3A]">
                  {item.price}
                </p>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-[#66758A]">
                {item.reason}
              </p>
            </div>
          </div>
        ))}

        <div className="border-t border-[#D7DEE8] bg-[#F4F7FB] px-5 py-3.5 text-[12px] text-[#334155]">
          Ask follow-up: “Show only items I can return free.”
        </div>
      </div>
    </div>
  );
}

function SearchCaseStudy({
  example,
}: {
  example: Extract<CaseStudyExample, { layout: "search" }>;
}) {
  return (
    <article
      className="mx-auto w-full bg-[#F4F7FB] font-[family-name:var(--font-search-sans)] text-[#0B1F3A]"
      style={{ maxWidth: CASE_STUDY_FRAME.width }}
    >
      <header
        className="relative overflow-hidden border-b border-[#D7DEE8] bg-[#0B1F3A] text-[#E8F7F5]"
        style={{
          paddingLeft: CASE_STUDY_FRAME.paddingX,
          paddingRight: CASE_STUDY_FRAME.paddingX,
          paddingTop: CASE_STUDY_FRAME.paddingY,
          paddingBottom: 48,
        }}
      >
        <div className="absolute -top-10 -right-10 size-40 rounded-full bg-[#3DDC97]/15 blur-2xl" />
        <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8EB8B2] uppercase">
          Case study
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-search-display)] text-[2rem] leading-[1.12] tracking-tight text-balance sm:text-[2.4rem]">
          {example.title}
        </h1>
        <p className="mt-5 max-w-[30em] text-[16px] leading-relaxed text-[#B7CCC8]">
          {example.subtitle}
        </p>
      </header>

      <div
        style={{
          paddingLeft: CASE_STUDY_FRAME.paddingX,
          paddingRight: CASE_STUDY_FRAME.paddingX,
          paddingTop: 56,
          paddingBottom: CASE_STUDY_FRAME.paddingY,
        }}
      >
        <div className="flex flex-col gap-16">
          {example.sections.map((section) => (
            <section
              key={`${example.id}-${section.id}`}
              id={section.id}
              className="scroll-mt-8"
            >
              <div className="mb-4 inline-flex rounded-full bg-[#0B1F3A] px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-[#E8F7F5] uppercase">
                {section.title}
              </div>
              <div className="max-w-[38em]">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[16px] leading-[1.7] text-[#334155]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.id === "research" ? <SearchUserFlows /> : null}
              {section.id === "solution" ? <SearchSolution /> : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

const ONBOARDING_PAGES = [
  { id: "case-study", label: "Case study" },
  { id: "title-reveal", label: "Title reveal" },
  { id: "design-process", label: "Design process" },
] as const;

type OnboardingPageId = (typeof ONBOARDING_PAGES)[number]["id"];

function OnboardingCaseStudyContent({
  example,
  pageId,
  structureFaded,
}: {
  example: Extract<CaseStudyExample, { layout: "onboarding" }>;
  pageId: OnboardingPageId;
  structureFaded: boolean;
}) {
  const isTitleReveal = pageId === "title-reveal";
  const isDesignProcess = pageId === "design-process";
  const usesRevealLayout = isTitleReveal || isDesignProcess;
  const pageLabel = "Case study";
  const showFaded = isTitleReveal && structureFaded;
  const fadedContent = [
    "transition-[opacity,filter] duration-500 ease-out will-change-[opacity,filter]",
    showFaded
      ? "opacity-[0.16] blur-[0.2px] pointer-events-none select-none"
      : "opacity-100 blur-0",
  ].join(" ");

  return (
    <article className="min-w-0 flex-1 bg-white">
      {usesRevealLayout ? null : (
        <header
          className="border-b border-black/5"
          style={{
            paddingLeft: CASE_STUDY_FRAME.paddingX,
            paddingRight: CASE_STUDY_FRAME.paddingX,
            paddingTop: CASE_STUDY_FRAME.paddingY,
            paddingBottom: 40,
          }}
        >
          <p className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
            {pageLabel}
          </p>
          <h1 className="mt-2 text-[2rem] leading-tight font-semibold tracking-tight text-foreground sm:text-[2.5rem]">
            {example.title}
          </h1>
          <p className="mt-3 max-w-[34em] text-[17px] leading-relaxed text-muted-foreground">
            {example.subtitle}
          </p>
        </header>
      )}

      <div
        style={{
          paddingLeft: CASE_STUDY_FRAME.paddingX,
          paddingRight: CASE_STUDY_FRAME.paddingX,
          paddingTop: usesRevealLayout ? CASE_STUDY_FRAME.paddingY : 48,
          paddingBottom: usesRevealLayout ? 36 : CASE_STUDY_FRAME.paddingY,
        }}
      >
        <div
          className={`flex flex-col transition-[gap] duration-500 ${
            usesRevealLayout ? "gap-8" : "gap-14"
          }`}
        >
          {example.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-8"
            >
              <h2 className="text-[1.375rem] font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <div className={`mt-4 flex flex-col gap-4 ${fadedContent}`}>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[17px] leading-[1.65] text-[#3a3a3c]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.id === "research" ? (
                <div className={fadedContent}>
                  <OnboardingResearch
                    persona={example.persona}
                    stickyNotes={example.stickyNotes}
                    compact={usesRevealLayout}
                  />
                </div>
              ) : null}
              {section.id === "solution" ? (
                <div className={fadedContent}>
                  <OnboardingSolution
                    label={example.flowLabel}
                    screens={example.flowScreens}
                    compact={usesRevealLayout}
                  />
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

function OnboardingCaseStudy({
  example,
}: {
  example: Extract<CaseStudyExample, { layout: "onboarding" }>;
}) {
  const [activePage, setActivePage] =
    useState<OnboardingPageId>("case-study");
  const [structureFaded, setStructureFaded] = useState(false);
  const isTitleReveal = activePage === "title-reveal";

  const handlePageChange = (pageId: OnboardingPageId) => {
    setActivePage(pageId);
    if (pageId !== "title-reveal") {
      setStructureFaded(false);
    }
  };

  return (
    <div className="relative w-full bg-white">
      <nav
        className="absolute top-0 left-0 z-10 hidden w-[168px] px-3 py-8 sm:block"
        aria-label="Onboarding pages"
      >
        <p className="px-2 text-[11px] font-medium tracking-[0.12em] text-[#8E8E93] uppercase">
          Pages
        </p>
        <ul className="mt-3 space-y-0.5">
          {ONBOARDING_PAGES.map((page) => {
            const active = page.id === activePage;
            return (
              <li key={page.id}>
                <button
                  type="button"
                  onClick={() => handlePageChange(page.id)}
                  className={`w-full rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                    active
                      ? "bg-[#F2F2F7] font-medium text-[#1C1C1E]"
                      : "text-[#636366] hover:bg-[#F7F7F8] hover:text-[#1C1C1E]"
                  }`}
                >
                  {page.label}
                </button>
              </li>
            );
          })}
        </ul>

        {isTitleReveal ? (
          <div className="mt-6 border-t border-black/[0.06] px-0.5 pt-4">
            <p className="px-2 text-[11px] font-medium tracking-[0.12em] text-[#8E8E93] uppercase">
              Animation
            </p>
            <button
              type="button"
              onClick={() => setStructureFaded((value) => !value)}
              aria-pressed={structureFaded}
              className={`mt-2 w-full rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                structureFaded
                  ? "bg-[#1C1C1E] font-medium text-white"
                  : "bg-[#F2F2F7] font-medium text-[#1C1C1E] hover:bg-[#E8E8ED]"
              }`}
            >
              {structureFaded ? "Show content" : "Fade content"}
            </button>
          </div>
        ) : null}
      </nav>

      <div className="border-b border-black/[0.06] px-4 pt-4 sm:hidden">
        <div className="flex flex-wrap gap-1">
          {ONBOARDING_PAGES.map((page) => {
            const active = page.id === activePage;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => handlePageChange(page.id)}
                className={`rounded-lg px-3 py-2 text-[13px] ${
                  active
                    ? "bg-[#F2F2F7] font-medium text-[#1C1C1E]"
                    : "text-[#636366]"
                }`}
              >
                {page.label}
              </button>
            );
          })}
        </div>
        {isTitleReveal ? (
          <button
            type="button"
            onClick={() => setStructureFaded((value) => !value)}
            aria-pressed={structureFaded}
            className={`mt-2 mb-3 rounded-lg px-3 py-2 text-[13px] font-medium ${
              structureFaded
                ? "bg-[#1C1C1E] text-white"
                : "bg-[#F2F2F7] text-[#1C1C1E]"
            }`}
          >
            {structureFaded ? "Show content" : "Fade content"}
          </button>
        ) : null}
      </div>

      <div
        className="mx-auto w-full"
        style={{ maxWidth: CASE_STUDY_FRAME.width }}
      >
        <OnboardingCaseStudyContent
          example={example}
          pageId={activePage}
          structureFaded={structureFaded}
        />
      </div>
    </div>
  );
}

export function CaseStudy({
  activeId = EXAMPLES[0].id,
}: {
  activeId?: string;
}) {
  const example =
    EXAMPLES.find((item) => item.id === activeId) ?? EXAMPLES[0];

  if (example.layout === "analytics") {
    return <AnalyticsCaseStudy example={example} />;
  }

  if (example.layout === "search") {
    return <SearchCaseStudy example={example} />;
  }

  return <OnboardingCaseStudy example={example} />;
}
