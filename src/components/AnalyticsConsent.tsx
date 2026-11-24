import { useEffect, useState } from "react";
import {
  denyAnalyticsConsent,
  getAnalyticsConsent,
  grantAnalyticsConsent,
  hasAnalyticsConfiguration,
} from "../utils/analytics";

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(getAnalyticsConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const syncChoice = () => {
      setChoice(getAnalyticsConsent());
      setPreferencesOpen(false);
    };
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener("noreth:analytics-consent-updated", syncChoice);
    window.addEventListener("noreth:open-analytics-preferences", openPreferences);
    return () => {
      window.removeEventListener("noreth:analytics-consent-updated", syncChoice);
      window.removeEventListener("noreth:open-analytics-preferences", openPreferences);
    };
  }, []);

  if (!hasAnalyticsConfiguration || (choice && !preferencesOpen)) return null;

  return (
    <aside
      aria-label="Preferências de análise de tráfego"
      className="fixed inset-x-3 bottom-3 z-[65] mx-auto max-w-3xl rounded-2xl border border-line bg-ink/95 p-5 shadow-2xl backdrop-blur-xl md:bottom-5 md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-sm font-bold text-white">Preferências de privacidade</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Com a sua autorização, usamos o Google Analytics para medir visitas e melhorar o site. A análise fica desativada até escolher. Pode alterar esta opção mais tarde no rodapé.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => { denyAnalyticsConsent(); setChoice("denied"); setPreferencesOpen(false); }} className="btn btn-ghost min-h-10 px-4 py-2 text-xs">
            Recusar
          </button>
          <button type="button" onClick={() => { grantAnalyticsConsent(); setChoice("granted"); setPreferencesOpen(false); }} className="btn btn-primary min-h-10 px-4 py-2 text-xs">
            Aceitar análise
          </button>
        </div>
      </div>
    </aside>
  );
}
