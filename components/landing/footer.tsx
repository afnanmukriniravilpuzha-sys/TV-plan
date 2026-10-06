import { GoldText } from "@/components/primitives";

export function LandingFooter() {
  return (
    <footer className="border-t border-[rgba(212,175,55,0.15)] bg-[linear-gradient(90deg,#0a0a1a,#1a1a3e,#0a0a1a)] px-4 py-6 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#606080] sm:text-sm">
          <GoldText className="font-serif font-bold uppercase tracking-[0.15em]">TV Plan</GoldText>
          {" — student presentation schedule board"}
        </p>
        <p className="text-xs text-[#606080] sm:text-sm">
          Built for faculty coordinating live project presentations.
        </p>
      </div>
    </footer>
  );
}
