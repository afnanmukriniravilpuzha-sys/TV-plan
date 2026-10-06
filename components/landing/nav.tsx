"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { GoldText } from "@/components/primitives";

const LINKS = [
  { href: "#schedule", label: "Schedule" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#session", label: "Session" },
] as const;

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-[rgba(212,175,55,0.2)] bg-[rgba(5,5,16,0.8)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-serif text-sm font-black uppercase tracking-[0.2em] sm:text-base"
        >
          <GoldText>TV Plan</GoldText>
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-[#a0a0c0] sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-[#f5d060]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="rounded-full border border-[#d4af37] bg-[linear-gradient(135deg,#1a1a3e,#2a2a5a)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#f5d060] shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-shadow hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] sm:text-sm"
        >
          Start a session
        </Link>
      </div>
    </nav>
  );
}
