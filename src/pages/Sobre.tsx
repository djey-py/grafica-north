import { Link } from "react-router-dom";
import { ArrowRight, Layers, Printer, ShieldCheck, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import WhatsAppLink from "../components/WhatsAppLink";
import Reveal from "../components/Reveal";
import Gallery from "../components/Gallery";
import { CATEGORIES, IMAGES } from "../data/categories";
import { MESSAGES } from "../utils/whatsapp";

export default function Sobre() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre nós"
        title={
          <>
            Mais do que equipamentos, <span className="gradient-text">soluções</span> para as
            suas ideias.
          </>
        }
        description="A Gráfica Noreth — Prestação de Serviços & Comércio, Lda. dedica-se à disponibilização de equipamentos profissionais e soluções gráficas para quem produz, personaliza e comunica."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppLink message={MESSAGES.geral}>
            Falar com a Gráfica Noreth
          </WhatsAppLink>
          <Link to="/equipamentos" className="btn btn-ghost">
            Conhecer os equipamentos
            <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>

      <section className="py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold text-white">
              Quem somos
            </h2>
            <div className="mt-5 space-y-4 text-[1rem] leading-relaxed text-muted">
              <p>
                A Gráfica Noreth — Prestação de Serviços &amp; Comércio, Lda. disponibiliza
                equipamentos profissionais e soluções gráficas para empreendedores, empresas
                e instituições que procuram desenvolver os seus projetos com qualidade e
                profissionalismo.
              </p>
              <p>
                Da impressão profissional aos produtos personalizados, reunimos diferentes
                opções para apoiar quem pretende iniciar, expandir ou modernizar a sua
                atividade.
              </p>
              <p>
                A nossa missão é ajudar a transformar ideias em resultados concretos,
                através de equipamentos e soluções alinhados com as necessidades de cada
                cliente.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink message={MESSAGES.outrasNecessidades}>
                Falar com um especialista
              </WhatsAppLink>
              <Link to="/personalizados" className="btn btn-ghost">
                Ver produtos personalizados
                <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={110} className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Printer,
                title: "Impressão e produção",
                text: "Impressoras, fotocopiadoras, laminadoras e guilhotinas profissionais.",
              },
              {
                icon: Sparkles,
                title: "Personalização",
                text: "Prensas térmicas, gravação a laser e soluções para brindes personalizados.",
              },
              {
                icon: Layers,
                title: "Identificação",
                text: "Cartões PVC, crachás, bottons e materiais de identificação.",
              },
              {
                icon: ShieldCheck,
                title: "Proteção de equipamentos",
                text: "Estabilizadores e UPS para proteger a sua produção gráfica.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink/70 text-aqua">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[0.9375rem] font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line/60 bg-ink-soft/50 py-16 md:py-24">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal>
            <figure className="relative overflow-hidden rounded-3xl border border-line">
              <img
                src={IMAGES.catPrinting}
                alt="Impressora profissional em ambiente de produção gráfica"
                loading="lazy"
                decoding="async"
                width={1000}
                height={667}
                className="aspect-[4/3] w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
              />
              <figcaption className="img-tag">Imagem ilustrativa</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-aqua/70" />
              Mensagem da marca
            </span>
            <blockquote className="mt-5">
              <p className="text-[clamp(1.5rem,3.2vw,2.15rem)] leading-tight font-extrabold text-white">
                “Na Gráfica Noreth transformamos ideias em realidade.”
              </p>
            </blockquote>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">
              Qualidade, inovação e os melhores equipamentos para o seu negócio — este é o
              compromisso que orienta a nossa atividade e a forma como acompanhamos cada
              cliente.
            </p>
            <div className="mt-7">
              <WhatsAppLink message={MESSAGES.geral} variant="ghost">
                Falar com a Gráfica Noreth
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Áreas de atuação"
            title="O que disponibilizamos"
            description="Oito áreas de equipamentos e soluções para diferentes necessidades de produção gráfica e personalização."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              return (
                <Reveal as="li" key={category.id} delay={(index % 4) * 70}>
                  <Link
                    to={`/equipamentos?categoria=${category.id}`}
                    className="card card-hover flex h-full flex-col gap-2.5 p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink/70 text-aqua">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-[0.9375rem] font-bold text-white">{category.name}</h3>
                    <span className="text-[0.75rem] font-semibold text-aqua">
                      Explorar produtos →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-line/60 bg-ink-soft/50 py-16 md:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Galeria" title="Equipamentos e trabalhos gráficos" />
          <div className="mt-12">
            <Gallery />
          </div>
        </div>
      </section>
    </>
  );
}
