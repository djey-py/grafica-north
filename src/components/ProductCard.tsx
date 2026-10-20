import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { IMAGES, type ImageKey } from "../data/categories";
import { CATEGORY_BY_ID } from "../data/categories";
import { equipmentMessage } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import { cn } from "../utils/cn";

interface ProductCardProps {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: ImageKey | null;
  icon?: React.ComponentType<{ className?: string }>;
  /** Mostra o atalho para o catálogo (oculto na própria página do catálogo). */
  showCatalogLink?: boolean;
}

/**
 * Cartão de equipamento do catálogo.
 * Sem preços fictícios: a chamada é sempre para orçamento/disponibilidade.
 */
export default function ProductCard({
  id,
  name,
  categoryId,
  description,
  image,
  icon: Icon,
  showCatalogLink = true,
}: ProductCardProps) {
  const category = CATEGORY_BY_ID[categoryId];
  const location = useLocation();
  const isCatalogPage = location.pathname === "/equipamentos";

  return (
    <article id={id} className="card card-hover group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-panel">
        {image ? (
          <img
            src={IMAGES[image]}
            alt={`${name} — fotografia ilustrativa da tipologia de equipamento`}
            loading="lazy"
            decoding="async"
            width={1000}
            height={667}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-panel via-ink-soft to-[#0a1330]">
            {Icon ? (
              <Icon className="h-10 w-10 text-aqua/80" aria-hidden="true" />
            ) : null}
            <span className="px-6 text-center text-[0.6875rem] font-semibold tracking-[0.14em] text-muted uppercase">
              Fotografia a disponibilizar
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80"
        />
        <span className="img-tag">Imagem ilustrativa</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {category ? (
          <Link
            to={`/equipamentos?categoria=${category.id}`}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-ink/70 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.08em] text-muted uppercase transition-colors hover:border-aqua/50 hover:text-white"
          >
            {category.short}
          </Link>
        ) : null}

        <h3 className="text-[1.0625rem] leading-snug font-bold text-white">{name}</h3>
        <p className="flex-1 text-[0.875rem] leading-relaxed text-muted">{description}</p>

        <p className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-aqua">
          <span aria-hidden="true">●</span> Solicite o seu orçamento
        </p>

        <div className="mt-1 flex flex-col gap-2">
          <WhatsAppLink
            message={equipmentMessage(name)}
            size="sm"
            className={cn("w-full")}
          >
            Consultar pelo WhatsApp
          </WhatsAppLink>
          {showCatalogLink && !isCatalogPage ? (
            <Link
              to="/equipamentos"
              className="inline-flex items-center justify-center gap-1.5 py-1 text-[0.8125rem] font-semibold text-muted transition-colors hover:text-white"
            >
              Ver catálogo completo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
