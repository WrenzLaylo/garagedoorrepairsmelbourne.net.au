import { useEffect, useState } from "react";
import {
  ArrowUpRight, Cpu, ExternalLink, Key, RefreshCw, Settings,
  ShieldCheck, ShoppingBag, Truck, Zap, type LucideIcon,
} from "lucide-react";
import { PARTS, SHOP_PRODUCTS, PARENT_BRAND, BUSINESS, type ShopProduct } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { trackEvent } from "../../utils/analytics";

const ICON_MAP: Record<string, LucideIcon> = { Key, Zap, RefreshCw, Settings, Cpu, ShieldCheck };
const SHOP_URL = PARENT_BRAND.shopUrl;

function onShopClick(ref?: string) {
  trackEvent("parts_shop_click", { destination: SHOP_URL, product: ref });
}

// Infer a manufacturer brand from the product title (for Product structured data).
function brandOf(title: string): string | undefined {
  const known = ["Merlin", "ATA", "LiftPro", "B&D", "Gliderol", "BOSS", "Grifco", "Steel-Line"];
  return known.find((b) => title.toLowerCase().startsWith(b.toLowerCase()));
}

/**
 * Product structured data (schema.org ItemList of Products), generated from the
 * SAME product list that renders the cards — single source of truth, so the markup
 * can never silently drift from what's shown. Injected into <head> so it's eligible
 * for product rich results. `offers` only emitted when in stock with a price.
 */
function buildShopJsonLd(products: ShopProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Garage door parts — AGG Doors shop",
    itemListElement: products.map((p, i) => {
      const brand = brandOf(p.title);
      const priceNum = p.price ? p.price.replace(/[^0-9.]/g, "") : "";
      const inStock = p.available !== false;
      const item: Record<string, unknown> = {
        "@type": "Product",
        name: p.title,
        image: `${BUSINESS.domain}${p.image}`,
        sku: p.ref,
        category: p.category,
        url: p.href,
        ...(brand ? { brand: { "@type": "Brand", name: brand } } : {}),
      };
      if (priceNum && inStock) {
        item.offers = {
          "@type": "Offer",
          priceCurrency: "AUD",
          price: priceNum,
          availability: "https://schema.org/InStock",
          priceValidUntil: "2026-12-31",
          url: p.href,
          seller: { "@type": "Organization", name: "AGG Doors" },
        };
      }
      return { "@type": "ListItem", position: i + 1, item };
    }),
  };
}

// Validate a fetched record before trusting it (cron output / hand edits).
function coerceProducts(raw: unknown): ShopProduct[] | null {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && Array.isArray((raw as { products?: unknown }).products)
      ? (raw as { products: unknown[] }).products
      : null;
  if (!list || list.length === 0) return null;
  const out: ShopProduct[] = [];
  for (const r of list) {
    if (!r || typeof r !== "object") return null;
    const o = r as Record<string, unknown>;
    if (typeof o.title !== "string" || typeof o.image !== "string" || typeof o.href !== "string") return null;
    out.push({
      ref: String(o.ref ?? ""),
      title: o.title,
      price: typeof o.price === "string" ? o.price : "",
      category: typeof o.category === "string" ? o.category : "",
      fits: typeof o.fits === "string" ? o.fits : "",
      image: o.image,
      href: o.href,
      available: o.available !== false,
    });
  }
  return out;
}

export default function Parts() {
  // Built-in list is the seed/fallback; the cron-written /shop-products.json overrides it
  // when present (same-origin fetch → no CORS). Cards + JSON-LD both read this state.
  const [products, setProducts] = useState<ShopProduct[]>(SHOP_PRODUCTS);

  useEffect(() => {
    let alive = true;
    fetch("/shop-products.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const next = coerceProducts(data);
        if (alive && next) setProducts(next);
      })
      .catch(() => { /* keep the built-in fallback */ });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "shop-products-jsonld";
    script.textContent = JSON.stringify(buildShopJsonLd(products));
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [products]);

  return (
    <section id="parts" className="section bg-surface-alt">
      <div className="container-x">
        <ScrollReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="kicker mb-4">
                <span className="num">05</span><span className="sep">/</span>GENUINE PARTS · SHOP.AGGDOORS.COM.AU
              </span>
              <h2 className="h-section">Need the part, not the call-out?</h2>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Going the DIY route, or just after a replacement remote, motor or spring kit? The
                official AGG Doors shop stocks <span className="font-semibold text-ink">genuine &amp; compatible parts</span> —
                shipped Australia-wide.
              </p>
            </div>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onShopClick()}
              className="btn-primary shrink-0"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Visit the shop
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

        {/* Category index strip */}
        <ScrollReveal delay={80}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {PARTS.map((part) => {
              const Icon = ICON_MAP[part.icon] ?? Settings;
              return (
                <a
                  key={part.name}
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onShopClick()}
                  className="group flex items-center gap-3 bg-surface px-5 py-4 transition-colors duration-300 hover:bg-surface-alt"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-tint text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink">{part.name}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-ink-light transition-all duration-300 group-hover:text-brand" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Real product catalogue */}
        <div className="mt-12 flex items-center gap-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-mono text-ink-light">POPULAR PARTS — LIVE FROM THE SHOP</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <div data-stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <a
              key={p.ref}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onShopClick(p.ref)}
              className="panel-tick group flex flex-col overflow-hidden rounded-lg border border-border bg-surface-raised shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover"
            >
              {/* Spec strip */}
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-mono text-brand-deep">{p.ref}</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-light">{p.category}</span>
              </div>

              {/* Photo on clean white */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white p-6">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                  draggable={false}
                />
              </div>

              {/* Detail */}
              <div className="flex flex-1 flex-col border-t border-border p-4">
                <h3 className="font-display text-base font-semibold leading-snug text-ink">{p.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-light">Fits: {p.fits}</p>
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3">
                  <span className="font-mono text-base font-bold tabular-nums text-brand-deep">
                    {p.price ? p.price : p.available === false ? "Out of stock" : "View"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink transition-colors duration-300 group-hover:text-brand">
                    Shop
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA band */}
        <ScrollReveal delay={120}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-ink p-7 md:flex-row md:items-center md:p-9">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-mono text-brand-light">
                <Truck className="h-3.5 w-3.5" aria-hidden="true" />
                SHIPPED AUSTRALIA-WIDE
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">Hundreds more in the catalogue.</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Remotes, keypads, motors, springs, cables, rollers and weather seals — genuine and
                compatible. Not sure which one? Send a photo and we'll point you to it.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onShopClick()}
                className="btn justify-center bg-brand text-white hover:bg-brand-light"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Visit the shop
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#contact" className="btn justify-center border border-white/20 text-white hover:border-white/50">
                Ask us which part
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
