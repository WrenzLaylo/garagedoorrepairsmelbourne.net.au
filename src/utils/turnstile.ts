let turnstileScriptPromise: Promise<void> | null = null;

export function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;

  const existing = document.querySelector<HTMLScriptElement>('script[src*="challenges.cloudflare.com/turnstile/v0/api.js"]');
  if (existing) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      if (window.turnstile) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Cloudflare Turnstile failed to load.")), { once: true });
    });
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "true";
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Cloudflare Turnstile failed to load.")), { once: true });
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

export function getTurnstileResponse(widgetId: string | null, container: HTMLElement | null): string {
  if (window.turnstile?.getResponse && widgetId) {
    return window.turnstile.getResponse(widgetId) || "";
  }
  return container?.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value || "";
}
