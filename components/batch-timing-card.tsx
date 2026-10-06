import { formatDuration, formatTime12Hour, type ActiveBatchSummary } from "@/lib/schedule";

export function BatchTimingCard({ batches }: { batches: ActiveBatchSummary[] }) {
  return (
    <section className="relative shrink-0 overflow-hidden rounded-[25px] border-2 border-[rgba(212,175,55,0.25)] bg-[linear-gradient(145deg,#1a1a3e,#0f0f2a)] px-6 py-4 shadow-[0_15px_50px_rgba(212,175,55,0.08),inset_0_0_30px_rgba(138,43,226,0.04)] sm:px-8 sm:py-5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,transparent,#d4af37,transparent)]"
      />

      <h2 className="mb-4 text-center font-serif text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] sm:text-base sm:tracking-[0.2em]">
        Batch Timing (9AM - 12PM)
      </h2>

      <div className="flex flex-col gap-2.5 sm:gap-3">
        {batches.map((batch) => (
          <div
            key={batch.name}
            className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-[15px] border-l-4 px-4 py-2.5 transition-all duration-300 ${
              batch.isActive
                ? "border-l-[#d4af37] bg-[linear-gradient(90deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))] shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                : "border-l-[#8b5cf6] bg-white/[0.03]"
            }`}
          >
            <span className="text-sm font-bold text-white sm:text-base">{batch.name}</span>
            <span className="text-xs font-bold tabular-nums text-[#f5d060] sm:text-sm">
              {formatTime12Hour(batch.startTime)} - {formatTime12Hour(batch.endTime)}
            </span>
            <span className="text-xs font-semibold tabular-nums text-[#c4b5fd]">
              ⏱ {formatDuration(batch.durationSeconds)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}