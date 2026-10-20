import { useEffect, useState } from "react";
import { MESSAGES, WHATSAPP_DISPLAY, whatsappUrl } from "../utils/whatsapp";
import { WhatsAppIcon } from "./BrandIcons";

/**
 * Botão flutuante de WhatsApp — sempre acessível, com tooltip no desktop
 * e área de toque confortável no mobile.
 */
export default function WhatsAppButton() {
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLabel(true), 1600);
    const hide = window.setTimeout(() => setShowLabel(false), 7000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <a
      href={whatsappUrl(MESSAGES.geral)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Gráfica Noreth pelo WhatsApp"
      title="Falar com a Gráfica Noreth pelo WhatsApp"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-3 md:right-6 md:bottom-6"
    >
      <span
        aria-hidden="true"
        className={`hidden rounded-full border border-white/10 bg-panel/95 py-2 pr-4 pl-3.5 text-sm font-semibold text-white shadow-xl shadow-black/40 backdrop-blur transition-all duration-500 md:block ${
          showLabel ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0"
        }`}
      >
        Falar com a Gráfica Noreth
        <span className="mt-0.5 block text-[0.6875rem] font-medium text-muted">
          {WHATSAPP_DISPLAY}
        </span>
      </span>
      <span className="pulse-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4BE389] via-[#25D366] to-[#0FA958] text-[#04240F] shadow-[0_16px_38px_-12px_rgba(37,211,102,0.75)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
