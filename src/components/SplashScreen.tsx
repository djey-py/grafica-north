import { useEffect, useState } from "react";

const DISPLAY_MS = 1350;
const EXIT_MS = 420;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setLeaving(true), DISPLAY_MS);
    const removeTimer = window.setTimeout(
      () => setVisible(false),
      DISPLAY_MS + EXIT_MS,
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`splash-screen${leaving ? " splash-screen--leaving" : ""}`}
      role="status"
      aria-label="A carregar o site da Gráfica Noreth"
      aria-live="polite"
    >
      <div className="splash-screen-glow" aria-hidden="true" />
      <div className="splash-screen-content">
        <img
          className="splash-screen-logo"
          src="/logo-grafica-noreth.png"
          alt="Gráfica Noreth"
          width="720"
          height="373"
          fetchPriority="high"
        />
        <span className="splash-screen-tagline">Impressão · Personalização · Comércio</span>
        <span className="splash-screen-loader" aria-hidden="true"><span /></span>
      </div>
    </div>
  );
}
