const STEPS = [
  {
    title: "Edit the schedule",
    body: "Open lib/schedule.ts and list each student, batch, project number, and time slot.",
  },
  {
    title: "Open the board",
    body: "Start the app, point the TV browser at it, and the live board boots instantly.",
  },
  {
    title: "Present — we handle the rest",
    body: "Countdowns, statuses, and progress update themselves as the session runs.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] sm:text-sm">
        Setup
      </p>
      <h2 className="font-serif text-2xl font-black text-white sm:text-4xl">
        How it works
      </h2>

      <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative md:px-8">
            {index > 0 && (
              <div
                aria-hidden="true"
                className="absolute top-5 right-full hidden h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)] md:block"
              />
            )}
            <div className="flex items-center gap-4 md:block">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[linear-gradient(145deg,#1a1a3e,#0f0f2a)] font-serif text-lg font-black text-[#f5d060]">
                {index + 1}
              </span>
              <h3 className="font-serif text-lg font-bold text-white md:mt-4">{step.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#a0a0c0]">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
