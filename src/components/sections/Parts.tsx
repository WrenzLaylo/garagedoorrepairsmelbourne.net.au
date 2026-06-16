import {
  ArrowRight, Cpu, ExternalLink, Key, RefreshCw, Settings,
  ShieldCheck, ShoppingBag, Truck, Zap, type LucideIcon,
} from "lucide-react";
import { PARTS, PARENT_BRAND } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { trackEvent } from "../../utils/analytics";

const ICON_MAP: Record<string, LucideIcon> = { Key, Zap, RefreshCw, Settings, Cpu, ShieldCheck };
const SHOP_URL = PARENT_BRAND.shopUrl;

function onShopClick() {
  trackEvent("parts_shop_click", { destination: SHOP_URL });
}

export default function Parts() {
  return (
    <section id="parts" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal>
          <span className="index-eyebrow mb-4"><span className="num">07</span> / Genuine parts</span>
          <h2 className="h-section max-w-2xl">Need a part? Shop AGG Doors.</h2>
          <p className="mt-4 max-w-xl text-base text-ink-soft">
            Prefer the DIY route or just need a replacement remote, motor or spring kit? The official
            AGG Doors shop stocks genuine and compatible parts — shipped Australia-wide.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTS.map((part, index) => {
            const Icon = ICON_MAP[part.icon] ?? Settings;
            return (
              <ScrollReveal key={part.name} delay={index * 60}>
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onShopClick}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-surface-raised p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 font-display text-base font-bold text-ink">
                      {part.name}
                      <ArrowRight className="h-4 w-4 -translate-x-1 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{part.desc}</span>
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={120}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface-alt p-7 md:flex-row md:items-center md:p-9">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-label text-brand-deep">
                <Truck className="h-3.5 w-3.5" aria-hidden="true" />
                Shipped Australia-wide
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink">Browse the full parts catalogue</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Remotes, keypads, motors, springs, cables, rollers and weather seals — hundreds of
                genuine and compatible parts. Not sure which one? Send a photo and we'll point you to it.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onShopClick}
                className="btn-primary justify-center"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Visit the shop
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#contact" className="btn-ghost justify-center">
                Ask us which part
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
