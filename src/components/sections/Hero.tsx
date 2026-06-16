import { ArrowRight, Phone, Star, ArrowDown } from "lucide-react";
import { BUSINESS, CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

const stats = [
  { value: "700+", label: "reviews" },
  { value: "4.8★", label: "rating" },
  { value: "1–2 hr", label: "typical fix" },
  { value: "24/7", label: "emergency" },
];

export default function Hero({ onCall, onEmergencyCall }: Props) {
  return (
    <section
      id="top"
      data-hero
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-surface pt-28 md:pt-32"
    >
      {/* ── Hero content (always rendered + visible; the door is a decorative overlay on top) ── */}
      <div className="container-x relative z-10 w-full" data-hero-content>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.85fr]">
          {/* Left — editorial headline */}
          <div>
            <div className="eyebrow mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Melbourne · Since {BUSINESS.founded} · 24/7
            </div>

            <h1 className="font-display text-ink" style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
              Garage door<br />repairs, done <span className="text-brand">right.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              Stuck, noisy or broken? We fix springs, cables, tracks, motors and remotes
              across Melbourne — most repairs sorted in 1–2 hours. Backed by the {BUSINESS.parenBrand}
              {" "}team Melbourne already knows.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="btn-primary group px-7 py-3.5 text-base" onClick={() => onCall()}>
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href={CONTACT.phoneTel} onClick={() => onCall()} className="btn-ghost group px-7 py-3.5 text-base">
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                {CONTACT.phone}
              </a>
            </div>

            <div className="mt-12 max-w-xl">
              <div className="rule" />
              <dl className="grid grid-cols-2 gap-y-5 pt-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-2xl font-bold text-ink">{s.value}</dt>
                    <dd className="mt-0.5 text-xs font-medium uppercase tracking-wider text-ink-light">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right — parallax photo + floating cards */}
          <div className="relative hidden lg:block">
            <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border shadow-card" data-hero-layer data-depth="40">
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

            <a
              href={CONTACT.emergencyTel}
              onClick={() => onEmergencyCall()}
              className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-border bg-surface-raised p-4 shadow-card-hover transition-transform duration-300 hover:-translate-y-1"
              data-hero-layer
              data-depth="-30"
              aria-label="24/7 emergency line"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-accent-dark">24/7 emergency</span>
                <span className="font-display text-lg font-bold text-ink">{CONTACT.emergencyPhone}</span>
              </span>
            </a>

            <div className="absolute -right-4 top-8 flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 shadow-card" data-hero-layer data-depth="22">
              <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <span className="text-sm font-semibold text-ink">4.8 · 700+ reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue (visible once the door has opened) */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" aria-hidden="true">
        <span className="text-[10px] font-semibold uppercase tracking-label text-ink-light">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-float text-ink-light" />
      </div>

      {/* ── Decorative sectional garage door overlay (scroll opens it; CSS hides it on reduced-motion) ── */}
      <div data-door className="absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
        {/* side tracks */}
        <span data-door-track className="absolute inset-y-0 left-0 z-10 w-2.5 bg-brand-dark/80 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.25)]" />
        <span data-door-track className="absolute inset-y-0 right-0 z-10 w-2.5 bg-brand-dark/80 shadow-[inset_2px_0_4px_rgba(0,0,0,0.25)]" />

        {/* 4 sectional panels */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            data-door-panel
            className="door-panel absolute left-0 right-0 bg-brand"
            style={{ top: `${i * 25}%`, height: "25%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.14] to-black/[0.16]" />
            <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-white/10" />
            {/* centre panel branding */}
            {i === 1 && (
              <div className="absolute inset-0 flex items-end justify-center pb-3">
                <div className="flex items-center gap-3">
                  <img src={BUSINESS.logo} alt="" className="h-10 w-10 rounded-lg bg-white/95 p-1" draggable={false} />
                  <span className="font-display text-lg font-bold uppercase tracking-tight text-white">Garage Door Repairs</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* scroll-to-open cue */}
        <div data-door-cue className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/85">
          <span className="text-[10px] font-semibold uppercase tracking-label">Scroll to open</span>
          <ArrowDown className="h-4 w-4 animate-float" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
