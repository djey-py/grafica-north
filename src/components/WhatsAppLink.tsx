import { cn } from "../utils/cn";
import { WhatsAppIcon } from "./BrandIcons";
import { whatsappUrl } from "../utils/whatsapp";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "wa" | "inline";
type Size = "sm" | "md" | "lg";

interface WhatsAppLinkProps {
  /** Mensagem pré-preenchida na conversa. */
  message: string;
  /** Texto visível do botão. */
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Descrição extra para leitores de ecrã. */
  srLabel?: string;
  /** Abre em novo separador (recomendado para não perder a página). */
  newTab?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  wa: "btn btn-wa",
  inline:
    "inline-flex items-center gap-2 font-semibold text-aqua transition-colors hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.8125rem] px-4 py-2.5 min-h-[42px]",
  md: "",
  lg: "text-base px-7 py-4 min-h-[54px]",
};

/**
 * Ligação comercial reutilizável para o WhatsApp Business.
 * Constrói um <a href> real com a mensagem codificada.
 */
export default function WhatsAppLink({
  message,
  children,
  variant = "primary",
  size = "md",
  className,
  srLabel,
  newTab = true,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={cn(
        variants[variant],
        variant !== "inline" && sizes[size],
        className,
      )}
    >
      <WhatsAppIcon className={size === "sm" ? "h-4 w-4" : "h-[1.15em] w-[1.15em]"} />
      {children}
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
    </a>
  );
}
