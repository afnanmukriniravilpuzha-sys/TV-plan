import { LandingNav } from "@/components/landing/nav";
import { LandingHero } from "@/components/landing/hero";
import { SchedulePreview } from "@/components/landing/schedule-preview";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SessionWindow } from "@/components/landing/session-window";
import { TechStrip } from "@/components/landing/tech-strip";
import { FinalCta } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh bg-[linear-gradient(160deg,#0a0a1a_0%,#0d0d2b_30%,#120a2e_60%,#0a0a1a_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(212,175,55,0.05)_0%,transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(138,43,226,0.06)_0%,transparent_50%)]"
      />
      <div className="relative">
        <LandingNav />
        <main>
          <LandingHero />
          <SchedulePreview />
          <Features />
          <HowItWorks />
          <SessionWindow />
          <TechStrip />
          <FinalCta />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
