const FEATURES = [
  {
    title: "Live countdowns",
    body: "Session-end and per-slot countdowns tick every second, right on the TV.",
    icon: (
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Per-batch timing",
    body: "Batch 1/2/3 windows are summarized from the same data, so timings never drift apart.",
    icon: (
      <path d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "One-glance progress",
    body: "A gold progress bar shows exactly how far through the current slot you are.",
    icon: (
      <path d="M3 17l6-6 4 4 8-8M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Auto status",
    body: "Slots flip between upcoming, live, and completed without anyone touching the board.",
    icon: (
      <path d="M12 4v3m0 10v3m8-8h-3M7 12H4m13.07-5.07l-2.12 2.12M9.05 14.95l-2.12 2.12m0-11.31l2.12 2.12m5.9 5.9l2.12 2.12" strokeLinecap="round" />
    ),
  },
  {
    title: "Big-screen ready",
    body: "High-contrast gold on near-black, oversized type, and zero scrolling on a TV browser.",
    icon: (
      <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3m-6 0h7.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0016.5 4.5h-9a2.25 2.25 0 00-2.25 2.25v8A2.25 2.25 0 007.5 15z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Zero setup",
    body: "Edit one data file, open the board, and the TV is ready. No accounts, no config UI.",
    icon: (
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
] as const;

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] sm:text-sm">
        What you get
      </p>
      <h2 className="font-serif text-2xl font-black text-white sm:text-4xl">
        Everything on one screen
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[20px] border border-[rgba(212,175,55,0.15)] bg-[linear-gradient(145deg,#1a1a3e,#0f0f2a)] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.08)]">
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-[#f5d060]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                {feature.icon}
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#f5d060]">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a0a0c0]">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
