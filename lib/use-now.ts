"use client";

import { useEffect, useState } from "react";

/**
 * Ticking clock.
 *
 * Returns `null` until mounted so the first render is identical on the server
 * and the client. Without this, the server and the browser would disagree about
 * the current time and React would throw a hydration mismatch.
 */
export function useNow(intervalMs = 1000): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    const first = setTimeout(() => setNow(new Date()), 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, [intervalMs]);

  return now;
}