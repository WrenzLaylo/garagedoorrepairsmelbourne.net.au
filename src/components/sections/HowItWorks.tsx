import { Check } from "lucide-react";
import { STEPS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const STEP_BULLETS: string[][] = [
  ["Call or send the form with a photo", "Honest time estimate up front"],
  ["A technician inspects door, motor & springs", "Itemised quote before any work"],
  ["Common parts carried on the van", "Tested to Australian safety standards"],
  ["Full service report for your records", "Workmanship warranty on every repair"],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal>
          <span className="kicker mb-4">
            <span className="num">04</span><span className="sep">/</span>THE PROCESS
          </span>
          <h2 className="h-section max-w-2xl">Diagnosed, quoted, done.</h2>
          <p className="mt-4 max-w-xl text-base text-ink-soft">
            You'll always know what's happening and what it costs — before we touch a single bolt.
          </p>
        </ScrollReveal>

        {/* Garage-door rail: a roller scrubs along the track as you scroll the steps. */}
        <div data-rail className="relative mt-12 mb-3 hidden h-5 md:block" aria-hidden="true">
          <div className="rail-line absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2" />
          <div data-rail-fill className="rail-fill absolute left-0 top-1/2 h-1 -translate-y-1/2" style={{ width: "0%" }} />
          {STEPS.map((_, i) => (
            <span
              key={i}
              className="rail-node absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full"
              style={{ left: `${(i / (STEPS.length - 1)) * 100}%` }}
            />
          ))}
          <span data-rail-roller className="rail-roller absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" style={{ left: "0%" }} />
        </div>

        <div data-stagger className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.num} className="group relative flex h-full flex-col bg-surface-raised p-7 transition-colors duration-300 hover:bg-surface-alt">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-mono text-brand-deep">STEP</span>
                <span className="font-display text-5xl font-semibold tabular-nums leading-none text-border-strong transition-colors duration-300 group-hover:text-brand">
                  {step.num}
                </span>
              </div>
              <div className="mt-5 h-px w-full bg-border" />
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{step.desc}</p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {STEP_BULLETS[index].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-ink-soft">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
