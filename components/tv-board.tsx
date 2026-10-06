"use client";

import { useMemo } from "react";

import { BatchTimingCard } from "./batch-timing-card";
import { FooterBar } from "./footer-bar";
import { HeaderBar } from "./header-bar";
import { NowShowingCard } from "./now-showing-card";
import { ScheduleTable } from "./schedule-table";
import { SlotCountdownCard } from "./slot-countdown-card";
import { TopCountdownBanner } from "./top-countdown-banner";
import { buildBoardState, INITIAL_STATE } from "@/lib/board";
import { useNow } from "@/lib/use-now";

export function TvBoard() {
  const now = useNow(1000);

  // Everything the UI needs is derived from one Date, so all panels stay in sync.
  const state = useMemo(() => (now ? buildBoardState(now) : INITIAL_STATE), [now]);

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[linear-gradient(160deg,#0a0a1a_0%,#0d0d2b_30%,#120a2e_60%,#0a0a1a_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,175,55,0.03)_0%,transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(138,43,226,0.03)_0%,transparent_50%)]"
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <TopCountdownBanner countdown={state.sessionCountdown} />

        <HeaderBar />

        <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-5 sm:px-10 sm:py-6 xl:flex-row xl:gap-8">
          <ScheduleTable rows={state.rows} />

          <div className="flex min-h-0 flex-col gap-5 xl:flex-1 xl:overflow-y-auto sm:gap-6">
            <NowShowingCard presenter={state.presenter} />
            <SlotCountdownCard countdown={state.slotCountdown} progress={state.progress} />
            <BatchTimingCard batches={state.batches} />
          </div>
        </main>

        <FooterBar clock={state.clock} />
      </div>
    </div>
  );
}