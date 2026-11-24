export type AnalyticsEventName =
  | "page_view"
  | "click_inscription"
  | "click_course"
  | "click_contact"
  | "click_whatsapp"
  | "form_start"
  | "form_submit"
  | "social_media_click";

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim();
export const hasAnalyticsConfiguration = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);
const CONSENT_KEY = "noreth_analytics_consent";
let scriptLoaded = false;
let lastPageView = "";

function getGtag(): ((...args: unknown[]) => void) | undefined {
  return window.gtag;
}

export function getAnalyticsConsent(): "granted" | "denied" | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function loadGoogleTag(): void {
  if (!hasAnalyticsConfiguration || scriptLoaded) return;
  scriptLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  script.dataset.norethAnalytics = "true";
  document.head.appendChild(script);
}

export function trackEvent(
  eventName: AnalyticsEventName,
  parameters: Record<string, string | number | boolean> = {},
): void {
  if (!hasAnalyticsConfiguration || getAnalyticsConsent() !== "granted") return;
  loadGoogleTag();
  getGtag()?.("event", eventName, parameters);
}

export function trackPageView(title = document.title): void {
  const pageLocation = window.location.href;
  if (lastPageView === pageLocation) return;
  lastPageView = pageLocation;
  trackEvent("page_view", {
    page_title: title,
    page_location: pageLocation,
    page_path: `${window.location.pathname}${window.location.hash}`,
  });
}

export function grantAnalyticsConsent(): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, "granted");
  } catch {
    // Analytics stays unavailable if the browser blocks persistent storage.
    return;
  }
  loadGoogleTag();
  lastPageView = "";
  trackPageView();
  window.dispatchEvent(new Event("noreth:analytics-consent-updated"));
}

export function denyAnalyticsConsent(): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, "denied");
  } catch {
    // The opt-out still applies for this page load.
  }
  if (scriptLoaded) {
    getGtag()?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  window.dispatchEvent(new Event("noreth:analytics-consent-updated"));
}

export function openAnalyticsPreferences(): void {
  window.dispatchEvent(new Event("noreth:open-analytics-preferences"));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
