"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { RecordingStage } from "@/components/studio/recording-stage";

const ANIMATION_PAGES = [
  { id: "classic-framework", label: "Classic Framework" },
  { id: "design-process", label: "Design Process" },
  { id: "hiring-question", label: "Hiring Question" },
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

const TIMELINE_COLS = 12;

const TIMELINE_BARS = [
  {
    label: "Problem",
    tone: "bg-[#FF7B5A]/40 text-[#1E053A]",
    glow: "rgba(255, 123, 90, 0.35)",
    row: 1,
    start: 1,
    span: 3,
  },
  {
    label: "Approach",
    tone: "bg-[#FF7B5A]/65 text-[#1E053A]",
    glow: "rgba(255, 123, 90, 0.4)",
    row: 2,
    start: 3,
    span: 3,
  },
  {
    label: "Ideation",
    tone: "bg-[#1E053A] text-white",
    glow: "rgba(30, 5, 58, 0.28)",
    row: 3,
    start: 5,
    span: 3,
  },
  {
    label: "Solution",
    tone: "bg-[#1E053A] text-white",
    glow: "rgba(30, 5, 58, 0.28)",
    row: 4,
    start: 7,
    span: 3,
  },
  {
    label: "Outcome",
    tone: "bg-gradient-to-r from-[#F2B8EB] via-[#D9C2FF] to-[#C0D6FF] text-[#1E053A]",
    glow: "rgba(217, 194, 255, 0.55)",
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
      className={`relative z-10 flex w-full max-w-[1180px] items-center px-2 ${
        showConnectors ? "gap-0" : "gap-3 sm:gap-4"
      }`}
    >
      {FRAMEWORK_STEPS.map((step, index) => {
        const beat = 480;
        const cardDelay = 320 + index * beat * 2;
        const arrowDelay = cardDelay + beat;
        const show = !animated || playing;

        return (
          <div key={step.label} className="contents">
            <div
              className={`${step.tone} flex min-h-[140px] min-w-0 flex-1 items-center justify-center rounded-[18px] px-4 py-12 text-center sm:min-h-[168px] sm:px-5 sm:py-14 ${
                animated
                  ? `transition-all duration-[1000ms] ${
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
                    }
                  : undefined
              }
            >
              <p className="font-[family-name:var(--font-storyline-sans)] text-[1.35rem] leading-tight font-medium tracking-[-0.02em] text-[#1E053A] sm:text-[1.65rem]">
                {step.label}
              </p>
            </div>

            {showConnectors && index < FRAMEWORK_STEPS.length - 1 ? (
              <div
                className={`mx-2 flex shrink-0 items-center justify-center sm:mx-3 ${
                  animated
                    ? `transition-all duration-[700ms] ${
                        show
                          ? "scale-100 opacity-100"
                          : "scale-75 opacity-0"
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
                  className="size-6 text-[#1E053A] sm:size-7"
                  strokeWidth={2.5}
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
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#F8F8F6] px-8 font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-12">
      <p
        className={`relative z-10 font-[family-name:var(--font-storyline-sans)] text-[1.75rem] leading-none font-normal tracking-[-0.02em] transition-all duration-[1000ms] sm:text-[2rem] ${
          playing ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionTimingFunction: SCENE_EASE }}
      >
        The classic framework
      </p>

      <div className="relative z-10 mt-14 w-full max-w-[1180px]">
        <FrameworkRow animated playing={playing} />
      </div>

      <SceneGradient />
    </div>
  );
}

const HIRING_POPOUTS = [
  { label: "Your decisions?", tone: "bg-[#FF7B5A]", delay: 1100 },
  { label: "Your trade-offs?", tone: "bg-[#C0D6FF]", delay: 1600 },
  { label: "Your contributions?", tone: "bg-[#F2B8EB]", delay: 2100 },
] as const;

function HiringQuestionScene({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-[#F8F8F6] px-8 pt-[18%] font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-12 sm:pt-[16%]">
      <p
        className={`relative z-10 text-center font-[family-name:var(--font-storyline-sans)] text-[1.75rem] leading-[1.2] font-normal tracking-[-0.02em] transition-all duration-[1400ms] sm:text-[2rem] ${
          playing ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionTimingFunction: SCENE_EASE }}
      >
        What have I actually learned
        <br />
        about this designer?
      </p>

      <div className="relative z-10 mt-14 flex w-full max-w-[980px] items-center justify-center gap-4 sm:mt-16 sm:gap-6">
        {HIRING_POPOUTS.map((item) => (
          <div
            key={item.label}
            className={`${item.tone} flex min-h-[112px] min-w-0 flex-1 items-center justify-center rounded-[18px] px-4 py-10 text-center transition-all duration-[1100ms] sm:min-h-[132px] sm:px-5 sm:py-12 ${
              playing
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
            style={{
              transitionDelay: playing ? `${item.delay}ms` : "0ms",
              transitionTimingFunction: SCENE_EASE,
            }}
          >
            <p className="font-[family-name:var(--font-storyline-sans)] text-[1.25rem] leading-tight font-medium tracking-[-0.02em] text-[#1E053A] sm:text-[1.5rem]">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <SceneGradient />
    </div>
  );
}

const TIMELINE_LINES_DELAY_MS = 200;
const TIMELINE_PILLS_BASE_DELAY_MS = 1000;
const TIMELINE_TITLE_DELAY_MS =
  TIMELINE_PILLS_BASE_DELAY_MS + TIMELINE_BARS.length * 280 + 200;

function DesignProcessScene({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#F8F8F6] px-6 font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-10">
      <div className="relative z-10 w-full max-w-[1100px]">
        <p
          className={`absolute inset-x-0 bottom-full mb-10 text-center text-[1.75rem] leading-none font-normal tracking-[-0.02em] transition-all duration-[900ms] sm:mb-12 sm:text-[2rem] ${
            playing ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
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
                className="border-l border-dashed border-[#1E053A]/14 first:border-l-0"
                style={{
                  transform: playing ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                  transition: `transform 700ms ${SCENE_EASE}`,
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
                className={`${bar.tone} relative flex h-12 origin-left items-center justify-center rounded-full px-4 text-center text-[15px] font-medium tracking-[-0.02em] sm:h-14 sm:text-[17px] ${
                  playing
                    ? "translate-x-0 scale-x-100 opacity-100"
                    : "translate-x-2 scale-x-[0.7] opacity-0"
                }`}
                style={{
                  gridColumn: `${bar.start} / span ${bar.span}`,
                  gridRow: bar.row,
                  boxShadow: playing
                    ? `0 10px 28px ${bar.glow}, 0 1px 0 rgba(30,5,58,0.06)`
                    : "none",
                  transition: `opacity 800ms ${SCENE_EASE}, transform 800ms ${SCENE_EASE}, box-shadow 800ms ${SCENE_EASE}`,
                  transitionDelay: playing
                    ? `${TIMELINE_PILLS_BASE_DELAY_MS + index * 280}ms`
                    : "0ms",
                }}
              >
                <span
                  className={`absolute left-2.5 flex size-5 items-center justify-center rounded-full text-[10px] font-semibold sm:left-3 sm:size-6 sm:text-[11px] ${
                    bar.tone.includes("bg-[#1E053A]")
                      ? "bg-white/15 text-white"
                      : "bg-[#1E053A]/10 text-[#1E053A]"
                  }`}
                >
                  {index + 1}
                </span>
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

  const handlePageChange = (pageId: AnimationPageId) => {
    setActivePage(pageId);
    setPlaying(false);
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
        </RecordingStage>
      </div>
    </div>
  );
}
