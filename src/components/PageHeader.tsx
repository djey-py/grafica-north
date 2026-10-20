import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-electric/18 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 h-[300px] w-[300px] rounded-full bg-grape/25 blur-[120px]"
      />
      <div className="shell relative flex flex-col items-start gap-5 py-14 md:py-20">
        <Reveal>
          <span className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-aqua/70" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="max-w-4xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-white">
            {title}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={130}>
            <p className="max-w-2xl text-[1rem] leading-relaxed text-muted md:text-[1.0625rem]">
              {description}
            </p>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={190}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
