import { ScheduleTable } from "@/components/schedule-table";
import {
  buildTableRows,
  findCurrentSlotIndex,
  toSeconds,
} from "@/lib/schedule";

// Same mid-session snapshot as the hero, so statuses read LIVE / completed.
const SNAP_SECONDS = toSeconds("10:15:00");
const rows = buildTableRows(SNAP_SECONDS, findCurrentSlotIndex(SNAP_SECONDS));

export function SchedulePreview() {
  return (
    <section id="schedule" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] sm:text-sm">
        The proof
      </p>
      <h2 className="font-serif text-2xl font-black text-white sm:text-4xl">
        The real schedule, live on screen
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[#a0a0c0] sm:text-base">
        Every slot renders exactly as the audience sees it — batch colors,
        durations, and automatic upcoming / live / completed status.
      </p>

      <div className="mt-8">
        <ScheduleTable rows={rows} />
      </div>
    </section>
  );
}
