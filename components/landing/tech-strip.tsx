export function TechStrip() {
  return (
    <section aria-label="Technology" className="border-y border-[rgba(212,175,55,0.12)] bg-[rgba(255,255,255,0.02)]">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-5 font-mono text-xs text-[#606080] sm:px-6 sm:text-sm">
        <span>Next.js</span>
        <span aria-hidden="true" className="text-[#d4af37]">/</span>
        <span>React</span>
        <span aria-hidden="true" className="text-[#d4af37]">/</span>
        <span>TypeScript</span>
        <span aria-hidden="true" className="text-[#d4af37]">/</span>
        <span>Tailwind</span>
      </p>
    </section>
  );
}
