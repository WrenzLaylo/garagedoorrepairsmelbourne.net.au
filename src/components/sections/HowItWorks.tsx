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
    <section id="how-it-works" className="section bg-surface-alt">
      <div className="container-x">
        <ScrollReveal>
          <span className="index-eyebrow mb-4"><span className="num">04</span> / How it works</span>
          <h2 className="h-section max-w-2xl">Simple, clear, done.</h2>
          <p className="mt-4 max-w-xl text-base text-ink-soft">
            You'll always know what's happening and what it costs — before we touch a single bolt.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.num} delay={index * 70}>
              <div className="group flex h-full flex-col bg-surface-raised p-7 transition-colors duration-300 hover:bg-surface-alt">
                <div className="flex items-baseline justify-between">
                  <span className="index-num text-5xl text-brand/20 transition-colors duration-300 group-hover:text-brand">
                    {step.num}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{step.desc}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {STEP_BULLETS[index].map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs text-ink-soft">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
