import ScrollReveal from "../ui/ScrollReveal";

const BRANDS = ["B&D", "Dominator", "Merlin", "Gliderol", "Centurion", "ATA"];

export default function TrustBadges() {
  return (
    <section className="border-b border-border bg-surface py-12 md:py-14">
      <div className="container-x">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <p className="shrink-0 text-center text-xs font-semibold uppercase tracking-label text-ink-light lg:max-w-[12rem] lg:text-left">
              Authorised to service &amp; repair all major brands
            </p>
            <div className="h-px w-full bg-border lg:h-10 lg:w-px" aria-hidden="true" />
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
              {BRANDS.map((name) => (
                <span
                  key={name}
                  className="font-display text-xl font-bold tracking-tight text-ink-light transition-colors duration-200 hover:text-brand"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
