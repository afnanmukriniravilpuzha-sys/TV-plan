export function FooterBar({ clock }: { clock: string }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-[rgba(212,175,55,0.15)] bg-[linear-gradient(90deg,#0a0a1a,#1a1a3e,#0a0a1a)] px-4 py-3 sm:px-10 sm:py-4">
      <p className="text-[11px] font-medium text-[#606080] sm:text-sm">
        Student Project Presentation System | Batch Schedule 9:00:00 AM - 12:00:00 PM
      </p>
      <p className="bg-[linear-gradient(90deg,#d4af37,#f5d060)] bg-clip-text font-serif text-lg font-bold tabular-nums text-transparent sm:text-2xl">
        {clock}
      </p>
    </footer>
  );
}