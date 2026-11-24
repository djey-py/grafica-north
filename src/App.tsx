import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import seoPages from "./data/seo-pages.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Equipamentos from "./pages/Equipamentos";
import Personalizados from "./pages/Personalizados";
import Solucoes from "./pages/Solucoes";
import Sobre from "./pages/Sobre";
import Contactos from "./pages/Contactos";
import NotFound from "./pages/NotFound";
import AnalyticsConsent from "./components/AnalyticsConsent";
import { trackEvent, trackPageView } from "./utils/analytics";

const SEO = Object.fromEntries(seoPages.map((page) => [page.path, page])) as Record<
  string,
  { title: string; description: string }
>;
const SITE_ORIGIN = "https://grafica-north.vercel.app";

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

function TrackInteractions() {
  useEffect(() => {
    const startedForms = new WeakSet<HTMLFormElement>();
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const label = anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 100) || "link";
      const linkUrl = new URL(href, window.location.href);
      const host = linkUrl.hostname.toLowerCase();
      if (linkUrl.protocol === "https:" && host === "wa.me") {
        trackEvent("click_whatsapp", { link_text: label });
      } else if (linkUrl.protocol === "tel:" || linkUrl.protocol === "mailto:") {
        trackEvent("click_contact", { contact_method: linkUrl.protocol === "tel:" ? "phone" : "email", link_text: label });
      } else if (["facebook.com", "instagram.com", "linkedin.com", "youtube.com", "tiktok.com"].some((domain) => host === domain || host.endsWith(`.${domain}`))) {
        trackEvent("social_media_click", { platform: host.split(".").slice(-2).join("."), link_text: label });
      }

      const eventName = anchor.dataset.analyticsEvent;
      if (eventName === "click_course" || eventName === "click_inscription") {
        trackEvent(eventName, { link_text: label });
      }
    };
    const onFormStart = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const form = target.closest("form");
      if (!form || startedForms.has(form)) return;
      startedForms.add(form);
      trackEvent("form_start", { form_id: form.id || "contact" });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFormStart);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFormStart);
    };
  }, []);
  return null;
}

function LegacyHashRouteRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash.startsWith("#/")) return;
    navigate(`${location.hash.slice(1)}${location.search}`, { replace: true });
  }, [location.hash, location.pathname, location.search, navigate]);

  return null;
}

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const meta = SEO[location.pathname];
    const isNotFound = !meta;
    const title = meta?.title ?? "404 — Página não encontrada | Gráfica Noreth";
    const description = meta?.description ?? "A página que procura não existe ou foi movida. Volte ao site da Gráfica Noreth.";
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", isNotFound ? "noindex,follow" : "index,follow,max-image-preview:large");
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    const canonicalUrl = new URL(location.pathname, SITE_ORIGIN).href;
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (isNotFound) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
    trackPageView(title);

    // Âncora interna (ex.: /personalizados#tecnicas)
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        window.requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LegacyHashRouteRedirect />
      <RouteEffects />
      <TrackInteractions />
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("conteudo");
          main?.focus();
          main?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-ink"
      >
        Saltar para o conteúdo principal
      </button>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipamentos" element={<Equipamentos />} />
            <Route path="/personalizados" element={<Personalizados />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <WhatsAppButton />
      <AnalyticsConsent />
    </BrowserRouter>
  );
}
