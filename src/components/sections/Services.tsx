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
  ArrowUpRight,
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

const REF_CODES: Record<string, string> = {
  "repairs": "SVC-RPR",
  "springs-cables": "SVC-SPR",
  "motors-automation": "SVC-MOT",
  "remotes-controls": "SVC-RMT",
  "emergency": "SVC-911",
  "maintenance": "SVC-MNT",
  "supply-install": "SVC-NEW",
};

/** A single ledger-style row in the services index. */
function ServiceRow({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const Icon = ICON_MAP[service.icon] ?? Wrench;
  const isEmergency = service.id === "emergency";
  return (
    <a
      href="#contact"
      className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-4 border-t border-border px-3 py-7 transition-colors duration-300 hover:bg-surface-alt md:gap-7 md:px-5"
    >
      {/* Index + ref */}
      <div className="flex flex-col items-start">
        <span className={`font-display text-3xl font-semibold tabular-nums leading-none transition-colors duration-300 md:text-4xl ${isEmergency ? "text-accent/40 group-hover:text-accent" : "text-border-strong group-hover:text-brand"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-2 hidden font-mono text-[10px] font-bold uppercase tracking-mono text-ink-light sm:block">
          {REF_CODES[service.id] ?? "SVC"}
        </span>
      </div>

      {/* Body */}
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md transition-colors duration-300 ${isEmergency ? "bg-accent/10 text-accent" : "bg-brand-tint text-brand-deep group-hover:bg-brand group-hover:text-white"}`}>
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{service.title}</h3>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{service.desc}</p>
        <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
          {service.features.map((f) => (
            <li
              key={f}
              className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft transition-colors duration-300 group-hover:border-brand/30"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow */}
      <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border text-ink-light transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-0" aria-hidden="true" />
      </span>
    </a>
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
              <span className="kicker mb-4">
                <span className="num">02</span><span className="sep">/</span>WHAT WE FIX
              </span>
              <h2 className="h-section">A full index of garage door repairs.</h2>
              <p className="mt-4 text-base text-ink-soft">
                From a snapped spring to a dead motor or an emergency call-out — every part of your
                garage door, diagnosed and repaired. No subbies, no surprises.
              </p>
            </div>

            {/* Underline filter tabs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2" role="tablist" aria-label="Filter services">
              {FILTERS.map((f) => {
                const active = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(f.id)}
                    className={`relative pb-1 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                      active ? "text-brand-deep" : "text-ink-light hover:text-ink"
                    }`}
                  >
                    {f.label}
                    <span className={`absolute -bottom-px left-0 h-0.5 bg-brand transition-all duration-300 ${active ? "w-full" : "w-0"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Ledger index — rows lift/uncover in a staggered sweep; the rig's
            MutationObserver re-animates the set when the filter changes. */}
        <div data-stagger className="mt-12 border-b border-border">
          {filtered.map((service) => {
            const realIndex = SERVICES.findIndex((s) => s.id === service.id);
            return <ServiceRow key={service.id} service={service} index={realIndex} />;
          })}
        </div>

        <ScrollReveal className="mt-12">
          <div className="panel-tick flex flex-col items-start justify-between gap-5 rounded-lg border border-border bg-surface-alt p-7 sm:flex-row sm:items-center">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-mono text-brand-deep">DIAGNOSIS FIRST</span>
              <p className="mt-2 font-display text-xl font-semibold text-ink">Not sure what's wrong? We'll find the real fault.</p>
            </div>
            <a href="#contact" className="btn-primary shrink-0">
              Get a free quote
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
