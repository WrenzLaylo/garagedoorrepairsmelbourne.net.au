import { ArrowUpRight, Phone } from "lucide-react";
import { CONTACT } from "../../constants";
import { trackCall } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function FinalCTA({ onCall, onEmergencyCall }: Props) {
  return (
    <section data-door-open className="relative overflow-hidden bg-ink py-24 md:py-32">
      {/* Continuing garage-panel line motif + blueprint grid (parallax) */}
      <div
        className="panel-lines pointer-events-none absolute inset-0"
        data-parallax
        data-speed="-0.12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,91,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,91,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 80% at 30% 0%, #000, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 80% at 30% 0%, #000, transparent 75%)",
        }}
        data-parallax
        data-speed="0.08"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-mono text-brand-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-light opacity-75 animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
              </span>
              LINE OPEN — READY WHEN YOU ARE
            </span>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let's sort your garage door.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              A small fix, a new installation, or a 3am emergency — we've got Melbourne covered.
              The fastest way to a fix is a phone call.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CONTACT.phoneTel}
                onClick={() => { onCall(); trackCall(); }}
                className="btn group bg-white px-7 py-4 text-base text-ink hover:bg-brand hover:text-white"
              >
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Call {CONTACT.phone}
              </a>
              <a
                href="#contact"
                onClick={() => trackCall()}
                className="btn group border border-white/30 px-7 py-4 text-base text-white hover:bg-white/10"
              >
                Get a free quote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <a
              href={CONTACT.emergencyTel}
              onClick={() => onEmergencyCall()}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-accent-light transition-colors hover:text-white"
            >
              24/7 EMERGENCY — {CONTACT.emergencyPhone}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 font-mono text-[11px] font-bold uppercase tracking-wider text-white/50">
              <span>20+ YEARS</span>
              <span aria-hidden="true" className="text-white/25">/</span>
              <span>700+ REVIEWS</span>
              <span aria-hidden="true" className="text-white/25">/</span>
              <span>24/7 EMERGENCY</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
