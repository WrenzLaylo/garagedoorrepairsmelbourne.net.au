import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth/inertia scrolling, bridged to GSAP ScrollTrigger — the momentum
 * that makes the parallax read as "cinematic" rather than steppy.
 *
 * Disabled entirely under prefers-reduced-motion (returns a no-op cleanup), so
 * the page keeps native, accessible scrolling.
 */
export function initSmoothScroll(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(onTick);
    lenis.destroy();
  };
}
