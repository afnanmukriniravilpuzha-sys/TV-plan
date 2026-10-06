import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Plan — Live Student Presentation Board",
  description:
    "Turn your session schedule into a live TV board: session countdowns, batch timing, auto status, and one-glance progress for student project presentations.",
  openGraph: {
    title: "TV Plan — Live Student Presentation Board",
    description:
      "Live countdowns, per-batch timing, and one-glance progress for student project presentations.",
    type: "website",
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
