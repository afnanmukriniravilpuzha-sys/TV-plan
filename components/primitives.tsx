import type { ReactNode } from "react";

/** Gold gradient fill used for the big headline text. */
export const GOLD_TEXT = "bg-[linear-gradient(90deg,#d4af37,#f5d060,#d4af37)] bg-clip-text text-transparent";

/** Gold gradient fill used for the numerals in the countdown boxes. */
export const GOLD_TEXT_VERTICAL = "bg-[linear-gradient(180deg,#f5d060,#d4af37)] bg-clip-text text-transparent";

export function GoldText({ className = "", children }: { className?: string; children: ReactNode }) {
  return <span className={`${GOLD_TEXT} ${className}`}>{children}</span>;
}

export function PanelTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 font-serif text-lg font-bold uppercase tracking-[0.2em] text-[#d4af37] sm:text-2xl">
      <span
        aria-hidden="true"
        className="h-8 w-[5px] shrink-0 rounded-[3px] bg-[linear-gradient(180deg,#d4af37,#8b6914)] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
      />
      {children}
    </h2>
  );
}

const BOX_BASE = "relative overflow-hidden rounded-2xl border-2 text-center";

/**
 * `banner` = the big boxes in the top strip (shimmering, solid gold border).
 * `card`   = the flatter boxes in the "Current Slot Ends In" card.
 */
const BOX_VARIANTS = {
  banner: {
    box: "min-w-[104px] border-[#d4af37] bg-[linear-gradient(145deg,#1a1a3e,#0f0f2a)] px-5 py-4 shadow-[0_0_30px_rgba(212,175,55,0.2),inset_0_0_20px_rgba(212,175,55,0.05)] before:absolute before:-top-1/2 before:-left-1/2 before:h-[200%] before:w-[200%] before:bg-[linear-gradient(45deg,transparent,rgba(212,175,55,0.05),transparent)] before:animate-shimmer before:content-['']",
    value: "relative text-5xl leading-none font-black tabular-nums sm:text-5xl",
  },
  card: {
    box: "min-w-[86px] border-[rgba(212,175,55,0.25)] bg-[rgba(212,175,55,0.08)] px-4 py-3 sm:min-w-[96px]",
    value: "text-4xl leading-none font-black tabular-nums sm:text-4xl",
  },
} as const;

export function CountdownBox({
  value,
  label,
  variant,
}: {
  value: string;
  label: string;
  variant: keyof typeof BOX_VARIANTS;
}) {
  const styles = BOX_VARIANTS[variant];

  return (
    <div className={`${BOX_BASE} ${styles.box}`}>
      <div className={`${GOLD_TEXT_VERTICAL} font-serif ${styles.value}`}>{value}</div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0a0c0] sm:text-xs">
        {label}
      </div>
    </div>
  );
}

export function PulseSeparator({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${GOLD_TEXT_VERTICAL} self-center font-serif font-black animate-pulse-gold ${className}`}
    >
      :
    </span>
  );
}