import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  MapPin,
  Printer,
  Sparkles,
} from "lucide-react";
import { IMAGES } from "../data/categories";
import { MESSAGES } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import Reveal from "./Reveal";

const CAPABILITIES = [
  { icon: Printer, label: "Impressão" },
  { icon: Gift, label: "Brindes personalizados" },
  { icon: BadgeCheck, label: "Equipamentos gráficos" },
];

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[8%] h-[34rem] w-[34rem] rounded-full bg-aqua/[0.12] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 -left-40 h-[34rem] w-[34rem] rounded-full bg-electric/[0.16] blur-[150px]"
      />

      <div className="shell relative grid min-h-[min(760px,calc(100svh-78px))] items-center gap-14 py-16 md:py-20 lg:grid-cols-[1fr_0.95fr] lg:gap-12 lg:py-20 xl:gap-20">
        <div className="relative z-10 flex flex-col items-start">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-aqua/20 bg-aqua/[0.07] px-4 py-2 text-[0.6875rem] font-bold tracking-[0.15em] text-aqua uppercase backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Soluções gráficas em Luanda
            </span>
          </Reveal>

          <Reveal delay={70}>
            <h1
              id="hero-title"
              className="mt-7 max-w-[13ch] text-[clamp(2.8rem,7vw,5.65rem)] leading-[0.98] font-extrabold tracking-[-0.055em] text-white"
            >
              A sua marca merece ser{" "}
              <span className="gradient-text">vista.</span>
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-muted md:text-lg">
              Impressão, produção gráfica, brindes personalizados e equipamentos
              profissionais — soluções para fazer a sua marca chegar mais longe.
            </p>
          </Reveal>

          <Reveal delay={190} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <WhatsAppLink message={MESSAGES.geral} size="lg">
              Pedir orçamento
            </WhatsAppLink>
            <Link to="/equipamentos" className="btn btn-ghost min-h-[54px] px-6 text-base">
              Explorar o catálogo
              <ArrowRight className="h-[1.05em] w-[1.05em]" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={250} className="mt-10 w-full max-w-xl">
            <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-5">
              {CAPABILITIES.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 sm:text-sm">
                  <Icon className="h-4 w-4 text-aqua" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative mx-auto w-full max-w-[590px] lg:ml-auto lg:max-w-none">
          <div className="relative mx-auto w-full max-w-[550px] pb-8 pl-5 sm:pl-10 lg:pl-0">
            <div
              aria-hidden="true"
              className="absolute top-[8%] right-[8%] aspect-square w-[82%] rounded-full border border-aqua/[0.13]"
            />
            <div
              aria-hidden="true"
              className="absolute top-[14%] right-[14%] aspect-square w-[70%] rounded-full border border-white/[0.06]"
            />

            <figure className="relative ml-auto w-[88%] overflow-hidden rounded-[2rem] border border-white/15 bg-panel shadow-[0_38px_100px_-42px_rgba(8,103,232,0.72)] sm:rounded-[2.5rem]">
              <img
                src="/images/storefront-noreth.webp"
                alt="Fachada do Centro de Impressão & Marketing da Gráfica Noreth em Luanda"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="aspect-[1.15] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                <span>
                  <span className="block text-[0.6rem] font-bold tracking-[0.2em] text-aqua uppercase">
                    Gráfica Noreth
                  </span>
                  <span className="mt-1 block text-sm font-bold text-white sm:text-base">
                    Da ideia à produção
                  </span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-ink/35 text-white backdrop-blur-md">
                  <ArrowRight className="h-4 w-4 -rotate-45" aria-hidden="true" />
                </span>
              </figcaption>
            </figure>

            <figure className="absolute top-[19%] left-0 w-[37%] overflow-hidden rounded-2xl border border-white/20 bg-panel p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] sm:rounded-3xl sm:p-2">
              <img
                src={IMAGES.heroMugs}
                alt="Canecas personalizadas com padrões geométricos em azul e ciano"
                loading="lazy"
                decoding="async"
                width={1000}
                height={667}
                className="aspect-square w-full rounded-xl object-cover sm:rounded-2xl"
              />
              <figcaption className="sr-only">Canecas personalizadas por sublimação.</figcaption>
            </figure>

            <figure className="absolute right-0 bottom-[13%] w-[42%] overflow-hidden rounded-2xl border border-white/20 bg-panel p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] sm:rounded-3xl sm:p-2">
              <img
                src={IMAGES.heroApparel}
                alt="Vestuário preparado para personalização, incluindo t-shirts, polos e bonés"
                loading="lazy"
                decoding="async"
                width={1000}
                height={1500}
                className="aspect-[1.18] w-full rounded-xl object-cover object-center sm:rounded-2xl"
              />
              <figcaption className="sr-only">Vestuário pronto para personalização.</figcaption>
            </figure>

            <div className="absolute right-0 top-0 inline-flex -translate-y-1/3 items-center gap-2 rounded-full border border-white/15 bg-ink/80 px-3.5 py-2.5 text-[0.7rem] font-semibold text-white shadow-xl backdrop-blur-xl sm:right-2 sm:px-4 sm:text-xs">
              <MapPin className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
              Luanda · Angola
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
