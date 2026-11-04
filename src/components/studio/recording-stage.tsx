"use client";

/** YouTube landscape frame used for on-screen recording cuts. */
export const YOUTUBE_RECORDING = {
  width: 1920,
  height: 1080,
  label: "1920 × 1080 · 16:9",
} as const;

export function RecordingStage({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[calc(100dvh-57px)] flex-col items-center justify-center gap-3 bg-[#F8F8F6] px-4 py-6 sm:px-6">
      <div
        className="relative w-full overflow-hidden bg-[#F8F8F6] shadow-[0_8px_40px_rgba(30,5,58,0.08)] ring-1 ring-[#1E053A]/08"
        style={{
          aspectRatio: `${YOUTUBE_RECORDING.width} / ${YOUTUBE_RECORDING.height}`,
          maxWidth: "min(100%, calc((100dvh - 120px) * 16 / 9))",
          maxHeight: "calc(100dvh - 120px)",
        }}
        data-recording-canvas
      >
        {children ?? null}
      </div>
      <p className="text-[11px] font-medium tracking-[0.08em] text-[#1E053A]/45 uppercase">
        Recording frame · {YOUTUBE_RECORDING.label}
      </p>
    </div>
  );
}
