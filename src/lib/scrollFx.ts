import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic, accessibility-first scroll rig (pairs with lib/smoothScroll Lenis).
 *
 * Signature feature: a SCROLL-DRIVEN garage-door reveal that IS the hero. The door
 * (`[data-door]` over always-visible hero content) lifts on scrub as the hero pins,
 * then releases into the page. Content is never hidden by JS — the door is overlay-only.
 *
 * Declarative data-API for the rest of the page:
 *   data-fx="reveal" [data-fx-from] [data-fx-delay]   → fade/translate in
 *   data-reveal-img                                    → clip-wipe + zoom on enter
 *   data-parallax [data-speed]                         → layered depth on scroll
 *   data-count [data-count-suffix]                     → number counts up on enter
 *
 * Reduced-motion: no Lenis/pin/parallax; CSS hides the door; everything visible.
 * Fail-safe: any error → reveal all + hide the door (never trap content behind it).
 */
export function initScrollFx(): () => void {
  const root = document.documentElement;

  const revealAll = () => {
    root.classList.remove("fx-ready");
    document.querySelectorAll<HTMLElement>('[data-fx="reveal"]').forEach((el) => { el.style.opacity = "1"; });
    document.querySelectorAll<HTMLElement>('[data-reveal-img]').forEach((el) => { el.style.clipPath = "none"; });
    document.querySelectorAll<HTMLElement>("[data-door]").forEach((el) => { el.style.display = "none"; });
  };

  let ctx: gsap.Context | undefined;

  try {
    root.classList.add("fx-ready");
    ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const REDUCE = "(prefers-reduced-motion: reduce)";
      const OK = "(prefers-reduced-motion: no-preference)";

      mm.add(REDUCE, () => {
        gsap.set('[data-fx="reveal"]', { clearProps: "all", opacity: 1 });
        runCounters();
      });

      mm.add(OK, () => {
        setupReveals();
        setupImageReveals();
        runCounters();
      });

      // Garage-door hero + layered parallax — desktop / precise pointer (with pin)
      mm.add(`${OK} and (min-width: 768px) and (pointer: fine)`, () => {
        setupGarageDoor(true);
        setupParallax(1);
      });
      // Small screens — door opens without a pin (no jank), softened parallax
      mm.add(`${OK} and (max-width: 767px)`, () => {
        setupGarageDoor(false);
        setupParallax(0.45);
      });
      // Large touch — no pin, softened
      mm.add(`${OK} and (min-width: 768px) and (pointer: coarse)`, () => {
        setupGarageDoor(false);
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

/** The scroll-driven sectional garage-door reveal that opens the hero. */
function setupGarageDoor(pin: boolean) {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;
  const panels = gsap.utils.toArray<HTMLElement>("[data-door-panel]", hero);
  if (!panels.length) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: pin ? "+=90%" : "bottom top",
      scrub: true,
      pin,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Panels lift out the top, bottom-first (opening grows from the floor up)
  tl.to(panels, {
    yPercent: -460,
    ease: "none",
    stagger: { each: 0.12, from: "end" },
  }, 0);

  // Cue fades immediately; photo + layers gain depth as the door opens
  tl.to("[data-door-cue]", { opacity: 0, ease: "none", duration: 0.25 }, 0);
  tl.fromTo("[data-hero-photo]", { scale: 1.14 }, { scale: 1, ease: "none" }, 0);
  tl.to("[data-hero-content]", { y: -30, ease: "none" }, 0);
  tl.to("[data-hero-layer]", {
    y: (_i, t) => parseFloat((t as HTMLElement).dataset.depth || "0") * 0.6,
    ease: "none",
  }, 0);
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
