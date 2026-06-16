import { useState } from "react";
import { SERVICES } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import {
  PackagePlus,
  Wrench,
  Zap,
  RefreshCw,
  Key,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  PackagePlus, Wrench, Zap, RefreshCw, Key, AlertTriangle, ShieldCheck,
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "install", label: "Install" },
  { id: "repair", label: "Repair" },
  { id: "automate", label: "Automate" },
  { id: "emergency", label: "Emergency" },
] as const;

type FilterId = typeof FILTERS[number]["id"];

const SERVICE_CATEGORIES: Record<string, FilterId[]> = {
  "supply-install": ["install"],
  "repairs": ["repair"],
  "motors-automation": ["automate", "install"],
  "springs-cables": ["repair"],
  "remotes-controls": ["automate", "repair"],
  "emergency": ["emergency", "repair"],
  "maintenance": ["repair"],
};

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const Icon = ICON_MAP[service.icon] ?? Wrench;
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="index-num text-2xl text-brand/25 transition-colors duration-300 group-hover:text-brand/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 font-display text-xl font-bold text-ink">{service.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{service.desc}</p>

      <ul className="mt-5 space-y-2 border-t border-border pt-5">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-xs text-ink-soft">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Services() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filtered = activeFilter === "all"
    ? SERVICES
    : SERVICES.filter((s) => SERVICE_CATEGORIES[s.id]?.includes(activeFilter));

  return (
    <section id="services" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="index-eyebrow mb-4"><span className="num">02</span> / What we fix</span>
              <h2 className="h-section">Garage door repairs &amp; servicing.</h2>
              <p className="mt-4 text-base text-ink-soft">
                From a snapped spring to a dead motor or an emergency call-out — we diagnose and
                repair every part of your garage door. No subbies, no surprises.
              </p>
            </div>

            {/* Minimal underline filter tabs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2" role="tablist" aria-label="Filter services">
              {FILTERS.map((f) => {
                const active = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(f.id)}
                    className={`relative pb-1 text-sm font-semibold transition-colors duration-200 ${
                      active ? "text-brand-deep" : "text-ink-light hover:text-ink"
                    }`}
                  >
                    {f.label}
                    <span className={`absolute -bottom-px left-0 h-0.5 rounded-full bg-brand transition-all duration-300 ${active ? "w-full" : "w-0"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <div key={activeFilter} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 60}>
              <ServiceCard service={service} index={i} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-14">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-surface-alt p-7 sm:flex-row sm:items-center">
            <p className="font-display text-xl font-bold text-ink">Not sure what's wrong? We'll diagnose it.</p>
            <a href="#contact" className="btn-primary shrink-0">
              Get a free quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
