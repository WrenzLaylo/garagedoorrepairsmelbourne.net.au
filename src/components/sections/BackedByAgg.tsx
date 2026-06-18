import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ExternalLink,
  MapPin,
  ShoppingBag,
  Star,
} from "lucide-react";
import { PARENT_BRAND } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const facts = [
  {
    icon: BadgeCheck,
    ref: "ABN",
    label: "Verified business",
    value: PARENT_BRAND.abn,
    detail: "AGG DOORS PTY. LTD. — an active Australian Private Company.",
  },
  {
    icon: MapPin,
    ref: "HQ",
    label: "Melbourne base",
    value: "Hallam, VIC",
    detail: PARENT_BRAND.address,
  },
  {
    icon: Building2,
    ref: "EXP",
    label: "Trade experience",
    value: PARENT_BRAND.experienceLabel,
    detail: "Repairs, installs, servicing, gates and roller shutters.",
  },
  {
    icon: Star,
    ref: "REV",
    label: "Customer proof",
    value: "700+ reviews",
    detail: "Source-linked so counts never go stale.",
  },
];

export default function BackedByAgg() {
  return (
    <section className="section relative overflow-hidden bg-surface-alt">
      <div className="grid-bp pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative">
        <ScrollReveal direction="up">
          <div className="max-w-2xl">
            <span className="kicker mb-4">
              <span className="num">✶</span><span className="sep">/</span>THE PARENT BRAND
            </span>
            <h2 className="h-section">Backed by AGG Doors Pty Ltd.</h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              Garage Door Repairs Melbourne is powered by AGG Doors Pty Ltd — a Hallam-based
              Melbourne garage door company providing repairs, installations, servicing and
              automation across residential and commercial properties.
            </p>
          </div>
        </ScrollReveal>

        <div data-stagger className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ icon: Icon, ref, label, value, detail }) => (
            <article key={label} className="group h-full bg-surface-raised p-6 transition-colors duration-300 hover:bg-surface-alt">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-mono text-ink-light">{ref}</span>
              </div>
              <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-wider text-brand-deep">{label}</p>
              <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">{value}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{detail}</p>
            </article>
          ))}
        </div>

        <ScrollReveal direction="up" delay={160}>
          <div className="mt-6 grid gap-5 rounded-lg border border-border bg-surface-raised p-6 shadow-card md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="font-display text-2xl font-semibold text-ink">Need remotes, openers or spare parts?</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                The AGG Doors online shop carries garage door remotes, smart control kits, keypads,
                receivers, wall buttons, openers and common spare parts.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href={PARENT_BRAND.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Visit shop
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PARENT_BRAND.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                Read reviews
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
