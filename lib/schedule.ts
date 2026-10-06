/**
 * Schedule data + pure time helpers.
 *
 * All comparisons work on "seconds since midnight" instead of `Date` objects
 * so there is no timezone / DST drift inside a single-day session.
 */

export type Slot = {
  batch: string;
  /** "HH:MM:SS" in 24-hour time */
  startTime: string;
  /** "HH:MM:SS" in 24-hour time */
  endTime: string;
  student: string;
  project: number;
};

// ---------------------------------------------------------------------------
// CONFIGURATION - edit this data for your plan
// ---------------------------------------------------------------------------

export const scheduleData: Slot[] = [
  { batch: "Batch 1", startTime: "09:00:00", endTime: "09:30:00", student: "Ahmed Khan", project: 1 },
  { batch: "Batch 1", startTime: "09:30:00", endTime: "10:00:00", student: "Sara Ali", project: 2 },
  { batch: "Batch 2", startTime: "10:00:00", endTime: "10:30:00", student: "Usman Malik", project: 3 },
  { batch: "Batch 2", startTime: "10:30:00", endTime: "11:00:00", student: "Fatima Noor", project: 4 },
  { batch: "Batch 3", startTime: "11:00:00", endTime: "11:30:00", student: "Hassan Raza", project: 5 },
  { batch: "Batch 3", startTime: "11:30:00", endTime: "12:00:00", student: "Ayesha Siddiqui", project: 6 },
];

export const SESSION_START = "09:00:00";
export const SESSION_END = "12:00:00";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Countdown = {
  hours: string;
  minutes: string;
  seconds: string;
};

export type SlotStatus = "upcoming" | "live" | "completed";

export type TableRow = Slot & {
  status: SlotStatus;
  durationSeconds: number;
  isCurrent: boolean;
  isCompleted: boolean;
};

export type BatchSummary = {
  name: string;
  startTime: string;
  endTime: string;
  durationSeconds: number;
};

export type ActiveBatchSummary = BatchSummary & {
  isActive: boolean;
};

export type Presenter = {
  student: string;
  detail: string;
};

// ---------------------------------------------------------------------------
// Time helpers
// ---------------------------------------------------------------------------

/** "09:30:00" -> 34200 */
export function toSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

/** A Date -> seconds since midnight */
export function secondsOfDay(date: Date): number {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

function pad(value: number): string {
  return String(Math.max(0, Math.floor(value))).padStart(2, "0");
}

/** Seconds -> zero-padded { hours, minutes, seconds }. Never goes negative. */
export function formatCountdown(totalSeconds: number): Countdown {
  const total = Math.max(0, Math.floor(totalSeconds));
  return {
    hours: pad(total / 3600),
    minutes: pad((total % 3600) / 60),
    seconds: pad(total % 60),
  };
}

/** Seconds -> "HH:MM:SS" */
export function formatDuration(totalSeconds: number): string {
  const { hours, minutes, seconds } = formatCountdown(totalSeconds);
  return `${hours}:${minutes}:${seconds}`;
}

/** "09:30:00" -> "9:30 AM" */
export function formatTime12Hour(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

/** A Date -> "09:04:05 AM" */
export function formatClock(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// Schedule queries
// ---------------------------------------------------------------------------

/** Index of the slot covering `nowSeconds`, or -1. */
export function findCurrentSlotIndex(nowSeconds: number): number {
  return scheduleData.findIndex((slot) => {
    const start = toSeconds(slot.startTime);
    const end = toSeconds(slot.endTime);
    return nowSeconds >= start && nowSeconds < end;
  });
}

/** Index of the first slot starting after `nowSeconds`, or -1. */
export function findNextSlotIndex(nowSeconds: number): number {
  return scheduleData.findIndex((slot) => toSeconds(slot.startTime) > nowSeconds);
}

/** Collapse the flat slot list into one row per batch, in first-seen order. */
export function groupBatches(slots: Slot[] = scheduleData): BatchSummary[] {
  const groups = new Map<string, Slot[]>();

  for (const slot of slots) {
    const existing = groups.get(slot.batch);
    if (existing) {
      existing.push(slot);
    } else {
      groups.set(slot.batch, [slot]);
    }
  }

  return Array.from(groups, ([name, group]) => {
    const startTime = group[0].startTime;
    const endTime = group[group.length - 1].endTime;
    return {
      name,
      startTime,
      endTime,
      durationSeconds: toSeconds(endTime) - toSeconds(startTime),
    };
  });
}

/** Decorate every slot with its live/completed status for the table. */
export function buildTableRows(nowSeconds: number, currentIndex: number): TableRow[] {
  return scheduleData.map((slot, index) => {
    const start = toSeconds(slot.startTime);
    const end = toSeconds(slot.endTime);
    const isCurrent = index === currentIndex;
    const isCompleted = nowSeconds >= end;

    return {
      ...slot,
      durationSeconds: end - start,
      isCurrent,
      isCompleted,
      status: isCurrent ? "live" : isCompleted ? "completed" : "upcoming",
    };
  });
}

// ---------------------------------------------------------------------------
// Badge styling
// ---------------------------------------------------------------------------

/**
 * Written out in full so Tailwind's scanner can find every class.
 * Never build these strings dynamically.
 */
const BATCH_BADGE_CLASSES: Record<string, string> = {
  "Batch 1":
    "bg-[linear-gradient(135deg,#1e3a5f,#2563eb)] text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]",
  "Batch 2":
    "bg-[linear-gradient(135deg,#064e3b,#059669)] text-white shadow-[0_0_15px_rgba(5,150,105,0.3)]",
  "Batch 3":
    "bg-[linear-gradient(135deg,#78350f,#d97706)] text-white shadow-[0_0_15px_rgba(217,119,6,0.3)]",
  "Batch 4":
    "bg-[linear-gradient(135deg,#7f1d1d,#dc2626)] text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]",
};

const FALLBACK_BADGE_CLASS = "bg-white/10 text-white";

export function batchBadgeClass(batch: string): string {
  return BATCH_BADGE_CLASSES[batch] ?? FALLBACK_BADGE_CLASS;
}