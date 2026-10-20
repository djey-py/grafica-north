import { IMAGES, type ImageKey } from "../data/categories";
import { personalizadoMessage } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import { cn } from "../utils/cn";

interface PersonalizedCardProps {
  id: string;
  name: string;
  singular: string;
  description: string;
  image: ImageKey | null;
  gradient: string;
  featured?: boolean;
}

/**
 * Cartão de produto personalizado. Quando não existe fotografia, é usado um
 * placeholder local devidamente assinalado (nunca uma imagem fictícia).
 */
export default function PersonalizedCard({
  id,
  name,
  singular,
  description,
  image,
  gradient,
  featured = false,
}: PersonalizedCardProps) {
  return (
    <article
      id={id}
      className={cn(
        "card card-hover group flex h-full flex-col",
        featured && "ring-1 ring-aqua/35",
      )}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-panel">
        {image ? (
          <img
            src={IMAGES[image]}
            alt={`${name} personalizados — fotografia ilustrativa`}
            loading="lazy"
            decoding="async"
            width={1000}
            height={800}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br px-6 text-center",
              gradient,
            )}
          >
            <span
              aria-hidden="true"
              className="h-10 w-10 rounded-full border border-white/25"
            />
            <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-white/80 uppercase">
              {name}
            </span>
            <span className="text-[0.625rem] font-semibold tracking-[0.1em] text-white/65 uppercase">
              Fotografia a disponibilizar
            </span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent"
        />
        {featured ? (
          <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-electric to-aqua px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.12em] text-white uppercase">
            Destaque
          </span>
        ) : null}
        {image ? <span className="img-tag">Imagem ilustrativa</span> : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[1.0625rem] font-bold text-white">{name}</h3>
        <p className="flex-1 text-[0.875rem] leading-relaxed text-muted">{description}</p>
        <WhatsAppLink
          message={personalizadoMessage(singular)}
          size="sm"
          variant="ghost"
          className="mt-1 w-full"
        >
          Quero personalizar este produto
        </WhatsAppLink>
      </div>
    </article>
  );
}
