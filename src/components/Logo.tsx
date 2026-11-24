import { cn } from "../utils/cn";

interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
}

/** Logótipo oficial da Gráfica Noreth, fornecido pela empresa. */
export function Logo({ variant = "full", className }: LogoProps) {
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center", className)}>
      <img
        src="/logo-grafica-noreth.png"
        alt="Gráfica Noreth — Prestação de Serviços & Comércio, Lda."
        width={720}
        height={373}
        decoding="async"
        className={cn(
          "h-auto object-contain",
          variant === "compact"
            ? "w-[100px]"
            : "w-[108px] sm:w-[120px] xl:w-[140px] 2xl:w-[152px]",
        )}
      />
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
