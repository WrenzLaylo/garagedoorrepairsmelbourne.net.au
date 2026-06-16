const STATS = [
  { value: "20+", label: "Years experience" },
  { value: "700+", label: "Customer reviews" },
  { value: "24/7", label: "Emergency support" },
  { value: "100%", label: "Safety focused" },
];

function StatValue({ value }: { value: string }) {
  const m = value.match(/^(\d+)(\+|%)?$/);
  if (m) {
    return <span data-count={m[1]} data-count-suffix={m[2] || ""}>0{m[2] || ""}</span>;
  }
  return <>{value}</>;
}

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-surface-alt">
      <div className="container-x">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-2 py-10 md:px-6 md:py-14 ${i < STATS.length - 1 ? "md:border-r md:border-border" : ""} ${i < 2 ? "border-b border-border md:border-b-0" : ""}`}
            >
              <dt className="font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl" aria-label={`${stat.value} ${stat.label}`}>
                <StatValue value={stat.value} />
              </dt>
              <dd className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-light">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
