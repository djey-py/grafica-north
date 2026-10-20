import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { IMAGES } from "../data/categories";
import { MESSAGES } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Elementos decorativos inspirados na identidade da marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-grape/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-electric/20 blur-[120px]"
      />

      <div className="shell relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
        {/* Coluna de texto */}
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <span className="eyebrow rounded-full border border-line bg-ink-soft/80 px-3.5 py-1.5 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Equipamentos profissionais &amp; personalização
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="text-[clamp(2.3rem,6.2vw,4rem)] leading-[1.02] font-extrabold text-white"
            >
              Transformamos ideias em{" "}
              <span className="gradient-text">oportunidades de negócio</span>.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="max-w-xl text-[1rem] leading-relaxed text-muted md:text-[1.0625rem]">
              Descubra equipamentos profissionais de impressão, personalização e produção
              gráfica para iniciar, expandir ou modernizar o seu negócio. Da impressão aos
              brindes personalizados, a Gráfica Noreth ajuda a transformar as suas ideias em
              realidade.
            </p>
          </Reveal>

          <Reveal delay={200} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link to="/equipamentos" className="btn btn-primary">
              Explorar equipamentos
              <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
            </Link>
            <WhatsAppLink message={MESSAGES.equipamentos} variant="ghost">
              Solicitar orçamento pelo WhatsApp
            </WhatsAppLink>
          </Reveal>

          <Reveal delay={260}>
            <p className="flex items-center gap-2.5 text-[0.875rem] font-medium text-muted">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-r from-aqua to-transparent"
              />
              Equipamentos gráficos, personalização e soluções para o seu negócio.
            </p>
          </Reveal>
        </div>

        {/* Coluna visual — composição editorial */}
        <Reveal delay={160} className="relative">
          <div className="relative mx-auto max-w-[520px] lg:max-w-none">
            {/* Moldura técnica */}
            <div
              aria-hidden="true"
              className="absolute -top-4 -left-4 h-24 w-24 rounded-tl-2xl border-t border-l border-aqua/40"
            />
            <div
              aria-hidden="true"
              className="absolute -right-4 -bottom-4 h-24 w-24 rounded-br-2xl border-r border-b border-aqua/40"
            />

            <figure className="relative overflow-hidden rounded-3xl border border-line shadow-[0_40px_90px_-40px_rgba(8,103,232,0.7)]">
              <img
                src={IMAGES.heroEquipment}
                alt="Equipamento profissional de impressão em produção gráfica, com iluminação azul e ciana"
                width={1400}
                height={933}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span className="text-[0.8125rem] font-bold text-white">
                  Impressão profissional
                </span>
                <span className="rounded-full border border-white/12 bg-ink/70 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.1em] text-muted uppercase backdrop-blur">
                  Imagem ilustrativa
                </span>
              </figcaption>
            </figure>

            {/* Cartões secundários */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <figure className="float-slow relative overflow-hidden rounded-2xl border border-line">
                <img
                  src={IMAGES.heroMugs}
                  alt="Canecas personalizadas com padrões geométricos em azul e ciano"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={667}
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="sr-only">
                  Canecas e chávenas personalizadas por sublimação.
                </figcaption>
              </figure>
              <figure className="relative mt-6 overflow-hidden rounded-2xl border border-line">
                <img
                  src={IMAGES.heroApparel}
                  alt="T-shirts, polos e bonés prontos para personalização"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={1500}
                  className="aspect-[4/3] w-full object-cover object-top"
                />
                <figcaption className="sr-only">
                  Vestuário pronto para personalização.
                </figcaption>
              </figure>
            </div>

            {/* Detalhe gráfico */}
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -left-6 hidden rounded-2xl border border-line bg-panel/90 p-3.5 backdrop-blur md:block"
            >
              <span className="block text-[0.5625rem] font-bold tracking-[0.2em] text-aqua uppercase">
                Noreth
              </span>
              <span className="mt-1 block text-[0.6875rem] text-muted">
                Ideias em realidade
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
