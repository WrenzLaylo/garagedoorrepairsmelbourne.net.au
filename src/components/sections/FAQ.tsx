import { useState, useMemo, useRef } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { FAQS, CONTACT, type FaqTag } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const FAQ_TAGS = ["Pricing", "Timing", "Emergency", "Safety", "Brands", "Warranty"] as const satisfies readonly FaqTag[];

// Unified, on-brand tag styling. "Emergency" gets the orange accent (it's the
// one urgency cue we allow); every other tag shares the steel-blue brand chip.
type TagStyle = { bg: string; text: string; activeBg: string; activeText: string; border: string };
const BRAND_TAG: TagStyle = { bg: "bg-brand/[0.10]", text: "text-brand", activeBg: "bg-brand", activeText: "text-ink-inverse", border: "border-brand/25" };
const ACCENT_TAG: TagStyle = { bg: "bg-accent/[0.07]", text: "text-accent-dark", activeBg: "bg-accent", activeText: "text-white", border: "border-accent/20" };
const TAG_COLORS: Record<FaqTag, TagStyle> = {
  "Pricing":   BRAND_TAG,
  "Timing":    BRAND_TAG,
  "Emergency": ACCENT_TAG,
  "Safety":    ACCENT_TAG,
  "Brands":    BRAND_TAG,
  "Warranty":  BRAND_TAG,
};

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="rounded bg-brand/15 px-0.5 text-brand not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<FaqTag | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const faqsWithMeta = FAQS.map((faq, i) => ({
    ...faq,
    originalIndex: i,
  }));

  const filtered = useMemo(() => {
    return faqsWithMeta.filter((faq) => {
      const matchesTag = !activeTag || faq.tag === activeTag;
      const q = query.toLowerCase();
      const matchesSearch =
        !q ||
        faq.q.toLowerCase().includes(q) ||
        faq.a.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [query, activeTag]);

  const clearSearch = () => {
    setQuery("");
    searchRef.current?.focus();
  };

  const hasFilters = query.trim() || activeTag;

  return (
    <section id="faq" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="kicker mb-4 justify-center">
            <span className="num">07</span><span className="sep">/</span>FAQ
          </span>
          <h2 className="h-section">Specs &amp; answers.</h2>
          <p className="mt-4 text-base text-ink-soft">
            Everything you need to know before booking. Can&apos;t find your
            answer below?{" "}
            <a href={CONTACT.phoneTel} className="font-semibold text-brand hover:underline">
              Call us directly
            </a>
            .
          </p>
        </ScrollReveal>

        {/* Search + tag filters */}
        <ScrollReveal className="mx-auto mt-10 max-w-2xl" delay={80}>
          {/* Search input */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light"
              aria-hidden="true"
            />
            <input
              ref={searchRef}
              type="search"
              placeholder="Search questions…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenIndex(null);
              }}
              className="w-full rounded-md border border-border bg-surface-raised py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-light transition-all duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15 hover:border-brand/30"
              aria-label="Search frequently asked questions"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-light transition-colors hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Tag pills */}
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {FAQ_TAGS.map((tag) => {
              const colors = TAG_COLORS[tag];
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTag(isActive ? null : tag);
                    setOpenIndex(null);
                  }}
                  className={`rounded-md border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-y-0.5 ${
                    isActive
                      ? `${colors.activeBg} ${colors.activeText} border-transparent shadow-sm`
                      : `${colors.bg} ${colors.text} ${colors.border} hover:opacity-80`
                  }`}
                  aria-pressed={isActive}
                >
                  {tag}
                </button>
              );
            })}
            {hasFilters && (
              <button
                onClick={() => { setQuery(""); setActiveTag(null); setOpenIndex(0); }}
                className="rounded-full border border-dashed border-ink-light/40 px-3 py-1 text-xs font-medium text-ink-light transition-all hover:border-ink-soft hover:text-ink-soft"
              >
                Clear all ×
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Results */}
        <div className="mx-auto mt-8 max-w-2xl">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-14 text-center">
              <p className="text-sm font-medium text-ink-soft">No questions match &ldquo;{query}&rdquo;</p>
              <button
                onClick={() => { setQuery(""); setActiveTag(null); }}
                className="mt-3 text-sm font-semibold text-brand hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {filtered.map((faq, idx) => {
                const isOpen = openIndex === faq.originalIndex;
                const colors = TAG_COLORS[faq.tag];
                return (
                  <div
                    key={faq.originalIndex}
                    className={`group border-b border-border last:border-b-0 transition-colors duration-300 ${
                      isOpen ? "border-l-2 border-l-brand pl-4" : "border-l-2 border-l-transparent pl-4"
                    }`}
                    style={{ animation: `fadeIn 0.2s ease ${idx * 40}ms both` }}
                  >
                    <button
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 group-hover:text-brand"
                      onClick={() => setOpenIndex(isOpen ? null : faq.originalIndex)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.originalIndex}`}
                      id={`faq-question-${faq.originalIndex}`}
                    >
                      <div className="flex min-w-0 flex-col gap-1.5">
                        {/* Tag badge */}
                        <span
                          className={`inline-flex w-fit rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {faq.tag}
                        </span>
                        <span
                          className={`font-display text-base font-semibold transition-colors duration-200 ${
                            isOpen ? "text-brand" : "text-ink"
                          } group-hover:text-brand`}
                        >
                          {highlight(faq.q, query)}
                        </span>
                      </div>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                          isOpen
                            ? "bg-brand/10 text-brand rotate-180"
                            : "bg-surface-alt text-ink-light group-hover:bg-brand/10 group-hover:text-brand"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${faq.originalIndex}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.originalIndex}`}
                      className={`accordion-content ${isOpen ? "open" : ""}`}
                    >
                      <div>
                        <div className="pb-5 text-sm leading-relaxed text-ink-soft">
                          {highlight(faq.a, query)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Result count when filtering */}
              {hasFilters && (
                <p className="mt-4 text-center text-xs text-ink-light">
                  {filtered.length} of {FAQS.length} questions
                  {" · "}
                  <button
                    onClick={() => { setQuery(""); setActiveTag(null); setOpenIndex(0); }}
                    className="font-semibold text-brand hover:underline"
                  >
                    Show all
                  </button>
                </p>
              )}
            </>
          )}
        </div>

        <ScrollReveal className="mx-auto mt-12 max-w-xl">
          <div className="panel-tick group relative overflow-hidden rounded-lg border border-border bg-surface-alt p-8 text-center transition-all duration-300 hover:border-brand/30 hover:shadow-card-hover">
            <div className="relative">
              <span className="font-mono text-[11px] font-bold uppercase tracking-mono text-brand-deep">STILL STUCK?</span>
              <p className="mt-2 font-display text-lg font-semibold text-ink">Talk to a technician.</p>
              <p className="mt-2 text-sm text-ink-soft">
                Available Mon–Fri 8am–5pm, and 24/7 for emergencies.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href={CONTACT.phoneTel} className="btn-call text-sm">Call {CONTACT.phone}</a>
                <a href="#contact" className="btn-ghost text-sm">Get a free quote</a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
