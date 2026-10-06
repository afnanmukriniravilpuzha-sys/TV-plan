import {
  SESSION_END,
  buildTableRows,
  findCurrentSlotIndex,
  findNextSlotIndex,
  formatClock,
  formatCountdown,
  formatTime12Hour,
  groupBatches,
  scheduleData,
  secondsOfDay,
  toSeconds,
  type ActiveBatchSummary,
  type Countdown,
  type Presenter,
  type TableRow,
} from "./schedule";

export type BoardState = {
  /** Time left until the session ends. */
  sessionCountdown: Countdown;
  /** Time left in the current slot. Zeroed when nothing is live. */
  slotCountdown: Countdown;
  presenter: Presenter;
  /** 0-100, how far through the current slot we are. */
  progress: number;
  rows: TableRow[];
  batches: ActiveBatchSummary[];
  clock: string;
};

const FIRST_START = toSeconds(scheduleData[0].startTime);
const LAST_END = toSeconds(scheduleData[scheduleData.length - 1].endTime);
const SESSION_END_SECONDS = toSeconds(SESSION_END);

/** The single place where a Date becomes everything the UI renders. */
export function buildBoardState(now: Date): BoardState {
  const nowSeconds = secondsOfDay(now);
  const currentIndex = findCurrentSlotIndex(nowSeconds);
  const activeBatch = currentIndex >= 0 ? scheduleData[currentIndex].batch : null;

  let slotCountdown = formatCountdown(0);
  // A day is not "done" until the last slot has actually finished.
  let progress = nowSeconds >= LAST_END ? 100 : 0;
  let presenter: Presenter;

  if (currentIndex >= 0) {
    const slot = scheduleData[currentIndex];
    const start = toSeconds(slot.startTime);
    const end = toSeconds(slot.endTime);
    const total = end - start;

    slotCountdown = formatCountdown(end - nowSeconds);
    progress =
      total > 0 ? Math.min(100, Math.max(0, ((nowSeconds - start) / total) * 100)) : 0;
    presenter = {
      student: slot.student,
      detail: `Project #${slot.project} | ${slot.batch}`,
    };
  } else if (nowSeconds < FIRST_START) {
    presenter = {
      student: "Starting Soon...",
      detail: `First presentation at ${formatTime12Hour(scheduleData[0].startTime)}`,
    };
  } else if (nowSeconds >= LAST_END) {
    presenter = {
      student: "Session Complete!",
      detail: "All presentations finished for today",
    };
  } else {
    // Only reachable when the schedule has a gap in it.
    const nextIndex = findNextSlotIndex(nowSeconds);
    const next = nextIndex >= 0 ? scheduleData[nextIndex] : undefined;
    presenter = next
      ? { student: "Up Next", detail: `${next.student} at ${formatTime12Hour(next.startTime)}` }
      : {
          student: "Session Complete!",
          detail: "All presentations finished for today",
        };
  }

  return {
    sessionCountdown: formatCountdown(SESSION_END_SECONDS - nowSeconds),
    slotCountdown,
    presenter,
    progress,
    rows: buildTableRows(nowSeconds, currentIndex),
    batches: groupBatches().map((batch) => ({ ...batch, isActive: batch.name === activeBatch })),
    clock: formatClock(now),
  };
}

/**
 * Rendered on the server and on the very first client paint, so the markup
 * matches and React never reports a hydration mismatch. Replaced by
 * `buildBoardState` on mount.
 */
export const EMPTY_COUNTDOWN: Countdown = { hours: "--", minutes: "--", seconds: "--" };

export const INITIAL_STATE: BoardState = {
  sessionCountdown: EMPTY_COUNTDOWN,
  slotCountdown: EMPTY_COUNTDOWN,
  presenter: { student: "Loading...", detail: "Project #--" },
  progress: 0,
  rows: buildTableRows(0, -1),
  batches: groupBatches().map((batch) => ({ ...batch, isActive: false })),
  clock: "--:--:--",
};