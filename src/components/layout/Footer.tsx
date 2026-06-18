import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, CONTACT, NAV_LINKS, PARENT_BRAND } from "../../constants";

const FOOTER_SERVICES = [
  "New Door Supply & Install",
  "Garage Door Repairs",
  "Motors & Automation",
  "Springs, Cables & Tracks",
  "Remotes & Wall Controls",
  "Emergency Repairs",
  "Preventative Maintenance",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border bg-surface-alt pt-16 pb-24 md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="#top"
              className="mb-6 inline-flex items-center gap-3"
              aria-label="Garage Door Repairs Melbourne - back to top"
            >
              <img
                src={BUSINESS.logo}
                alt="Garage Door Repairs Melbourne - powered by AGG Doors"
                className="h-11 w-11 object-contain"
                draggable={false}
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-ink">
                  Garage Door Repairs
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-label text-ink-light">
                  Melbourne by {BUSINESS.parenBrand}
                </span>
              </span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Fast, honest garage door repairs across Melbourne - springs,
              cables, tracks, motors, remotes and emergency call-outs, backed by{" "}
              <a
                href={BUSINESS.parentBrandUrl}
                className="font-semibold text-brand-deep hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {BUSINESS.parenBrand}
              </a>
              , in business since {BUSINESS.founded}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-soft">
              <a
                href={CONTACT.phoneTel}
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-brand-deep"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-brand-deep"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 font-mono text-[11px] font-bold uppercase tracking-mono text-ink-light">
              [ SERVICES ]
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-ink-soft transition-colors duration-300 hover:text-brand-deep"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-mono text-[11px] font-bold uppercase tracking-mono text-ink-light">
              [ CONTACT ]
            </h3>
            <ul className="space-y-3.5 text-sm text-ink-soft">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <a
                    href={CONTACT.phoneTel}
                    className="transition-colors duration-300 hover:text-brand-deep"
                  >
                    {CONTACT.phone}
                  </a>
                  <span className="text-xs text-ink-light">
                    Mon-Fri 8am-5pm
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <a
                    href={CONTACT.emergencyTel}
                    className="font-semibold text-accent-dark transition-colors duration-300 hover:text-accent"
                  >
                    {CONTACT.emergencyPhone}
                  </a>
                  <span className="text-xs text-ink-light">24/7 Emergency</span>
                </div>
              </li>
            </ul>

            <div className="mt-5 rounded-md border border-accent/20 bg-accent/[0.06] p-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent-dark">
                EMERGENCY?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Door stuck, off track or unsafe? Call our 24/7 line immediately.
              </p>
              <a
                href={CONTACT.emergencyTel}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark transition-all duration-300 hover:gap-2.5"
              >
                <Phone className="h-3 w-3" />
                Call {CONTACT.emergencyPhone}
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 rule" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-ink-light">
            &copy; {year} {BUSINESS.parenBrand}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-5" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-light transition-colors duration-300 hover:text-brand-deep"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Powered by AGG Doors */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-mono text-ink-light">
            POWERED BY
          </p>
          <a
            href={BUSINESS.parentBrandUrl}
            className="group inline-flex w-fit items-center rounded-lg bg-ink px-6 py-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by AGG Doors - open AGG Doors website"
          >
            <img
              src="/assets/powered-by-aggdoors.png"
              alt="Powered by AGG Doors"
              className="h-10 w-auto"
              draggable={false}
            />
          </a>
          <p className="max-w-3xl text-xs leading-6 text-ink-light">
            {PARENT_BRAND.legalName} &bull; ABN {PARENT_BRAND.abn} &bull;{" "}
            {PARENT_BRAND.address} &bull;{" "}
            <a
              href={PARENT_BRAND.shopUrl}
              className="font-semibold text-brand-deep transition-colors duration-300 hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              AGG Doors Shop
            </a>
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="group absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-raised text-ink-soft shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand-deep md:bottom-8 md:right-8"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}
