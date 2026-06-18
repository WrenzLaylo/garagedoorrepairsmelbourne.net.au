import ScrollReveal from "../ui/ScrollReveal";

/** Engineered "spec sheet" band — mono ref codes + tabular figures, divided by dashed rules. */
const SPECS = [
  { ref: "EXP-01", value: "20+", label: "Years in the trade" },
  { ref: "REV-02", value: "700+", label: "Customer reviews" },
  { ref: "OPS-03", value: "24/7", label: "Emergency support" },
  { ref: "QA-04", value: "100%", label: "Safety-tested" },
];

export default function StatsBar() {
  return (
    <section className="border-b border-border bg-surface-alt">
      <div className="container-x">
        <ScrollReveal>
          <div className="flex items-center gap-3 border-b border-border py-4">
            <span className="h-2 w-2 bg-brand" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-mono text-ink-light">
              SYSTEM SPECS — GARAGE DOOR REPAIRS MELBOURNE
            </span>
          </div>
        </ScrollReveal>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {SPECS.map((s, i) => (
            <div
              key={s.ref}
              className={`group px-2 py-10 transition-colors duration-300 hover:bg-surface md:px-6 md:py-14 ${
                i < SPECS.length - 1 ? "md:border-r md:border-dashed md:border-border-strong" : ""
              } ${i < 2 ? "border-b border-dashed border-border-strong md:border-b-0" : ""}`}
            >
              <dt className="font-mono text-[10px] font-bold uppercase tracking-mono text-brand-deep">{s.ref}</dt>
              <dd className="mt-3 font-display text-4xl font-semibold tabular-nums tracking-tight text-ink transition-colors duration-300 group-hover:text-brand sm:text-5xl">
                {s.value}
              </dd>
              <dd className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-light">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
