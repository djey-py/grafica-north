import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";
import SectionHeading from "../components/SectionHeading";
import WhatsAppLink from "../components/WhatsAppLink";
import Reveal from "../components/Reveal";
import { CATEGORIES } from "../data/categories";
import { EQUIPMENT_CATEGORIES_NOTE } from "../data/products";
import { MESSAGES } from "../utils/whatsapp";

export default function Equipamentos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("categoria");

  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectCategory = (id: string) => {
    if (id === category) {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: id });
    }
    window.requestAnimationFrame(() => {
      window.setTimeout(scrollToCatalog, 60);
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title={
          <>
            Equipamentos profissionais para impressão, personalização e{" "}
            <span className="gradient-text">produção gráfica</span>.
          </>
        }
        description="Consulte o catálogo de equipamentos disponibilizados pela Gráfica Noreth. Utilize a pesquisa e os filtros por categoria para encontrar o que procura e fale connosco para conhecer modelos, disponibilidade e condições."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppLink message={MESSAGES.equipamentos}>
            Solicitar orçamento pelo WhatsApp
          </WhatsAppLink>
          <button type="button" onClick={scrollToCatalog} className="btn btn-ghost">
            Ver catálogo
          </button>
        </div>
      </PageHeader>

      <section id="catalogo" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            align="left"
            eyebrow="Catálogo de equipamentos"
            title="Pesquise e filtre por categoria"
            description={EQUIPMENT_CATEGORIES_NOTE}
            className="mb-10"
          />
          <ProductGrid initialCategory={category} />
        </div>
      </section>

      <section className="border-t border-line/60 bg-ink-soft/50 py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Categorias"
            title="Explore por área de aplicação"
            description="Cada categoria reúne equipamentos com a mesma finalidade. Escolha a área do seu negócio e consulte diretamente connosco."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((item, index) => (
              <Reveal key={item.id} delay={(index % 4) * 70} className="h-full">
                <CategoryCard
                  category={item}
                  onSelect={selectCategory}
                  active={item.id === category}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
