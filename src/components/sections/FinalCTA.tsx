import { ArrowRight, Phone } from "lucide-react";
import { CONTACT } from "../../constants";
import { trackCall } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function FinalCTA({ onCall }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 md:py-32">
      {/* Continuing garage-panel line motif (parallax) */}
      <div
        className="panel-lines pointer-events-none absolute inset-0"
        data-parallax
        data-speed="-0.12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        data-parallax
        data-speed="0.1"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-label text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
              Ready when you are
            </span>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let's sort your garage door.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Whether it's a small fix, a new installation, or a 3am emergency — we've got Melbourne covered.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={() => trackCall()}
                className="btn group bg-white text-brand-deep hover:bg-white/90"
              >
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={CONTACT.phoneTel}
                onClick={() => { onCall(); trackCall(); }}
                className="btn group border border-white/40 text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                {CONTACT.phone}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white/60">
              <span>20+ years experience</span>
              <span aria-hidden="true">·</span>
              <span>700+ customer reviews</span>
              <span aria-hidden="true">·</span>
              <span>24/7 emergency support</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
