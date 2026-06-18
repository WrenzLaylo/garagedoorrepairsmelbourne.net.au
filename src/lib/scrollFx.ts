import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic, accessibility-first scroll rig (pairs with lib/smoothScroll Lenis).
 *
 * The hero intro is a looping 3D garage-parts backdrop (see lib/heroParts3D), mounted
 * by Hero.tsx — it is NOT scroll-driven and never covers the hero content.
 *
 * Declarative data-API for the rest of the page:
 *   data-fx="reveal" [data-fx-from] [data-fx-delay]   → fade/translate in
 *   data-reveal-img                                    → clip-wipe + zoom on enter
 *   data-parallax [data-speed]                         → layered depth on scroll
 *   data-count [data-count-suffix]                     → number counts up on enter
 *
 * Garage-door motion language continued through the page:
 *   data-stagger                → children lift in sequence like sectional panels
 *   data-panel-reveal           → single element rises + clip-wipes up like a panel
 *   data-track-reveal           → a rail/track line draws in
 *   data-rail                   → How-It-Works roller scrubs along its track
 *   data-door-open              → final CTA: a steel valance lifts to bright light
 *
 * Reduced-motion: no Lenis/parallax; everything visible.
 * Fail-safe: any error → reveal all (never trap content at opacity 0).
 */
const observers: MutationObserver[] = [];

export function initScrollFx(): () => void {
  const root = document.documentElement;

  const revealAll = () => {
    root.classList.remove("fx-ready");
    observers.forEach((o) => o.disconnect());
    observers.length = 0;
    document.querySelectorAll<HTMLElement>('[data-fx="reveal"], [data-panel-reveal]').forEach((el) => { el.style.opacity = "1"; });
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((c) => {
      Array.from(c.children).forEach((el) => { (el as HTMLElement).style.opacity = "1"; (el as HTMLElement).style.clipPath = "none"; (el as HTMLElement).style.transform = "none"; });
    });
    document.querySelectorAll<HTMLElement>('[data-reveal-img]').forEach((el) => { el.style.clipPath = "none"; });
    document.querySelectorAll<HTMLElement>(".door-open-overlay, .door-open-glow").forEach((el) => { el.remove(); });
  };

  let ctx: gsap.Context | undefined;

  try {
    root.classList.add("fx-ready");
    ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const REDUCE = "(prefers-reduced-motion: reduce)";
      const OK = "(prefers-reduced-motion: no-preference)";

      mm.add(REDUCE, () => {
        gsap.set('[data-fx="reveal"], [data-panel-reveal]', { clearProps: "all", opacity: 1 });
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((c) => gsap.set(Array.from(c.children), { clearProps: "all", opacity: 1 }));
        runCounters();
      });

      mm.add(OK, () => {
        setupReveals();
        setupImageReveals();
        setupPanelReveals();
        setupStagger();
        setupTrackReveals();
        setupRails();
        setupDoorOpen();
        runCounters();
      });

      // Layered parallax — desktop / precise pointer
      mm.add(`${OK} and (min-width: 768px) and (pointer: fine)`, () => {
        setupParallax(1);
      });
      // Small screens — softened parallax
      mm.add(`${OK} and (max-width: 767px)`, () => {
        setupParallax(0.45);
      });
      // Large touch — softened
      mm.add(`${OK} and (min-width: 768px) and (pointer: coarse)`, () => {
        setupParallax(0.5);
      });
    });
  } catch {
    revealAll();
  }

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  const fontset = (document as Document & { fonts?: FontFaceSet }).fonts;
  fontset?.ready.then(refresh).catch(() => {});

  return () => {
    window.removeEventListener("load", refresh);
    ctx?.revert();
    root.classList.remove("fx-ready");
  };
}

function setupReveals() {
  gsap.utils.toArray<HTMLElement>('[data-fx="reveal"]').forEach((el) => {
    const from = el.dataset.fxFrom;
    const delay = parseFloat(el.dataset.fxDelay || "0");
    const start: gsap.TweenVars = { opacity: 0, willChange: "transform, opacity" };
    if (from === "left") start.x = -30;
    else if (from === "right") start.x = 30;
    else if (from === "scale") start.scale = 0.96;
    else start.y = 30;

    gsap.fromTo(el, start, {
      opacity: 1, x: 0, y: 0, scale: 1,
      duration: 0.75, delay, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onComplete: () => gsap.set(el, { willChange: "auto" }),
    });
  });
}

function setupImageReveals() {
  gsap.utils.toArray<HTMLElement>("[data-reveal-img]").forEach((el) => {
    const img = el.querySelector<HTMLElement>("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    tl.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.inOut" });
    if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.2, ease: "power3.out" }, 0);
  });
}

/** Single element rises + clip-wipes upward like a sectional panel lifting.
 *  fromTo's immediateRender hides it ONLY once this trigger is built — fail-open. */
function setupPanelReveals() {
  gsap.utils.toArray<HTMLElement>("[data-panel-reveal]").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 56, clipPath: "inset(0 0 100% 0)", willChange: "transform, clip-path, opacity" },
      {
        opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
        duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onComplete: () => gsap.set(el, { clearProps: "clipPath,willChange" }),
      });
  });
}

/** Children of [data-stagger] lift + uncover in sequence, like door panels rising.
 *  Each batch is only hidden the moment its tween/trigger is created (fail-open). */
function setupStagger() {
  const reveal = (items: Element[], stagger: number, scrollTrigger?: ScrollTrigger.Vars) => {
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 52, clipPath: "inset(0 0 100% 0)" },
      {
        opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
        duration: 0.8, ease: "power3.out",
        stagger: { each: stagger, from: "start" },
        ...(scrollTrigger ? { scrollTrigger } : {}),
        onComplete: () => gsap.set(items, { clearProps: "clipPath" }),
      });
  };

  gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
    reveal(Array.from(container.children), 0.1, { trigger: container, start: "top 84%", once: true });

    // Re-animate items added later (e.g. when a filter swaps the card set).
    const mo = new MutationObserver((mutations) => {
      const added: Element[] = [];
      mutations.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) added.push(n as Element); }));
      if (added.length) reveal(added, 0.07);
    });
    mo.observe(container, { childList: true });
    observers.push(mo);
  });
}

/** A rail/track line draws in from its leading edge (horizontal or vertical). */
function setupTrackReveals() {
  gsap.utils.toArray<HTMLElement>("[data-track-reveal]").forEach((el) => {
    const vertical = el.offsetHeight > el.offsetWidth;
    gsap.fromTo(el,
      vertical ? { scaleY: 0, transformOrigin: "top" } : { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1, scaleY: 1,
        duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
  });
}

/** How-It-Works: a roller scrubs along the rail and the fill grows as you scroll. */
function setupRails() {
  gsap.utils.toArray<HTMLElement>("[data-rail]").forEach((rail) => {
    const fill = rail.querySelector<HTMLElement>("[data-rail-fill]");
    const roller = rail.querySelector<HTMLElement>("[data-rail-roller]");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: rail, start: "top 78%", end: "bottom 55%", scrub: true },
    });
    if (fill) tl.fromTo(fill, { width: "0%" }, { width: "100%", ease: "none" }, 0);
    if (roller) tl.fromTo(roller, { left: "0%", xPercent: -50 }, { left: "100%", xPercent: -50, ease: "none" }, 0);
  });
}

/** Final CTA: a slim steel valance (door header) lifts away with a light bloom —
 *  a premium reveal into the action, not a giant grey wall. Fully fail-open. */
function setupDoorOpen() {
  gsap.utils.toArray<HTMLElement>("[data-door-open]").forEach((el) => {
    if (getComputedStyle(el).position === "static") el.style.position = "relative";

    const glow = document.createElement("div");
    glow.className = "door-open-glow";
    const overlay = document.createElement("div");
    overlay.className = "door-open-overlay";
    const valance = document.createElement("i");
    valance.className = "door-open-valance";
    overlay.append(valance);
    el.append(glow, overlay);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 88%", end: "top 42%", scrub: 0.6 },
    });
    tl.fromTo(valance, { yPercent: 0 }, { yPercent: -100, ease: "none" }, 0)
      .fromTo(glow, { opacity: 0 }, { opacity: 0.6, ease: "none" }, 0)
      .to(glow, { opacity: 0, ease: "none" }, 0.55);
    // Remove the overlay once open so nothing is ever intercepted.
    ScrollTrigger.create({
      trigger: el, start: "top 42%",
      onEnter: () => { overlay.remove(); glow.remove(); },
    });
  });
}

function setupParallax(scale: number) {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed || "-0.18") * scale;
    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
}

function runCounters() {
  gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count || "0");
    const suffix = el.dataset.countSuffix || "";
    const prefix = el.dataset.countPrefix || "";
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: end, duration: 1.6, ease: "power2.out",
          onUpdate: () => { el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`; },
        });
      },
    });
  });
}
