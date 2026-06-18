import { ArrowRight, Phone, Star, ArrowDown } from "lucide-react";
import { BUSINESS, CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

const specs = [
  { k: "EXP", value: "20+", label: "years" },
  { k: "REV", value: "700+", label: "reviews" },
  { k: "ETA", value: "1–2hr", label: "typical fix" },
  { k: "OPS", value: "24/7", label: "emergency" },
];

export default function Hero({ onCall, onEmergencyCall }: Props) {
  return (
    <section
      id="top"
      data-hero
      className="relative flex min-h-[94dvh] items-center overflow-hidden pt-28 md:pt-32"
    >
      {/* Engineered blueprint backdrop */}
      <div aria-hidden="true" className="hero-eng absolute inset-0 z-0 overflow-hidden">
        <div className="hero-eng-grid" />
        <div className="hero-schematic-ring" style={{ width: 460, height: 460, right: "6%", top: "8%" }} />
        <div className="hero-schematic-ring" style={{ width: 230, height: 230, right: "30%", bottom: "10%", animationDirection: "reverse" }} />
        <span className="hero-cross" style={{ right: "12%", top: "22%" }} />
        <span className="hero-cross" style={{ right: "44%", top: "62%" }} />
        <span className="hero-cross" style={{ right: "8%", bottom: "18%" }} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-surface via-surface/80 to-surface/20" />

      <div className="container-x relative z-10 w-full" data-hero-content>
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.82fr]">
          <div>
            <span className="kicker mb-6">
              <span className="num">01</span>
              <span className="sep">/</span>
              MELBOURNE · SINCE {BUSINESS.founded} · 24/7
            </span>

            <h1
              className="font-display font-semibold text-ink"
              style={{ fontSize: "clamp(2.7rem, 7.2vw, 5.6rem)", lineHeight: 0.96, letterSpacing: "-0.035em" }}
            >
              Garage door repairs,
              <br />
              <span className="text-brand">engineered</span> right.
            </h1>

            {/* Mono spec line — the signature technical detail */}
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-light">
              <span className="text-ink">SPRINGS</span><span className="text-border-strong">·</span>
              <span className="text-ink">CABLES</span><span className="text-border-strong">·</span>
              <span className="text-ink">TRACKS</span><span className="text-border-strong">·</span>
              <span className="text-ink">MOTORS</span><span className="text-border-strong">·</span>
              <span className="text-ink">REMOTES</span>
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Stuck, noisy or off the track? We diagnose the real fault and fix it properly —
              most Melbourne repairs sorted in 1–2 hours. Backed by the {BUSINESS.parenBrand} team
              Melbourne already trusts.
            </p>

            {/* Phone-first CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CONTACT.phoneTel}
                onClick={() => onCall()}
                className="btn-call group py-4 text-base"
              >
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Call {CONTACT.phone}
              </a>
              <a href="#contact" className="btn-ghost group py-4 text-base" onClick={() => onCall()}>
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>

            {/* Emergency line — surfaced, phone-first */}
            <a
              href={CONTACT.emergencyTel}
              onClick={() => onEmergencyCall()}
              className="mt-5 inline-flex items-center gap-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-accent-dark transition-colors hover:text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              24/7 EMERGENCY — {CONTACT.emergencyPhone}
            </a>

            {/* Spec sheet stat row */}
            <div className="mt-11 max-w-xl">
              <div className="rule-dashed" />
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 pt-6 sm:grid-cols-4">
                {specs.map((s) => (
                  <div key={s.k}>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-mono text-brand-deep">{s.k}</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink">{s.value}</dd>
                    <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-light">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right: engineered photo plate */}
          <div className="relative hidden lg:block">
            <div
              className="panel-tick relative ml-auto w-full max-w-md overflow-hidden rounded-lg border border-border-strong bg-surface-raised p-2 shadow-card-hover"
              data-hero-layer
              data-depth="40"
            >
              {/* spec strip on top of the plate */}
              <div className="flex items-center justify-between px-2 pb-2 pt-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-mono text-ink-light">FIG.01 — ON-SITE REPAIR</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-mono text-brand-deep">VIC · AU</span>
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md" data-reveal-img>
                <img
                  src="/assets/hero-technician-branded.webp"
                  alt="Garage door technician servicing a sectional door in Melbourne"
                  className="h-full w-full object-cover"
                  data-hero-photo
                  loading="eager"
                  fetchPriority="high"
                  draggable={false}
                />
              </div>
            </div>

            <a
              href={CONTACT.emergencyTel}
              onClick={() => onEmergencyCall()}
              className="panel-tick absolute -bottom-5 -left-5 flex items-center gap-3 rounded-lg border border-border-strong bg-surface-raised p-4 shadow-card-hover transition-transform duration-300 hover:-translate-y-1"
              data-hero-layer
              data-depth="-30"
              aria-label="24/7 emergency line"
            >
              <span className="grid h-11 w-11 place-items-center rounded-md bg-accent/10 text-accent">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-mono text-accent-dark">24/7 EMERGENCY</span>
                <span className="font-display text-lg font-semibold text-ink">{CONTACT.emergencyPhone}</span>
              </span>
            </a>

            <div
              className="absolute -right-4 top-10 flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2 shadow-card"
              data-hero-layer
              data-depth="22"
            >
              <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <span className="font-mono text-[12px] font-bold text-ink">4.8 · 700+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" aria-hidden="true">
        <span className="font-mono text-[10px] font-bold uppercase tracking-mono text-ink-light">SCROLL</span>
        <ArrowDown className="h-4 w-4 animate-float text-ink-light" />
      </div>
    </section>
  );
}
