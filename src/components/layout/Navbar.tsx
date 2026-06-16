import { Menu, Phone, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { NAV_LINKS, BUSINESS, CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function Navbar({ onCall }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab" && open && menuRef.current) {
        const focusable = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, closeMenu]);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0);
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})`, width: "100%" }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Scroll-reactive header: tall + transparent at top → condensed white bar with hairline */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth-out ${
          scrolled ? "glass border-b border-border shadow-card" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-500 ease-smooth-out ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
          {/* Logo lockup */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-transform duration-300"
            aria-label="Garage Door Repairs Melbourne — back to top"
          >
            <img
              src={BUSINESS.logo}
              alt="Garage Door Repairs Melbourne — powered by AGG Doors"
              className={`shrink-0 object-contain transition-all duration-500 ease-smooth-out ${scrolled ? "h-9 w-9" : "h-11 w-11 md:h-12 md:w-12"}`}
              draggable={false}
            />
            <span className="flex flex-col leading-none">
              <span className={`font-display font-bold tracking-tight text-ink transition-all duration-500 ${scrolled ? "text-sm md:text-base" : "text-base md:text-lg"}`}>
                Garage Door Repairs
              </span>
              <span
                className={`overflow-hidden font-medium uppercase tracking-label text-ink-light transition-all duration-500 ease-smooth-out ${
                  scrolled ? "mt-0 max-h-0 text-[0px] opacity-0" : "mt-1 max-h-4 text-[10px] opacity-100"
                }`}
              >
                Melbourne · by {BUSINESS.parenBrand}
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={CONTACT.phoneTel}
              onClick={onCall}
              className="flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand-deep"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a href="#contact" className="btn-primary text-sm" aria-label="Get a quote">Get a quote</a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={triggerRef}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-all duration-300 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`absolute transition-all duration-300 ease-spring ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
              <Menu className="h-5 w-5" />
            </span>
            <span className={`absolute transition-all duration-300 ease-spring ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}>
              <X className="h-5 w-5" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed right-0 top-0 z-40 flex h-full w-[85%] max-w-sm flex-col border-l border-border bg-surface transition-transform duration-500 ease-smooth-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2.5">
            <img src={BUSINESS.logo} alt="" className="h-8 w-8 object-contain" draggable={false} />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-ink">Garage Door Repairs</span>
              <span className="text-[10px] font-medium uppercase tracking-label text-ink-light">Melbourne · by {BUSINESS.parenBrand}</span>
            </div>
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-light transition-colors duration-200 hover:bg-ink/5"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pt-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-ink-soft transition-all duration-300 hover:bg-surface-alt hover:text-ink"
              style={{
                transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(24px)",
              }}
              onClick={closeMenu}
            >
              <span className="h-1 w-1 rounded-full bg-brand/60 transition-all duration-300 group-hover:w-2 group-hover:bg-brand" />
              {link.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex flex-col gap-2.5">
            <a
              href={CONTACT.phoneTel}
              onClick={() => { onCall(); closeMenu(); }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong px-4 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand-deep"
            >
              <Phone className="h-4 w-4" />
              {CONTACT.phone}
            </a>
            <a href="#contact" className="btn-primary w-full text-sm" onClick={closeMenu}>Get a quote</a>
          </div>
        </div>
      </div>
    </>
  );
}
