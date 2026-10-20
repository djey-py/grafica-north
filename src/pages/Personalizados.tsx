import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import PersonalizedCard from "../components/PersonalizedCard";
import WhatsAppLink from "../components/WhatsAppLink";
import Reveal from "../components/Reveal";
import Gallery from "../components/Gallery";
import { IMAGES } from "../data/categories";
import {
  PERSONALIZED_PRODUCTS,
  TECHNIQUES,
  TECHNIQUE_NOTE,
} from "../data/personalizados";
import { MESSAGES, personalizadoMessage } from "../utils/whatsapp";
import { cn } from "../utils/cn";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function Personalizados() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    if (!term) return PERSONALIZED_PRODUCTS;
    return PERSONALIZED_PRODUCTS.filter((product) =>
      normalize(
        [product.name, product.description, ...(product.keywords ?? [])].join(" "),
      ).includes(term),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Produtos personalizados"
        title={
          <>
            A sua marca merece ser{" "}
            <span className="gradient-text">vista e lembrada</span>.
          </>
        }
        description="Na Gráfica Noreth, transformamos ideias em produtos personalizados com qualidade, criatividade e atenção aos detalhes. Trabalhamos com soluções para empresas, eventos, equipas, instituições e uso pessoal, com opções de personalização adequadas a diferentes necessidades."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppLink message={MESSAGES.personalizados}>
            Pedir informações pelo WhatsApp
          </WhatsAppLink>
          <WhatsAppLink message={MESSAGES.portaChaves} variant="ghost">
            Quero personalizar porta-chaves
          </WhatsAppLink>
        </div>
      </PageHeader>

      {/* Destaque: porta-chaves */}
      <section
        id="porta-chaves"
        className="scroll-mt-24 border-b border-line/60 py-16 md:py-24"
        aria-labelledby="destaque-title"
      >
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal>
            <figure className="relative overflow-hidden rounded-3xl border border-line shadow-[0_40px_90px_-45px_rgba(32,185,242,0.55)]">
              <img
                src={IMAGES.featuredKeychains}
                alt="Porta-chaves personalizados em acrílico, metal e couro"
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
          </Reveal>

          <Reveal delay={100}>
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-aqua/70" />
              Destaque
            </span>
            <h2
              id="destaque-title"
              className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold text-white"
            >
              Porta-chaves personalizados
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-muted">
              Uma solução de personalização com grande alcance: porta-chaves em diferentes
              materiais e formatos, adequados a campanhas, eventos, ofertas institucionais e
              uso promocional.
            </p>
            <p className="mt-3 text-[0.875rem] text-muted">
              Materiais, formatos, técnicas, quantidades e preços são confirmados com a
              Gráfica Noreth de acordo com o seu pedido.
            </p>
            <div className="mt-7">
              <WhatsAppLink message={MESSAGES.portaChaves}>
                Quero personalizar porta-chaves
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Técnicas */}
      <section
        id="tecnicas"
        className="scroll-mt-24 border-b border-line/60 bg-ink-soft/50 py-16 md:py-24"
        aria-labelledby="tecnicas-title"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Técnicas de personalização"
            title={<span id="tecnicas-title">Como personalizamos</span>}
            description={TECHNIQUE_NOTE}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TECHNIQUES.map((technique, index) => (
              <Reveal as="li" key={technique.name} delay={index * 60}>
                <div className="card card-hover flex h-full flex-col gap-3 p-5">
                  <span className="inline-flex h-8 items-center rounded-full border border-aqua/30 bg-electric/10 px-3 text-[0.6875rem] font-bold tracking-[0.12em] text-aqua uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1rem] font-bold text-white">{technique.name}</h3>
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
                    {technique.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <WhatsAppLink message={MESSAGES.personalizados} variant="ghost">
              Confirmar a técnica adequada ao meu produto
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-16 md:py-24" aria-labelledby="produtos-title">
        <div className="shell">
          <SectionHeading
            align="left"
            eyebrow="Catálogo de produtos"
            title={<span id="produtos-title">Produtos disponíveis para personalização</span>}
            description="Escolha o produto e clique em “Quero personalizar este produto”. A mensagem é preparada automaticamente no WhatsApp."
          />

          <div className="relative mt-8 max-w-lg">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <label htmlFor="pesquisa-personalizados" className="sr-only">
              Pesquisar produto personalizado
            </label>
            <input
              id="pesquisa-personalizados"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar produto (ex.: caneca, polo, crachá…)"
              className="field pl-11"
              autoComplete="off"
            />
          </div>

          <p aria-live="polite" className="mt-4 text-[0.8125rem] text-muted">
            {filtered.length === 0
              ? "Nenhum produto encontrado. Fale connosco — podemos avaliar outras possibilidades."
              : `${filtered.length} ${
                  filtered.length === 1 ? "produto" : "produtos"
                } disponíveis para personalização.`}
          </p>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((product, index) => (
                <Reveal key={product.id} delay={(index % 4) * 70}>
                  <PersonalizedCard {...product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="card mt-8 flex flex-col items-center gap-4 px-6 py-14 text-center">
              <h3 className="text-lg font-bold text-white">Sem resultados</h3>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">
                Não encontrámos o produto que procura. Contacte-nos — avaliamos outras
                opções de personalização para o seu projeto.
              </p>
              <WhatsAppLink message={personalizadoMessage(query.trim() || "produtos personalizados")}>
                Falar com a Gráfica Noreth
              </WhatsAppLink>
            </div>
          )}

          <div className={cn("mt-10 flex flex-col items-start gap-2 rounded-2xl border border-line bg-ink-soft/60 p-5")}>
            <h3 className="text-[0.9375rem] font-bold text-white">
              Nota sobre as imagens
            </h3>
            <p className="text-[0.875rem] leading-relaxed text-muted">
              Alguns artigos apresentam-se com um placeholder local até à disponibilização
              das fotografias reais. Solicite imagens e exemplos reais dos artigos
              disponíveis através do WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line/60 bg-ink-soft/50 py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Galeria"
            title="Exemplos de personalização e equipamentos"
          />
          <div className="mt-12">
            <Gallery />
          </div>
        </div>
      </section>
    </>
  );
}
