import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Gift, MapPin, Printer, Sparkles } from "lucide-react";
import heroProductionImage from "../assets/images/hero-graphic-production.webp";
import { MESSAGES } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import Reveal from "./Reveal";

const SERVICE_MARKERS = [
  { icon: Printer, label: "Impressão profissional" },
  { icon: Gift, label: "Personalização" },
  { icon: BadgeCheck, label: "Equipamentos gráficos" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.06]" aria-labelledby="hero-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-52 left-[15%] h-[34rem] w-[34rem] rounded-full bg-electric/[0.16] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[28%] -right-48 h-[36rem] w-[36rem] rounded-full bg-aqua/[0.12] blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/40 to-transparent"
      />

      <div className="shell relative py-12 sm:py-16 lg:py-[4.5rem]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 xl:gap-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-aqua/20 bg-aqua/[0.07] px-4 py-2 text-[0.65rem] font-bold tracking-[0.17em] text-aqua uppercase backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Produção gráfica · Luanda
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h1
                id="hero-title"
                className="mt-7 max-w-[12ch] text-[clamp(3rem,7.5vw,6.35rem)] leading-[0.92] font-extrabold tracking-[-0.065em] text-white"
              >
                A sua marca merece ir{" "}
                <span className="gradient-text">mais longe.</span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={150} className="flex max-w-xl flex-col items-start gap-6 lg:ml-auto lg:pb-2">
            <p className="text-[0.98rem] leading-[1.8] text-muted sm:text-lg">
              Da impressão profissional à personalização e aos equipamentos gráficos —
              transformamos ideias em materiais que fazem a sua marca destacar-se.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <WhatsAppLink message={MESSAGES.geral} size="lg">
                Pedir orçamento
              </WhatsAppLink>
              <Link to="/equipamentos" className="btn btn-ghost min-h-[54px] px-6 text-base">
                Explorar equipamentos
                <ArrowRight className="h-[1.05em] w-[1.05em]" aria-hidden="true" />
              </Link>
            </div>
            <p className="text-xs font-medium text-muted/80">
              Atendimento direto com a equipa da Gráfica Noreth.
            </p>
          </Reveal>
        </div>

        <Reveal delay={180} className="mt-10 sm:mt-12 lg:mt-14">
          <figure className="group relative isolate aspect-[1.18] overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#07101d] shadow-[0_36px_110px_-48px_rgba(8,103,232,0.62)] sm:aspect-[1.7] sm:rounded-[2rem] lg:aspect-[2.12] lg:rounded-[2.5rem]">
            <img
              src={heroProductionImage}
              alt="Composição de produção gráfica com impressora profissional, cartões, caneca e vestuário personalizado"
              width={1312}
              height={816}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[66%_center] motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-out motion-safe:group-hover:scale-[1.025] sm:object-[58%_center]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,9,20,0.68)_0%,rgba(5,9,20,0.2)_38%,transparent_72%),linear-gradient(0deg,rgba(5,9,20,0.86)_0%,rgba(5,9,20,0.08)_38%,transparent_72%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-white/[0.08]"
            />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-6 lg:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/45 px-3.5 py-2 text-[0.6rem] font-bold tracking-[0.16em] text-white/90 uppercase backdrop-blur-md sm:text-xs">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_12px_rgba(32,185,242,0.9)]" />
                Do conceito ao produto final
              </span>
              <span className="hidden rounded-full border border-white/15 bg-ink/45 px-3.5 py-2 text-[0.6rem] font-bold tracking-[0.16em] text-white/75 uppercase backdrop-blur-md sm:inline-flex sm:text-xs">
                Impressão · Personalização · Equipamentos
              </span>
            </div>

            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-4 border-t border-white/10 bg-ink/35 px-4 py-4 backdrop-blur-md sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-5 lg:px-8 lg:py-6">
              <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6">
                {SERVICE_MARKERS.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 text-[0.68rem] font-semibold text-white/85 sm:text-xs">
                    <Icon className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 sm:shrink-0 sm:text-sm">
                <MapPin className="h-4 w-4 text-aqua" aria-hidden="true" />
                Luanda, Angola
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
