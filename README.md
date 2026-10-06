# TV Plan — Student Project Presentation Board

A live "TV display" board for a 9:00 AM – 12:00 PM student project presentation
session. Converted from the original single-file `tv-plan.html`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

---

## Requirements

- **Node.js 20.9 or newer** (`node -v`)

Already installed on this machine (portable, no admin rights needed):

```
C:\Users\<you>\AppData\Local\nodejs\node-v24.21.0-win-x64
```

That folder is on your user `PATH`, so `node` and `npm` work in any new terminal.

> If you upgrade Node, update the `PATH` entry to point at the new version folder.

### PowerShell note

If your PowerShell blocks `.ps1` shims ("running scripts is disabled on this
system"), call `npm.cmd` instead of `npm`:

```powershell
npm.cmd install
npm.cmd run dev
```

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Script              | Does                                    |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Dev server with hot reload              |
| `npm run build`     | Production build                        |
| `npm start`         | Serve the production build              |
| `npm run lint`      | ESLint (`core-web-vitals` + TypeScript) |
| `npm run typecheck` | `tsc --noEmit`                          |

---

## Editing the schedule

Everything is driven by one array in **`lib/schedule.ts`**:

```ts
export const scheduleData: Slot[] = [
  { batch: "Batch 1", startTime: "09:00:00", endTime: "09:30:00", student: "Ahmed Khan", project: 1 },
  // ...
];

export const SESSION_START = "09:00:00";
export const SESSION_END = "12:00:00";
```

Times are `"HH:MM:SS"` in 24-hour format. Everything else — countdowns, table
statuses, batch groupings, durations — is derived automatically. No other file
needs to change.

### Adding a batch colour

Badge colours are looked up from a literal map at the bottom of
`lib/schedule.ts`. Add a full key there (do **not** build the class name
dynamically, or Tailwind will not find it):

```ts
const BATCH_BADGE_CLASSES: Record<string, string> = {
  "Batch 4": "bg-[linear-gradient(135deg,#7f1d1d,#dc2626)] text-white shadow-[...]",
};
```

---

## Project structure

```
app/
  layout.tsx                  Root layout: next/font (Inter + Playfair Display), metadata
  page.tsx                    Server component, renders <TvBoard />
  globals.css                 Tailwind v4 theme, keyframes, scrollbar
components/
  tv-board.tsx                Client shell: one clock, one derived state tree
  top-countdown-banner.tsx    "Session Ends In" strip
  header-bar.tsx              Title + pulsing LIVE badge
  schedule-table.tsx          Today's schedule table
  now-showing-card.tsx        "Now Presenting"
  slot-countdown-card.tsx     Slot timer + progress bar
  batch-timing-card.tsx       Per-batch time ranges
  footer-bar.tsx              Footer + live clock
  primitives.tsx              GoldText, PanelTitle, CountdownBox, PulseSeparator
lib/
  schedule.ts                 Data + pure time helpers (no React)
  board.ts                    Date -> everything the UI renders (no React)
  use-now.ts                  useNow() hook
```

`lib/schedule.ts` and `lib/board.ts` contain no JSX and no React, so the timing
rules can be unit-tested or reused on the server independently.

---

## How the timing works

- `toSeconds("09:30:00")` and `secondsOfDay(date)` convert everything to
  *seconds since midnight*, so there is no timezone or DST drift inside a
  single-day session.
- `buildBoardState(now)` in `lib/board.ts` turns one `Date` into every value the
  board needs. `TvBoard` derives all panels from that single object, so the
  table, the "Now Presenting" card and the timers can never disagree.
- `useNow()` returns `null` until mounted, so the server and the first client
  paint render identical markup and React reports no hydration mismatch.

## Behaviour fixes vs. the original HTML

- **Progress bar before the session.** The original forced the bar to `100%`
  whenever no slot was live — including *before* 9:00 AM, right after the page
  loaded. It now shows `0%` before the first slot and `100%` only after the last
  one ends.
- **Gaps in the schedule.** With a gap in `scheduleData` the original left the
  previous student's name on screen. It now shows an "Up Next" card.
- **`innerHTML` on every tick.** The original rewrote the whole table's HTML
  once per second, throwing away and rebuilding every DOM node. React now
  reuses the nodes and only patches what changed.
- **Accessibility.** Added a real `<table>` with `scope="col"`, an
  `aria-live` region for the presenter, `role="progressbar"` with
  `aria-valuenow`, and decorative `::before`/`::after` bars replaced with
  `aria-hidden` elements.

## Notes

- `tv-plan.html` is kept as the original reference. It is not used by the app
  and is safe to delete.
- The layout targets a large screen (TV / projector). It is responsive down to
  mobile: the two columns stack below `xl` and the schedule table scrolls
  horizontally.