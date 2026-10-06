import { CountdownBox, PulseSeparator } from "./primitives";
import type { Countdown } from "@/lib/schedule";

export function SlotCountdownCard({
  countdown,
  progress,
}: {
  countdown: Countdown;
  progress: number;
}) {
  const percent = Math.round(progress);

  return (
    <section className="relative shrink-0 overflow-hidden rounded-[25px] border-2 border-[rgba(212,175,55,0.3)] bg-[linear-gradient(145deg,#1a1a3e,#0f0f2a)] px-6 py-5 text-center shadow-[0_15px_50px_rgba(212,175,55,0.1),inset_0_0_30px_rgba(212,175,55,0.03)] sm:px-8 sm:py-5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,transparent,#d4af37,transparent)]"
      />

      <h2 className="mb-4 font-serif text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] sm:text-base sm:tracking-[0.2em]">
        Current Slot Ends In
      </h2>

      <div className="flex items-start justify-center gap-2.5 sm:gap-4">
        <CountdownBox variant="card" value={countdown.hours} label="Hours" />
        <PulseSeparator className="text-3xl sm:text-5xl" />
        <CountdownBox variant="card" value={countdown.minutes} label="Minutes" />
        <PulseSeparator className="text-3xl sm:text-5xl" />
        <CountdownBox variant="card" value={countdown.seconds} label="Seconds" />
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#a0a0c0] sm:text-sm">
          <span>Slot Progress</span>
          <span className="tabular-nums">{percent}%</span>
        </div>

        <div
          role="progressbar"
          aria-label="Slot progress"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-3.5 w-full overflow-hidden rounded-[10px] border border-[rgba(212,175,55,0.1)] bg-white/5"
        >
          <div
            className="h-full rounded-[10px] bg-[linear-gradient(90deg,#b8860b,#d4af37,#f5d060)] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-[width] duration-1000 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}