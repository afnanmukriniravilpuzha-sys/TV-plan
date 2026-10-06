import Link from "next/link";

import { GoldText } from "@/components/primitives";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
      <h2 className="font-serif text-3xl font-black sm:text-5xl">
        <GoldText>Ready to go live?</GoldText>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm text-[#a0a0c0] sm:text-base">
        Open the board on any TV browser and walk into your session with
        every slot, countdown, and student already in place.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d060)] px-10 py-4 text-sm font-extrabold uppercase tracking-wider text-[#050510] shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow hover:shadow-[0_0_45px_rgba(212,175,55,0.6)]"
      >
        Start a session
      </Link>
    </section>
  );
}
