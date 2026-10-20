import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../data/categories";
import { IMAGES } from "../data/categories";
import { categoryMessage } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import { cn } from "../utils/cn";

interface CategoryCardProps {
  category: Category;
  /** Comportamento alternativo ao navegar (usado no catálogo, para filtrar). */
  onSelect?: (categoryId: string) => void;
  /** Marca visualmente a categoria ativa. */
  active?: boolean;
}

export default function CategoryCard({ category, onSelect, active = false }: CategoryCardProps) {
  const destination = `/equipamentos?categoria=${category.id}`;

  return (
    <article
      className={cn(
        "card card-hover group flex h-full flex-col",
        active && "border-aqua/50 ring-1 ring-aqua/30",
      )}
    >
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(category.id)}
          className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-panel"
          aria-label={`Filtrar catálogo por ${category.name}`}
          aria-pressed={active}
        >
          <Media category={category} />
        </button>
      ) : (
        <Link
          to={destination}
          className="relative block aspect-[16/10] overflow-hidden bg-panel"
          aria-label={`Explorar ${category.name}`}
        >
          <Media category={category} />
        </Link>
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="text-[1.0625rem] font-bold text-white">{category.name}</h3>
        <p className="flex-1 text-[0.875rem] leading-relaxed text-muted">
          {category.description}
        </p>

        <div className="mt-1.5 flex flex-col items-start gap-2.5">
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(category.id)}
              className="inline-flex cursor-pointer items-center gap-2 text-[0.875rem] font-bold text-white transition-colors hover:text-aqua"
              aria-pressed={active}
            >
              {active ? "A filtrar" : "Explorar produtos"}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          ) : (
            <Link
              to={destination}
              className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-white transition-colors hover:text-aqua"
            >
              Explorar produtos
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          )}
          <WhatsAppLink
            message={categoryMessage(category.name)}
            variant="inline"
            size="sm"
            className="w-fit"
          >
            Consultar disponibilidade
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}

/** Imagem ou placeholder do cartão de categoria. */
function Media({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <>
      {category.image ? (
        <img
          src={IMAGES[category.image]}
          alt={`${category.name} — imagem ilustrativa`}
          loading="lazy"
          decoding="async"
          width={1000}
          height={667}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0d1730] via-[#0b1224] to-[#101a3a]">
          <Icon className="h-12 w-12 text-aqua/70" aria-hidden="true" />
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
      />
      <span className="absolute top-3.5 left-3.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-ink/70 text-aqua backdrop-blur">
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
    </>
  );
}
