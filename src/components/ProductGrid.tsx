import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, XCircle } from "lucide-react";
import { CATEGORIES, CATEGORY_BY_ID } from "../data/categories";
import { PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";
import { MESSAGES } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import { cn } from "../utils/cn";
import Reveal from "./Reveal";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

interface ProductGridProps {
  /** Categoria pré-selecionada (por exemplo, vinda do URL). */
  initialCategory?: string | null;
  /** Restringe a grelha a um subconjunto de produtos. */
  items?: typeof PRODUCTS;
  /** Mostra os controlos de pesquisa e filtro. */
  showFilters?: boolean;
  limit?: number;
}

export default function ProductGrid({
  initialCategory = null,
  items = PRODUCTS,
  showFilters = true,
  limit,
}: ProductGridProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(initialCategory ?? null);

  useEffect(() => {
    setCategory(initialCategory ?? null);
  }, [initialCategory]);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    const result = items.filter((product) => {
      const matchesCategory = !category || product.categoryId === category;
      if (!matchesCategory) return false;
      if (!term) return true;
      const haystack = normalize(
        [
          product.name,
          product.description,
          CATEGORY_BY_ID[product.categoryId]?.name ?? "",
          CATEGORY_BY_ID[product.categoryId]?.short ?? "",
          ...(product.keywords ?? []),
        ].join(" "),
      );
      return haystack.includes(term);
    });
    return limit ? result.slice(0, limit) : result;
  }, [items, query, category, limit]);

  const hasFilters = Boolean(query.trim() || category);

  const clearFilters = () => {
    setQuery("");
    setCategory(null);
  };

  return (
    <div>
      {showFilters ? (
        <Reveal className="mb-8 flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <label htmlFor="pesquisa-equipamentos" className="sr-only">
                Pesquisar equipamento por nome
              </label>
              <input
                id="pesquisa-equipamentos"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pesquisar equipamento (ex.: prensa, Epson, laser…)"
                className="field pl-11"
                autoComplete="off"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 text-[0.8125rem] font-semibold text-muted sm:flex">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Categoria
              </span>
              <label htmlFor="filtro-categoria" className="sr-only">
                Filtrar por categoria
              </label>
              <select
                id="filtro-categoria"
                value={category ?? ""}
                onChange={(event) =>
                  setCategory(event.target.value === "" ? null : event.target.value)
                }
                className="field md:w-64"
              >
                <option value="">Todas as categorias</option>
                {CATEGORIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCategory(null)}
              aria-pressed={category === null}
              className={cn("chip", category === null && "chip-active")}
            >
              Todos
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={cn("chip", category === item.id && "chip-active")}
              >
                {item.name}
              </button>
            ))}
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="chip ml-1 border-aqua/40 text-white"
              >
                <XCircle className="h-4 w-4 text-aqua" aria-hidden="true" />
                Limpar filtros
              </button>
            ) : null}
          </div>

          <p aria-live="polite" className="text-[0.8125rem] text-muted">
            {filtered.length === 0
              ? "Nenhum equipamento encontrado com os critérios indicados."
              : `${filtered.length} ${
                  filtered.length === 1 ? "equipamento disponível" : "equipamentos disponíveis"
                } para consulta.`}
          </p>
        </Reveal>
      ) : null}

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <Reveal key={product.id} delay={(index % 3) * 80}>
              <ProductCard
                id={product.id}
                name={product.name}
                categoryId={product.categoryId}
                description={product.description}
                image={product.image}
                icon={CATEGORY_BY_ID[product.categoryId]?.icon}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-4 px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink/70 text-aqua">
            <Search className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-bold text-white">Sem resultados</h3>
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">
            Não encontrámos equipamentos correspondentes à sua pesquisa. Fale connosco
            diretamente — podemos ajudar a identificar a solução adequada ao seu projeto.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={clearFilters} className="btn btn-ghost">
              Limpar filtros
            </button>
            <WhatsAppLink message={MESSAGES.outrasNecessidades} variant="primary">
              Falar com um especialista
            </WhatsAppLink>
          </div>
        </div>
      )}
    </div>
  );
}
