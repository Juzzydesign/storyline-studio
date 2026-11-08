"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { RecordingStage } from "@/components/studio/recording-stage";

const ANIMATION_PAGES = [
  { id: "classic-framework", label: "Classic Framework" },
  { id: "design-process", label: "Design Process" },
  { id: "hiring-question", label: "Hiring Question" },
  { id: "three-stories", label: "3 Stories" },
  { id: "case-studies", label: "Case studies" },
] as const;

type AnimationPageId = (typeof ANIMATION_PAGES)[number]["id"];

const FRAMEWORK_STEPS = [
  { label: "Problem", tone: "bg-[#FF7B5A]" },
  { label: "Approach", tone: "bg-[#C0D6FF]" },
  { label: "Ideation", tone: "bg-[#F2B8EB]" },
  { label: "Solution", tone: "bg-[#F4AF2C]" },
  { label: "Outcome", tone: "bg-[#D9C2FF]" },
] as const;

const SCENE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SCENE_TITLE_CLASS =
  "text-[2rem] leading-[1.12] font-light tracking-[-0.035em] sm:text-[2.35rem]";
const SCENE_CARD_TEXT =
  "text-[1.35rem] leading-[1.2] font-medium tracking-[-0.03em] text-[#1E053A] sm:text-[1.5rem]";
const SCENE_CARD_SHADOW =
  "0 1px 1px rgba(30,5,58,0.03), 0 18px 40px rgba(30,5,58,0.06)";
const SCENE_SOFT_SHADOW =
  "0 1px 1px rgba(30,5,58,0.03), 0 12px 28px rgba(30,5,58,0.05)";

const TIMELINE_COLS = 12;

const TIMELINE_BARS = [
  {
    label: "Problem",
    tone: "bg-[#FF7B5A]/40 text-[#1E053A]",
    row: 1,
    start: 1,
    span: 3,
  },
  {
    label: "Approach",
    tone: "bg-[#FF7B5A]/65 text-[#1E053A]",
    row: 2,
    start: 3,
    span: 3,
  },
  {
    label: "Ideation",
    tone: "bg-[#1E053A] text-white",
    row: 3,
    start: 5,
    span: 3,
  },
  {
    label: "Solution",
    tone: "bg-[#1E053A] text-white",
    row: 4,
    start: 7,
    span: 3,
  },
  {
    label: "Outcome",
    tone: "bg-gradient-to-r from-[#F2B8EB] via-[#D9C2FF] to-[#C0D6FF] text-[#1E053A]",
    row: 5,
    start: 9,
    span: 3,
  },
] as const;

function FrameworkRow({
  animated,
  playing,
  showConnectors = true,
}: {
  animated: boolean;
  playing: boolean;
  showConnectors?: boolean;
}) {
  return (
    <div
      className={`relative z-10 flex w-full max-w-[1040px] items-center px-1 ${
        showConnectors ? "gap-0" : "gap-4 sm:gap-5"
      }`}
    >
      {FRAMEWORK_STEPS.map((step, index) => {
        const beat = 280;
        const cardDelay = 900 + index * beat;
        const arrowDelay = cardDelay + 140;
        const show = !animated || playing;

        return (
          <div key={step.label} className="contents">
            <div
              className={`${step.tone} flex min-h-[148px] min-w-0 flex-1 items-center justify-center rounded-[16px] px-4 py-8 text-center sm:min-h-[168px] sm:px-5 sm:py-10 ${
                animated
                  ? `transition-all duration-[1100ms] ${
                      show
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }`
                  : ""
              }`}
              style={
                animated
                  ? {
                      transitionDelay: playing ? `${cardDelay}ms` : "0ms",
                      transitionTimingFunction: SCENE_EASE,
                      boxShadow: show ? SCENE_CARD_SHADOW : "none",
                    }
                  : { boxShadow: SCENE_CARD_SHADOW }
              }
            >
              <p className={SCENE_CARD_TEXT}>{step.label}</p>
            </div>

            {showConnectors && index < FRAMEWORK_STEPS.length - 1 ? (
              <div
                className={`mx-2 flex shrink-0 items-center justify-center sm:mx-2.5 ${
                  animated
                    ? `transition-all duration-[700ms] ${
                        show
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`
                    : ""
                }`}
                style={
                  animated
                    ? {
                        transitionDelay: playing ? `${arrowDelay}ms` : "0ms",
                        transitionTimingFunction: SCENE_EASE,
                      }
                    : undefined
                }
                aria-hidden
              >
                <ArrowRight
                  className="size-5 text-[#1E053A] sm:size-6"
                  strokeWidth={2}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function SceneGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] opacity-85"
      style={{
        background:
          "radial-gradient(ellipse 52% 78% at 12% 100%, rgba(255, 123, 90, 0.38) 0%, transparent 72%), radial-gradient(ellipse 48% 72% at 88% 100%, rgba(176, 204, 255, 0.42) 0%, transparent 72%), radial-gradient(ellipse 42% 68% at 38% 110%, rgba(180, 140, 255, 0.4) 0%, transparent 68%), radial-gradient(ellipse 40% 62% at 62% 108%, rgba(242, 184, 235, 0.32) 0%, transparent 68%)",
        filter: "blur(34px)",
      }}
    />
  );
}

function FrameworkScene({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-[#F8F8F6] px-8 pt-[16%] font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-12 sm:pt-[14%]">
      <div className="relative z-10 max-w-[720px] text-center">
        <p
          className={`${SCENE_TITLE_CLASS} transition-all duration-[1200ms] ${
            playing ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionTimingFunction: SCENE_EASE }}
        >
          The classic framework
        </p>
      </div>

      <div className="relative z-10 mt-14 flex w-full justify-center sm:mt-16">
        <FrameworkRow animated playing={playing} />
      </div>

      <SceneGradient />
    </div>
  );
}

const HIRING_POPOUTS = [
  { label: "Your decisions?", tone: "bg-[#FF7B5A]", delay: 900 },
  { label: "Your trade-offs?", tone: "bg-[#C0D6FF]", delay: 1180 },
  { label: "Your contributions?", tone: "bg-[#F2B8EB]", delay: 1460 },
] as const;

const STORY_ITEMS = [
  {
    number: "01",
    label: "Business needs vs. user needs",
    tone: "bg-[#FF7B5A]",
    delay: 900,
  },
  {
    number: "02",
    label: "Conflicting directions",
    tone: "bg-[#C0D6FF]",
    delay: 1900,
  },
  {
    number: "03",
    label: "Scalable solution",
    tone: "bg-[#F2B8EB]",
    delay: 2900,
  },
] as const;

function ThreeStoriesScene({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full justify-end overflow-hidden bg-[#F8F8F6] font-[family-name:var(--font-storyline-sans)] text-[#1E053A]">
      <div className="relative z-10 flex h-full w-1/3 flex-col justify-center px-6 sm:px-8">
        <p
          className={`${SCENE_TITLE_CLASS} text-center transition-all duration-[1200ms] ${
            playing ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionTimingFunction: SCENE_EASE }}
        >
          Three stories
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:gap-4">
          {STORY_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`${item.tone} flex min-h-[72px] items-center gap-4 rounded-[16px] px-5 py-5 text-left transition-all duration-[1400ms] sm:min-h-[84px] sm:gap-5 sm:px-6 ${
                playing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                boxShadow: playing ? SCENE_CARD_SHADOW : "none",
                transitionDelay: playing ? `${item.delay}ms` : "0ms",
                transitionTimingFunction: SCENE_EASE,
              }}
            >
              <span className="shrink-0 text-[13px] font-medium tracking-[-0.02em] text-[#1E053A] sm:text-[14px]">
                {item.number}
              </span>
              <p className="text-[1.05rem] leading-[1.25] font-medium tracking-[-0.03em] text-[#1E053A] sm:text-[1.2rem]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SceneGradient />
    </div>
  );
}

const CASE_STUDY_SECTIONS = [
  "The Problem",
  "The Research",
  "The Solution",
  "The Outcome",
] as const;

const CASE_STUDY_CONCEPTS = [
  {
    id: "onboarding",
    designer: "Designer A",
    heading: "Redesigning the onboarding experience",
    accent: "bg-[#C0D6FF]",
    delay: 200,
    asset: "flow" as const,
  },
  {
    id: "analytics",
    designer: "Designer B",
    heading: "Simplifying the analytics dashboard",
    accent: "bg-[#FF7B5A]",
    delay: 700,
    asset: "chart" as const,
  },
  {
    id: "search",
    designer: "Designer C",
    heading: "Rethinking marketplace search",
    accent: "bg-[#F2B8EB]",
    delay: 1200,
    asset: "search" as const,
  },
] as const;

function WireLine({ widthClass }: { widthClass: string }) {
  return (
    <div
      className={`h-2 rounded-full bg-[#1E053A]/12 ${widthClass}`}
      aria-hidden
    />
  );
}

function WireframeCopy({ lines = 3 }: { lines?: number }) {
  const widths = ["w-[92%]", "w-[78%]", "w-[86%]", "w-[64%]"];
  return (
    <div className="space-y-2" aria-hidden>
      {widths.slice(0, lines).map((widthClass) => (
        <WireLine key={widthClass} widthClass={widthClass} />
      ))}
    </div>
  );
}

function CaseStudyAsset({ kind }: { kind: "flow" | "chart" | "search" }) {
  if (kind === "flow") {
    return (
      <div className="flex items-end justify-between gap-1.5" aria-hidden>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="flex flex-1 flex-col overflow-hidden rounded-[10px] border border-[#1E053A]/10 bg-[#F8F8F6]"
          >
            <div className="flex h-3 items-center justify-center bg-[#1E053A]/[0.04]">
              <div className="h-1 w-5 rounded-full bg-[#1E053A]/15" />
            </div>
            <div className="space-y-1 px-1.5 py-2">
              <div className="h-1 w-6 rounded-full bg-[#1E053A]/15" />
              <div className="h-1 w-full rounded-full bg-[#1E053A]/10" />
              <div className="h-1 w-[70%] rounded-full bg-[#1E053A]/10" />
              <div className="mt-1.5 h-4 rounded-full bg-[#1E053A]/85" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "chart") {
    return (
      <div
        className="rounded-[12px] border border-[#1E053A]/10 bg-[#F8F8F6] px-2.5 py-2.5"
        aria-hidden
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="h-1.5 w-16 rounded-full bg-[#1E053A]/15" />
          <div className="h-1.5 w-8 rounded-full bg-[#1E053A]/10" />
        </div>
        <div className="flex h-16 items-end gap-1.5 px-0.5">
          {[42, 58, 46, 72, 54, 68, 80].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm bg-[#1E053A]/20"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-[12px] border border-[#1E053A]/10 bg-[#F8F8F6]"
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-[#1E053A]/08 px-2.5 py-2">
        <div className="size-2 rounded-full bg-[#1E053A]/20" />
        <div className="h-1.5 flex-1 rounded-full bg-[#1E053A]/12" />
      </div>
      <div className="space-y-2 px-2.5 py-2.5">
        {[88, 72, 80].map((width, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-5 shrink-0 rounded-md bg-[#1E053A]/10" />
            <div className="min-w-0 flex-1 space-y-1">
              <div
                className="h-1.5 rounded-full bg-[#1E053A]/15"
                style={{ width: `${width}%` }}
              />
              <div className="h-1.5 w-[55%] rounded-full bg-[#1E053A]/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudiesScene({
  playing,
  contentFaded,
}: {
  playing: boolean;
  contentFaded: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#F8F8F6] px-8 font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-12">
      <div className="relative z-10 grid w-full max-w-[1100px] grid-cols-3 items-stretch gap-4 sm:gap-5">
        {CASE_STUDY_CONCEPTS.map((study) => (
          <div
            key={study.id}
            className={`flex h-full flex-col transition-all duration-[700ms] ${
              playing
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              transitionDelay: playing ? `${study.delay}ms` : "0ms",
              transitionTimingFunction: SCENE_EASE,
            }}
          >
            <p className="mb-3 shrink-0 text-center text-[15px] font-medium tracking-[-0.03em] text-[#1E053A] sm:mb-4 sm:text-[16px]">
              {study.designer}
            </p>

            <div
              className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[16px] bg-white transition-[box-shadow] duration-500"
              style={{
                boxShadow: playing ? SCENE_CARD_SHADOW : "none",
              }}
            >
              <div
                className={`${study.accent} flex min-h-[88px] items-center px-5 py-4 sm:min-h-[96px] sm:px-5 sm:py-5`}
              >
                <p className="text-[1.05rem] leading-[1.2] font-medium tracking-[-0.03em] text-[#1E053A] sm:text-[1.15rem]">
                  {study.heading}
                </p>
              </div>

              <div
                className={`flex flex-col px-5 transition-[gap,padding] duration-500 ease-out sm:px-5 ${
                  contentFaded
                    ? "gap-4 py-4 sm:gap-4 sm:py-5"
                    : "gap-6 py-5 sm:gap-7 sm:py-6"
                }`}
              >
                {CASE_STUDY_SECTIONS.map((section) => (
                  <div key={section} className="space-y-2.5">
                    <p className="text-[12px] font-medium tracking-[-0.02em] text-[#1E053A] sm:text-[13px]">
                      {section}
                    </p>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                        contentFaded
                          ? "grid-rows-[0fr] opacity-0"
                          : "grid-rows-[1fr] opacity-100"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-2.5 pt-0">
                          <WireframeCopy lines={2} />
                          {section === "The Solution" ? (
                            <div className="pt-1">
                              <CaseStudyAsset kind={study.asset} />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SceneGradient />
    </div>
  );
}

function HiringQuestionScene({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-[#F8F8F6] px-8 pt-[16%] font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-12 sm:pt-[14%]">
      <div className="relative z-10 max-w-[720px] text-center">
        <p
          className={`${SCENE_TITLE_CLASS} transition-all duration-[1200ms] ${
            playing ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionTimingFunction: SCENE_EASE }}
        >
          What have I actually learned
          <br />
          <span className="text-[#1E053A]/55">about this designer?</span>
        </p>
      </div>

      <div className="relative z-10 mt-14 grid w-full max-w-[1040px] grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-5">
        {HIRING_POPOUTS.map((item) => (
          <div
            key={item.label}
            className={`${item.tone} relative flex min-h-[148px] items-center justify-center overflow-hidden rounded-[16px] px-6 py-7 text-center transition-all duration-[1100ms] sm:min-h-[168px] sm:px-7 sm:py-8 ${
              playing
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              boxShadow: playing ? SCENE_CARD_SHADOW : "none",
              transitionDelay: playing ? `${item.delay}ms` : "0ms",
              transitionTimingFunction: SCENE_EASE,
            }}
          >
            <p className={SCENE_CARD_TEXT}>{item.label}</p>
          </div>
        ))}
      </div>

      <SceneGradient />
    </div>
  );
}

const TIMELINE_LINES_DELAY_MS = 200;
const TIMELINE_PILLS_BASE_DELAY_MS = 1000;
const TIMELINE_PILL_STAGGER_MS = 420;
const TIMELINE_PILL_DURATION_MS = 1200;
const TIMELINE_PILL_EASE = "cubic-bezier(0.33, 0.1, 0.25, 1)";
const TIMELINE_TITLE_DELAY_MS =
  TIMELINE_PILLS_BASE_DELAY_MS +
  (TIMELINE_BARS.length - 1) * TIMELINE_PILL_STAGGER_MS +
  TIMELINE_PILL_DURATION_MS +
  120;

function DesignProcessScene({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-[#F8F8F6] px-6 pt-[16%] font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-10 sm:pt-[14%]">
      <div className="relative z-10 w-full max-w-[1040px]">
        <p
          className={`absolute inset-x-0 bottom-full mb-10 text-center ${SCENE_TITLE_CLASS} transition-all duration-[1200ms] sm:mb-12 ${
            playing ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{
            transitionDelay: playing ? `${TIMELINE_TITLE_DELAY_MS}ms` : "0ms",
            transitionTimingFunction: SCENE_EASE,
          }}
        >
          Design process
        </p>

        <div className="relative px-1 py-2 sm:px-2">
          <div
            className="pointer-events-none absolute inset-0 grid transition-opacity duration-[900ms]"
            style={{
              gridTemplateColumns: `repeat(${TIMELINE_COLS}, minmax(0, 1fr))`,
              opacity: playing ? 1 : 0,
              transitionDelay: playing ? `${TIMELINE_LINES_DELAY_MS}ms` : "0ms",
              transitionTimingFunction: SCENE_EASE,
            }}
            aria-hidden
          >
            {Array.from({ length: TIMELINE_COLS }, (_, index) => (
              <div
                key={index}
                className="border-l border-dashed border-[#1E053A]/10 first:border-l-0"
                style={{
                  transform: playing ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                  transition: `transform 800ms ${SCENE_EASE}`,
                  transitionDelay: playing
                    ? `${TIMELINE_LINES_DELAY_MS + index * 45}ms`
                    : "0ms",
                }}
              />
            ))}
          </div>

          <div
            className="relative grid gap-y-4"
            style={{
              gridTemplateColumns: `repeat(${TIMELINE_COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${TIMELINE_BARS.length}, minmax(0, auto))`,
            }}
          >
            {TIMELINE_BARS.map((bar, index) => (
              <div
                key={bar.label}
                className={`${bar.tone} relative flex h-12 items-center justify-center rounded-full px-5 text-center text-[15px] font-medium tracking-[-0.03em] sm:h-14 sm:text-[16px] ${
                  playing
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  gridColumn: `${bar.start} / span ${bar.span}`,
                  gridRow: bar.row,
                  boxShadow: playing ? SCENE_SOFT_SHADOW : "none",
                  transition: `opacity ${TIMELINE_PILL_DURATION_MS}ms ${TIMELINE_PILL_EASE}, transform ${TIMELINE_PILL_DURATION_MS}ms ${TIMELINE_PILL_EASE}, box-shadow ${TIMELINE_PILL_DURATION_MS}ms ${TIMELINE_PILL_EASE}`,
                  transitionDelay: playing
                    ? `${TIMELINE_PILLS_BASE_DELAY_MS + index * TIMELINE_PILL_STAGGER_MS}ms`
                    : "0ms",
                }}
              >
                {bar.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SceneGradient />
    </div>
  );
}

export function TextAnimationStudio() {
  const [activePage, setActivePage] =
    useState<AnimationPageId>("classic-framework");
  const [playing, setPlaying] = useState(false);
  const [contentFaded, setContentFaded] = useState(false);
  const isCaseStudies = activePage === "case-studies";

  const handlePageChange = (pageId: AnimationPageId) => {
    setActivePage(pageId);
    setPlaying(false);
    setContentFaded(false);
  };

  return (
    <div className="flex min-h-[calc(100dvh-57px)] bg-[#F8F8F6] font-[family-name:var(--font-storyline-sans)] text-[#1E053A]">
      <nav
        className="hidden w-[188px] shrink-0 border-r border-[#1E053A]/08 bg-[#F8F8F6] px-3 py-8 sm:block"
        aria-label="Text animation pages"
      >
        <p className="px-2 text-[11px] font-medium tracking-[0.12em] text-[#1E053A]/45 uppercase">
          Pages
        </p>
        <ul className="mt-3 space-y-0.5">
          {ANIMATION_PAGES.map((page) => {
            const active = page.id === activePage;
            return (
              <li key={page.id}>
                <button
                  type="button"
                  onClick={() => handlePageChange(page.id)}
                  className={`w-full rounded-full px-3 py-2 text-left text-[13px] transition-colors ${
                    active
                      ? "bg-[#1E053A] font-medium text-white"
                      : "text-[#1E053A]/65 hover:bg-[#1E053A]/05 hover:text-[#1E053A]"
                  }`}
                >
                  {page.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t border-[#1E053A]/08 px-0.5 pt-4">
          <p className="px-2 text-[11px] font-medium tracking-[0.12em] text-[#1E053A]/45 uppercase">
            Animation
          </p>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={playing}
            className={`mt-2 w-full rounded-full px-3 py-2 text-left text-[13px] transition-colors ${
              playing
                ? "bg-[#1E053A] font-medium text-white"
                : "border border-[#1E053A]/2 bg-transparent font-medium text-[#1E053A] hover:bg-[#1E053A]/05"
            }`}
          >
            {playing ? "Reset" : "Play"}
          </button>
          {isCaseStudies ? (
            <button
              type="button"
              onClick={() => setContentFaded((value) => !value)}
              aria-pressed={contentFaded}
              className={`mt-2 w-full rounded-full px-3 py-2 text-left text-[13px] transition-colors ${
                contentFaded
                  ? "bg-[#1E053A] font-medium text-white"
                  : "border border-[#1E053A]/2 bg-transparent font-medium text-[#1E053A] hover:bg-[#1E053A]/05"
              }`}
            >
              {contentFaded ? "Show content" : "Fade content"}
            </button>
          ) : null}
        </div>
      </nav>

      <div className="min-w-0 flex-1">
        <div className="flex gap-1 border-b border-[#1E053A]/08 bg-[#F8F8F6] px-4 pt-4 sm:hidden">
          {ANIMATION_PAGES.map((page) => {
            const active = page.id === activePage;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => handlePageChange(page.id)}
                className={`rounded-full px-3 py-2 text-[13px] ${
                  active
                    ? "bg-[#1E053A] font-medium text-white"
                    : "text-[#1E053A]/65"
                }`}
              >
                {page.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={playing}
            className={`mb-3 ml-auto rounded-full px-3 py-2 text-[13px] font-medium ${
              playing
                ? "bg-[#1E053A] text-white"
                : "border border-[#1E053A]/2 text-[#1E053A]"
            }`}
          >
            {playing ? "Reset" : "Play"}
          </button>
          {isCaseStudies ? (
            <button
              type="button"
              onClick={() => setContentFaded((value) => !value)}
              aria-pressed={contentFaded}
              className={`mb-3 rounded-full px-3 py-2 text-[13px] font-medium ${
                contentFaded
                  ? "bg-[#1E053A] text-white"
                  : "border border-[#1E053A]/2 text-[#1E053A]"
              }`}
            >
              {contentFaded ? "Show content" : "Fade content"}
            </button>
          ) : null}
        </div>

        <RecordingStage>
          {activePage === "classic-framework" ? (
            <FrameworkScene playing={playing} />
          ) : null}
          {activePage === "design-process" ? (
            <DesignProcessScene playing={playing} />
          ) : null}
          {activePage === "hiring-question" ? (
            <HiringQuestionScene playing={playing} />
          ) : null}
          {activePage === "three-stories" ? (
            <ThreeStoriesScene playing={playing} />
          ) : null}
          {activePage === "case-studies" ? (
            <CaseStudiesScene playing={playing} contentFaded={contentFaded} />
          ) : null}
        </RecordingStage>
      </div>
    </div>
  );
}
