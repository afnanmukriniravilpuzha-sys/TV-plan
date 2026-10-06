import { GoldText } from "@/components/primitives";
import { SESSION_END, SESSION_START, formatTime12Hour } from "@/lib/schedule";

export function SessionWindow() {
  return (
    <section id="session" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[24px] border-2 border-[rgba(212,175,55,0.25)] bg-[linear-gradient(90deg,#1a0a2e,#2d1b4e,#1a0a2e)] px-6 py-12 text-center shadow-[0_15px_50px_rgba(0,0,0,0.4)] sm:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent)]"
        />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] sm:text-sm">
          Session window
        </p>
        <p className="mt-4 font-serif text-3xl font-black sm:text-5xl">
          <GoldText>
            {formatTime12Hour(SESSION_START)} — {formatTime12Hour(SESSION_END)}
          </GoldText>
        </p>
        <p className="mt-4 text-sm text-[#a0a0c0] sm:text-base">
          Driven by SESSION_START / SESSION_END in lib/schedule.ts — one edit
          re-times the whole board.
        </p>
      </div>
    </section>
  );
}
