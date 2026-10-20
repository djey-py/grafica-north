import { cn } from "../utils/cn";

interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
}

/**
 * Logótipo da Gráfica Noreth.
 *
 * Nota: não foi fornecido nenhum ficheiro vetorial do logótipo original,
 * pelo que esta implementação recria a assinatura da marca em SVG/CSS com a
 * paleta azul, ciano e roxo da identidade. Para usar o logótipo original,
 * basta colocar o ficheiro (SVG ou PNG transparente) em src/assets/logos/
 * e substituir este componente por uma tag <img>.
 */
export function Logo({ variant = "full", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
      {variant === "full" ? (
        <span className="flex flex-col leading-none">
          <span className="text-[0.5625rem] font-bold tracking-[0.32em] text-muted uppercase">
            Gráfica
          </span>
          <span className="gradient-text text-[1.4rem] font-extrabold tracking-[0.02em] md:text-[1.55rem]">
            NORETH
          </span>
        </span>
      ) : (
        <span className="gradient-text text-[1.35rem] font-extrabold tracking-[0.02em]">
          NORETH
        </span>
      )}
    </span>
  );
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        <linearGradient id="noreth-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0867E8" />
          <stop offset="55%" stopColor="#20B9F2" />
          <stop offset="100%" stopColor="#382080" />
        </linearGradient>
        <linearGradient id="noreth-mark-2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#6EE7FF" />
          <stop offset="100%" stopColor="#1677FF" />
        </linearGradient>
      </defs>
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="13"
        fill="rgba(8,103,232,0.10)"
        stroke="url(#noreth-mark)"
        strokeWidth="1.8"
      />
      <path
        d="M15 34V15.5L33 32.5V14"
        fill="none"
        stroke="url(#noreth-mark-2)"
        strokeWidth="4.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle cx="24" cy="41.5" r="1.6" fill="#20B9F2" />
    </svg>
  );
}

export default Logo;
