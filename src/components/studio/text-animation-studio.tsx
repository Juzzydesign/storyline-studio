"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { RecordingStage } from "@/components/studio/recording-stage";

const ANIMATION_PAGES = [
  { id: "classic-framework", label: "Classic Framework" },
  { id: "design-process", label: "Design Process" },
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
const CURVED_ARROW_LENGTH = 980;
const CURVE_DRAW_MS = 1800;
const CURVE_START_DELAY_MS = 160;
const END_ARROW_DELAY_MS = CURVE_START_DELAY_MS + CURVE_DRAW_MS;
const TITLE_DELAY_MS = END_ARROW_DELAY_MS + 80;

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
              <p className="font-[family-name:var(--font-storyline-sans)] text-[1.35rem] leading-tight font-bold tracking-[-0.02em] text-[#1E053A] sm:text-[1.65rem]">
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
        className={`relative z-10 font-[family-name:var(--font-storyline-serif)] text-[2.15rem] leading-none font-normal tracking-[-0.02em] transition-all duration-[1000ms] sm:text-[2.6rem] ${
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

function DesignProcessScene({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#F8F8F6] px-8 font-[family-name:var(--font-storyline-sans)] text-[#1E053A] sm:px-12">
      <div className="relative z-10 w-full max-w-[1180px]">
        <p
          className={`absolute inset-x-0 bottom-full mb-10 text-center font-[family-name:var(--font-storyline-serif)] text-[2.15rem] leading-none font-normal tracking-[-0.02em] transition-all duration-[1100ms] sm:mb-12 sm:text-[2.6rem] ${
            playing ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{
            transitionDelay: playing ? `${TITLE_DELAY_MS}ms` : "0ms",
            transitionTimingFunction: SCENE_EASE,
          }}
        >
          Design process
        </p>

        <FrameworkRow animated={false} playing={false} showConnectors={false} />

        <div
          className="pointer-events-none absolute inset-x-[5%] top-[calc(100%+10px)] sm:inset-x-[4%] sm:top-[calc(100%+14px)]"
          aria-hidden
        >
          <svg
            viewBox="0 0 1000 130"
            className="h-auto w-full overflow-visible"
            fill="none"
          >
            <path
              d="M 95 18 C 260 118, 740 118, 905 18"
              stroke="#1E053A"
              strokeWidth="3.25"
              strokeLinecap="butt"
              style={{
                strokeDasharray: CURVED_ARROW_LENGTH,
                strokeDashoffset: playing ? 0 : CURVED_ARROW_LENGTH,
                transition: `stroke-dashoffset ${CURVE_DRAW_MS}ms linear`,
                transitionDelay: playing ? `${CURVE_START_DELAY_MS}ms` : "0ms",
              }}
            />
          </svg>

          {/* Start arrow — anchored on the curve end */}
          <ArrowRight
            className="absolute size-6 text-[#1E053A] sm:size-7"
            strokeWidth={2.5}
            style={{
              left: "9.5%",
              top: "13.85%",
              opacity: playing ? 1 : 0,
              transform: "translate(-50%, -50%) rotate(-148deg)",
              transition: `opacity 280ms ${SCENE_EASE}`,
              transitionDelay: playing ? "0ms" : "0ms",
            }}
          />

          {/* End arrow — appears as the line reaches Outcome */}
          <ArrowRight
            className="absolute size-6 text-[#1E053A] sm:size-7"
            strokeWidth={2.5}
            style={{
              left: "90.5%",
              top: "13.85%",
              opacity: playing ? 1 : 0,
              transform: "translate(-50%, -50%) rotate(-32deg)",
              transition: playing
                ? "opacity 0ms linear"
                : `opacity 200ms ${SCENE_EASE}`,
              transitionDelay: playing ? `${END_ARROW_DELAY_MS}ms` : "0ms",
            }}
          />
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
        </RecordingStage>
      </div>
    </div>
  );
}
