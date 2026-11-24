import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Gift,
  Sparkles,
} from "lucide-react";
import WhatsAppLink from "./WhatsAppLink";

// Luanda is UTC+1 year-round: midnight on 1 December 2026 is 23:00 UTC on 30 November.
export const CHRISTMAS_REVEAL_AT = Date.parse("2026-11-30T23:00:00.000Z");

const CHRISTMAS_ITEMS = [
  { image: "natal-01.webp", title: "Agenda corporativa", kind: "Brinde de Natal" },
  { image: "natal-02.webp", title: "T-shirt de Natal", kind: "Vestuário personalizado" },
  { image: "natal-03.webp", title: "Body de bebé", kind: "Vestuário personalizado" },
  { image: "natal-04.webp", title: "T-shirt Feliz Natal", kind: "Vestuário personalizado" },
  { image: "natal-05.webp", title: "Kit de t-shirts familiar", kind: "Vestuário personalizado" },
  { image: "natal-06.webp", title: "Neste Natal", kind: "Mensagem de Natal" },
  { image: "natal-07.webp", title: "T-shirt Merry Christmas", kind: "Vestuário personalizado" },
  { image: "natal-08.webp", title: "Impressoras Epson", kind: "Equipamento gráfico" },
  { image: "natal-09.webp", title: "Máquina de gravação a laser 20W", kind: "Equipamento gráfico" },
  { image: "natal-10.webp", title: "Máquina de laminação A4", kind: "Equipamento gráfico" },
  { image: "natal-11.webp", title: "Máquina de flash carimbo", kind: "Equipamento gráfico" },
  { image: "natal-12.webp", title: "Prensa térmica de chapéu", kind: "Equipamento gráfico" },
  { image: "natal-13.webp", title: "Prensa térmica plana 8 em 1", kind: "Equipamento gráfico" },
  { image: "natal-14.webp", title: "Prensa cilíndrica dupla", kind: "Equipamento gráfico" },
  { image: "natal-15.webp", title: "Prensa térmica cilíndrica", kind: "Equipamento gráfico" },
  { image: "natal-16.webp", title: "Prensa térmica plana 12 × 12", kind: "Equipamento gráfico" },
  { image: "natal-17.webp", title: "Prensa térmica plana 38 × 38", kind: "Equipamento gráfico" },
  { image: "natal-18.webp", title: "Prensa térmica para personalização", kind: "Equipamento gráfico" },
  { image: "natal-19.webp", title: "Impressora UV DTF Locor 30 cm", kind: "Equipamento gráfico" },
  { image: "natal-20.webp", title: "Prensa térmica plana 38 × 38", kind: "Equipamento gráfico" },
];

function getCountdown(now: number) {
  const remaining = Math.max(0, CHRISTMAS_REVEAL_AT - now);
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

const COUNTDOWN_UNITS = [
  { key: "days", label: "dias" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "minutos" },
  { key: "seconds", label: "segundos" },
] as const;

export default function ChristmasSection() {
  const [now, setNow] = useState(() => Date.now());
  const [previewOverride, setPreviewOverride] = useState(false);
  const testMode = new URLSearchParams(window.location.search).get("natal-test") === "1";
  const released = now >= CHRISTMAS_REVEAL_AT || (testMode && previewOverride);
  const countdown = getCountdown(now);

  useEffect(() => {
    if (released) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [released]);

  return (
    <section
      id="surpresa-de-natal"
      className="christmas-section relative isolate overflow-hidden border-y border-amber-200/20 py-20 md:py-28"
      aria-labelledby="christmas-title"
      data-release-at="2026-12-01T00:00:00+01:00"
    >
      <div aria-hidden="true" className="christmas-glow" />
      <div aria-hidden="true" className="christmas-garland">
        <span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span>
      </div>

      <div className="shell relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="christmas-kicker">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Uma surpresa especial da Gráfica Noreth
          </span>
          <h2
            id="christmas-title"
            className="mx-auto mt-5 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[0.98] tracking-tight text-white"
          >
            O Natal vai chegar <span className="christmas-title-accent">mais especial.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Estamos a preparar uma surpresa de Natal para si, com presentes personalizados,
            ideias para toda a família e oportunidades especiais para o seu negócio.
          </p>
        </div>

        {!released ? (
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="christmas-countdown-card">
              <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-amber-100/90">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                A surpresa abre em
              </div>
              <div
                className="mt-6 grid grid-cols-4 gap-2 sm:gap-4"
                aria-label={`${countdown.days} dias, ${countdown.hours} horas, ${countdown.minutes} minutos e ${countdown.seconds} segundos`}
              >
                {COUNTDOWN_UNITS.map(({ key, label }) => (
                  <div key={key} className="christmas-countdown-unit">
                    <span className="block font-black tabular-nums text-white">
                      {String(countdown[key]).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/60 sm:text-xs">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-4 py-2 text-xs text-white/70 sm:text-sm">
                <CalendarDays className="h-4 w-4 text-amber-200" aria-hidden="true" />
                1 de dezembro de 2026, à meia-noite (hora de Luanda)
              </div>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-white/55">
              <Gift className="h-4 w-4 text-amber-200" aria-hidden="true" />
              Guarde esta data. Estamos a preparar tudo com carinho.
            </p>
            {testMode ? (
              <button
                type="button"
                className="christmas-test-button mt-6"
                aria-pressed={previewOverride}
                onClick={() => setPreviewOverride(true)}
              >
                Pré-visualizar a surpresa (teste)
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        ) : (
          <div data-christmas-content className="mt-12" aria-live="polite">
            {testMode && previewOverride && now < CHRISTMAS_REVEAL_AT ? (
              <div className="christmas-test-notice" role="status">
                <span>Pré-visualização de teste — o temporizador real não foi alterado.</span>
                <button type="button" onClick={() => setPreviewOverride(false)}>
                  Voltar à contagem
                </button>
              </div>
            ) : null}
            <div className="mx-auto mb-9 flex max-w-3xl flex-col items-center gap-4 text-center">
              <span className="christmas-open-badge">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                A surpresa já chegou!
              </span>
              <p className="max-w-2xl text-white/75">
                Descubra as ideias e ofertas especiais de Natal preparadas pela nossa equipa.
                Consulte os cartazes completos e fale connosco para confirmar disponibilidade.
              </p>
              <a href="#natal-ofertas" className="christmas-scroll-link">
                Descobrir a surpresa <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div id="natal-ofertas" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CHRISTMAS_ITEMS.map((item, index) => (
                <article
                  key={item.image}
                  className="christmas-product-card"
                  style={{ animationDelay: `${Math.min(index * 45, 500)}ms` }}
                >
                  <div className="christmas-product-image">
                    <img
                      src={`/images/natal/${item.image}`}
                      alt={`Cartaz de Natal da Gráfica Noreth: ${item.title}`}
                      width={index < 7 ? 1120 : 1400}
                      height={1400}
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <span className="christmas-product-kind">{item.kind}</span>
                  </div>
                  <div className="flex min-h-[4.5rem] items-center justify-between gap-3 p-4">
                    <h3 className="text-sm font-bold leading-snug text-white">{item.title}</h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-amber-200/80" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="mb-4 text-sm text-white/65">Gostou de alguma ideia? Encomende ou peça mais informações.</p>
              <WhatsAppLink message="Olá, Gráfica Noreth! Vi a surpresa de Natal no vosso site e gostaria de mais informações sobre os produtos e ofertas." variant="wa">
                Falar sobre as ofertas de Natal
              </WhatsAppLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
