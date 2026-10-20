import { Link } from "react-router-dom";
import { ArrowRight, Layers, Quote, ShieldCheck, Sparkles } from "lucide-react";
import Hero from "../components/Hero";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import PersonalizedCard from "../components/PersonalizedCard";
import Solutions from "../components/Solutions";
import Gallery from "../components/Gallery";
import ContactSection from "../components/ContactSection";
import WhatsAppLink from "../components/WhatsAppLink";
import Reveal from "../components/Reveal";
import { CATEGORIES, IMAGES } from "../data/categories";
import { PERSONALIZED_PRODUCTS, GALLERY_NOTE } from "../data/personalizados";
import { EQUIPMENT_CATEGORIES_NOTE, PRODUCTS } from "../data/products";
import { MESSAGES } from "../utils/whatsapp";

const PILLARS = [
  {
    icon: Layers,
    title: "Equipamentos profissionais",
    text: "Impressão, acabamento, prensas térmicas, laser e fotocópia para produção gráfica.",
  },
  {
    icon: Sparkles,
    title: "Personalização",
    text: "Produtos personalizados com técnicas adequadas a cada material e objetivo.",
  },
  {
    icon: ShieldCheck,
    title: "Acompanhamento comercial",
    text: "Informações, disponibilidade e orçamentos tratados diretamente com a empresa.",
  },
];

export default function Home() {
  const featuredProducts = [
    "prensas-camisolas",
    "impressoras-epson",
    "fotocopiadoras-ricoh",
    "gravacao-laser",
    "laminadoras",
    "impressoras-cartoes-pvc",
  ];

  return (
    <>
      <Hero />

      {/* Categorias */}
      <section id="categorias" className="relative py-20 md:py-28" aria-labelledby="categorias-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Categorias"
            title={
              <span id="categorias-title">
                Tudo para dar vida ao seu{" "}
                <span className="gradient-text">negócio gráfico</span>.
              </span>
            }
            description="Explore equipamentos e soluções para impressão, personalização, publicidade e produção gráfica."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category, index) => (
              <Reveal key={category.id} delay={(index % 4) * 70}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo em destaque */}
      <section className="relative border-y border-line/60 bg-ink-soft/50 py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Equipamentos"
              title="Equipamentos profissionais para a sua produção"
              description={EQUIPMENT_CATEGORIES_NOTE}
              className="md:max-w-2xl"
            />
            <Link to="/equipamentos" className="btn btn-ghost shrink-0">
              Ver catálogo completo
              <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12">
            <ProductGrid
              items={PRODUCTS.filter((product) => featuredProducts.includes(product.id))}
              showFilters={false}
            />
          </div>
        </div>
      </section>

      {/* Porta-chaves em destaque */}
      <section className="relative py-20 md:py-28" aria-labelledby="portachaves-title">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-aqua/70" />
              Produto em destaque
            </span>
            <h2
              id="portachaves-title"
              className="mt-4 text-[clamp(1.75rem,3.6vw,2.6rem)] font-extrabold text-white"
            >
              Porta-chaves personalizados para a sua marca.
            </h2>
            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-muted">
              Um dos brindes mais versáteis para empresas, eventos e instituições. Com
              opções de materiais, formatos e técnicas de personalização, o porta-chaves
              coloca a sua marca no dia-a-dia de quem o recebe.
            </p>
            <p className="mt-3 text-[0.875rem] text-muted">
              As opções, quantidades, materiais e preços são confirmados diretamente com a
              Gráfica Noreth.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink message={MESSAGES.portaChaves}>
                Quero personalizar porta-chaves
              </WhatsAppLink>
              <Link to="/personalizados" className="btn btn-ghost">
                Ver produtos personalizados
                <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={110} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[520px]">
              <div
                aria-hidden="true"
                className="absolute -top-5 -right-5 h-28 w-28 rounded-tr-3xl border-t border-r border-aqua/40"
              />
              <figure className="relative overflow-hidden rounded-3xl border border-line shadow-[0_40px_90px_-45px_rgba(32,185,242,0.6)]">
                <img
                  src={IMAGES.featuredKeychains}
                  alt="Porta-chaves personalizados em acrílico, metal e couro com gravação"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={667}
                  className="aspect-[4/3] w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                />
                <figcaption className="img-tag">Imagem ilustrativa</figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Produtos personalizados */}
      <section
        className="relative border-y border-line/60 bg-ink-soft/50 py-20 md:py-28"
        aria-labelledby="personalizados-title"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Produtos personalizados"
            title={
              <span id="personalizados-title">
                A sua marca merece ser <span className="gradient-text">vista e lembrada</span>.
              </span>
            }
            description="Transformamos ideias em produtos personalizados com qualidade, criatividade e atenção aos detalhes, com opções para empresas, eventos, equipas, instituições e uso pessoal."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONALIZED_PRODUCTS.slice(0, 4).map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 70}>
                <PersonalizedCard {...product} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/personalizados" className="btn btn-primary">
              Explorar produtos personalizados
              <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
            </Link>
            <WhatsAppLink message={MESSAGES.personalizados} variant="ghost">
              Pedir informações pelo WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <Solutions />

      {/* Sobre nós — resumo */}
      <section className="relative border-y border-line/60 bg-ink-soft/50 py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <Reveal>
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-aqua/70" />
              Sobre nós
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.6rem)] font-extrabold text-white">
              Mais do que equipamentos, <span className="gradient-text">soluções</span> para as
              suas ideias.
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
              <Link to="/sobre" className="btn btn-primary">
                Conhecer a empresa
                <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
              </Link>
              <WhatsAppLink message={MESSAGES.outrasNecessidades} variant="ghost">
                Falar com um especialista
              </WhatsAppLink>
            </div>
          </Reveal>

          <Reveal delay={110} className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="card p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink/70 text-aqua">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[0.9375rem] font-bold text-white">{pillar.title}</h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
            <blockquote className="card relative flex flex-col justify-between gap-5 p-5 sm:col-span-2">
              <Quote className="h-6 w-6 text-aqua/60" aria-hidden="true" />
              <p className="text-[1.0625rem] leading-snug font-bold text-white">
                “Na Gráfica Noreth transformamos ideias em realidade.”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Galeria */}
      <section className="relative py-20 md:py-28" aria-labelledby="galeria-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Galeria"
            title="Equipamentos, produtos e trabalhos gráficos"
            description={GALLERY_NOTE}
          />
          <div className="mt-12">
            <Gallery />
          </div>
        </div>
      </section>

      <ContactSection id="contactos-home" />
    </>
  );
}
