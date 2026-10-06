import { CountdownBox, GoldText, PulseSeparator } from "./primitives";
import type { Countdown } from "@/lib/schedule";

export function TopCountdownBanner({ countdown }: { countdown: Countdown }) {
  return (
    <section className="relative border-b-2 border-[#d4af37] bg-[linear-gradient(90deg,#1a0a2e,#2d1b4e,#1a0a2e)] px-4 py-5 shadow-[0_8px_40px_rgba(212,175,55,0.15)] sm:px-10 sm:py-4">
      <div
        aria-hidden="true"
        className="absolute inset-x-[10%] bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent)]"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 lg:flex-row lg:gap-10">
        <GoldText className="text-center font-serif text-lg font-extrabold uppercase tracking-[0.25em] sm:text-2xl sm:tracking-[0.3em]">
          Session Ends In
        </GoldText>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <CountdownBox variant="banner" value={countdown.hours} label="Hours" />
          <PulseSeparator className="text-4xl sm:text-6xl" />
          <CountdownBox variant="banner" value={countdown.minutes} label="Minutes" />
          <PulseSeparator className="text-4xl sm:text-6xl" />
          <CountdownBox variant="banner" value={countdown.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}