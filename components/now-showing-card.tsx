import type { Presenter } from "@/lib/schedule";

export function NowShowingCard({ presenter }: { presenter: Presenter }) {
  return (
    <section className="relative shrink-0 overflow-hidden rounded-[25px] border-2 border-[rgba(138,43,226,0.3)] bg-[linear-gradient(145deg,#1a1a3e,#0f0f2a)] px-6 py-5 text-center shadow-[0_15px_50px_rgba(138,43,226,0.15),inset_0_0_30px_rgba(138,43,226,0.05)] sm:px-8 sm:py-5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,transparent,#8b5cf6,transparent)]"
      />

      <h2 className="mb-3 font-serif text-xs font-bold uppercase tracking-[0.25em] text-[#a78bfa] sm:text-base sm:tracking-[0.2em]">
        Now Presenting
      </h2>

      <p
        aria-live="polite"
        aria-atomic="true"
        className="bg-[linear-gradient(90deg,#fff,#e0e0ff)] bg-clip-text text-2xl font-extrabold text-transparent break-words sm:text-4xl"
      >
        {presenter.student}
      </p>
      <p className="mt-2 text-sm font-medium text-[#a78bfa] sm:text-lg">{presenter.detail}</p>
    </section>
  );
}