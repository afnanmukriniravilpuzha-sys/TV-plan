import Link from "next/link";

import { CountdownBox, GoldText, PulseSeparator } from "@/components/primitives";
import { NowShowingCard } from "@/components/now-showing-card";
import { Reveal } from "./reveal";
import {
  findCurrentSlotIndex,
  formatCountdown,
  scheduleData,
  toSeconds,
} from "@/lib/schedule";

// Deterministic mid-session snapshot (10:15 AM) so the preview is stable.
const SNAP_SECONDS = toSeconds("10:15:00");
const currentIndex = findCurrentSlotIndex(SNAP_SECONDS);
const current = scheduleData[currentIndex];
const slotCountdown = formatCountdown(toSeconds(current.endTime) - SNAP_SECONDS);

export function LandingHero() {
  return (
    <section id="top" className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 text-center sm:px-6 sm:py-24 lg:flex-row lg:text-left">
      <div className="flex-1">
        <Reveal>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] sm:text-sm">
            Live presentation board
          </p>
        </Reveal>
        <Reveal delayMs={80}>
          <h1 className="font-serif text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            <GoldText>Run student presentations on the big screen.</GoldText>
          </h1>
        </Reveal>
        <Reveal delayMs={160}>
          <p className="mt-5 max-w-xl text-base text-[#a0a0c0] sm:text-lg lg:max-w-lg">
            TV Plan turns your session schedule into a live TV display — session
            countdowns, per-batch timing, and one-glance status for every project.
          </p>
        </Reveal>
        <Reveal delayMs={240}>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/"
              className="rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d060)] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#050510] shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow hover:shadow-[0_0_45px_rgba(212,175,55,0.6)]"
            >
              Start a session
            </Link>
            <a
              href="#schedule"
              className="rounded-full border border-[rgba(138,92,246,0.4)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#a78bfa] transition-colors hover:bg-[rgba(138,92,246,0.1)]"
            >
              View the schedule
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delayMs={200} className="w-full max-w-md flex-1">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(138,92,246,0.25),transparent_70%)] blur-2xl"
          />
          <div className="relative rotate-1 rounded-[28px] border border-[rgba(212,175,55,0.25)] bg-[linear-gradient(160deg,#0a0a1a,#120a2e)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:rotate-0 motion-reduce:rotate-0 sm:p-6">
            <NowShowingCard
              presenter={{
                student: current.student,
                detail: `Project #${current.project} | ${current.batch}`,
              }}
            />
            <div className="mt-4 flex items-start justify-center gap-2.5 sm:gap-4">
              <CountdownBox variant="card" value={slotCountdown.hours} label="Hours" />
              <PulseSeparator className="text-3xl sm:text-5xl" />
              <CountdownBox variant="card" value={slotCountdown.minutes} label="Minutes" />
              <PulseSeparator className="text-3xl sm:text-5xl" />
              <CountdownBox variant="card" value={slotCountdown.seconds} label="Seconds" />
            </div>
            <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#606080]">
              Preview — live board at 10:15 AM
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
