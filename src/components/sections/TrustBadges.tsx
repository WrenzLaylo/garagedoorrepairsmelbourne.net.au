/**
 * Brand / trust TICKER — a moving mono marquee on a dark engineered band.
 * Replaces the old static badge row. Duplicated track loops seamlessly via
 * the `ticker` keyframe (disabled under prefers-reduced-motion).
 */
const ITEMS: { label: string; accent?: boolean }[] = [
  { label: "ALL MAJOR BRANDS", accent: true },
  { label: "B&D" },
  { label: "DOMINATOR" },
  { label: "MERLIN" },
  { label: "GLIDEROL" },
  { label: "CENTURION" },
  { label: "ATA" },
  { label: "STEEL-LINE" },
  { label: "GRIFCO" },
  { label: "24/7 EMERGENCY", accent: true },
  { label: "MOST FIXED IN 1–2 HRS" },
  { label: "AUTHORISED REPAIRS" },
];

function Row() {
  return (
    <div className="ticker-track animate-ticker" aria-hidden="true">
      {ITEMS.concat(ITEMS).map((it, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`px-7 font-mono text-sm font-bold uppercase tracking-[0.16em] ${
              it.accent ? "text-brand-light" : "text-white/80"
            }`}
          >
            {it.label}
          </span>
          <span className="text-brand" aria-hidden="true">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function TrustBadges() {
  return (
    <section className="relative overflow-hidden border-y border-ink bg-ink py-4">
      <div className="panel-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="ticker-mask relative">
        <Row />
      </div>
      <span className="sr-only">
        Authorised to service and repair all major garage door brands including B&amp;D,
        Dominator, Merlin, Gliderol, Centurion and ATA. 24/7 emergency repairs across Melbourne.
      </span>
    </section>
  );
}
