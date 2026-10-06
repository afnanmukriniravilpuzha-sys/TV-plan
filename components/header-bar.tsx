import { GoldText } from "./primitives";

export function HeaderBar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-[rgba(212,175,55,0.2)] bg-[linear-gradient(90deg,#0f0f2a,#1a1a3e,#0f0f2a)] px-4 py-4 sm:px-10 sm:py-4">
      <GoldText className="font-serif text-xl font-black uppercase tracking-[0.2em] sm:text-3xl sm:tracking-[0.25em]">
        Student Project Plan
      </GoldText>

      <div className="flex shrink-0 items-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#8b0000,#dc143c,#8b0000)] px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(220,20,60,0.4)] animate-pulse-live sm:px-6 sm:py-2.5 sm:text-base">
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-white animate-blink sm:h-3.5 sm:w-3.5" />
        LIVE
      </div>
    </header>
  );
}