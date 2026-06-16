import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number; // milliseconds
  direction?: "up" | "left" | "right" | "scale";
}

/**
 * Declarative wrapper that hands off to the global GSAP rig (see lib/scrollFx).
 * Renders only data attributes — the rig drives the actual animation, honours
 * reduced-motion, and the element stays fully visible if JS never runs.
 */
export default function ScrollReveal({
  children,
  className,
  delay,
  direction = "up",
}: Props) {
  const from = direction === "up" ? undefined : direction;
  return (
    <div
      data-fx="reveal"
      data-fx-from={from}
      data-fx-delay={delay ? (delay / 1000).toFixed(2) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
