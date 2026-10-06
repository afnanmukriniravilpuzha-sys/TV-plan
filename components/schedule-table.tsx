import { PanelTitle } from "./primitives";
import { batchBadgeClass, formatDuration, formatTime12Hour, type TableRow } from "@/lib/schedule";

const HEADERS = ["Batch", "Time Slot", "Duration", "Student Name", "Project No.", "Status"];

function statusLabel(row: TableRow): string {
  if (row.status === "live") return "🔴 LIVE NOW";
  if (row.status === "completed") return "✅ Completed";
  return "Upcoming";
}

function rowClassName(row: TableRow): string {
  if (row.isCurrent) {
    return "border-l-4 border-l-[#d4af37] bg-[linear-gradient(90deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))]";
  }
  if (row.isCompleted) return "opacity-40";
  return "hover:bg-[rgba(212,175,55,0.05)]";
}

export function ScheduleTable({ rows }: { rows: TableRow[] }) {
  return (
    <section className="flex min-h-0 min-w-0 flex-col xl:flex-[2]">
      <PanelTitle>Today&apos;s Schedule (9:00 AM - 12:00 PM)</PanelTitle>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[760px] overflow-hidden rounded-[20px] border border-[rgba(212,175,55,0.15)] bg-white/[0.02] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[linear-gradient(90deg,#1a1a3e,#2a2a5a,#1a1a3e)]">
              <tr>
                {HEADERS.map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="border-b-2 border-[rgba(212,175,55,0.2)] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#d4af37] sm:px-5 sm:py-4 sm:text-sm"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.project} className={`transition-colors duration-300 ${rowClassName(row)}`}>
                  <td className="px-4 py-3 sm:px-5 sm:py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${batchBadgeClass(row.batch)}`}
                    >
                      {row.batch}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold tabular-nums text-[#f5d060] sm:px-5 sm:py-4 sm:text-base">
                    {formatTime12Hour(row.startTime)} - {formatTime12Hour(row.endTime)}
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-4">
                    <span className="inline-block rounded-[10px] border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.15)] px-3 py-1 text-xs font-semibold tabular-nums text-[#34d399] sm:text-sm">
                      {formatDuration(row.durationSeconds)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-white sm:px-5 sm:py-4 sm:text-base">
                    {row.student}
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-4">
                    <span className="inline-block rounded-[10px] border border-[rgba(138,43,226,0.2)] bg-[rgba(138,43,226,0.15)] px-3 py-1 text-xs font-semibold text-[#c4b5fd] sm:text-sm">
                      Project #{row.project}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap sm:px-5 sm:py-4 sm:text-base">
                    {statusLabel(row)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}