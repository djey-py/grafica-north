import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
  children?: ReactNode;
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
  children,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="eyebrow">
          <span aria-hidden="true" className="h-px w-6 bg-aqua/70" />
          {eyebrow}
        </span>
      ) : null}
      <Tag
        id={id}
        className={cn(
          "max-w-3xl text-[clamp(1.75rem,3.6vw,2.6rem)] font-extrabold text-white",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-[0.975rem] leading-relaxed text-muted md:text-base">
          {description}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
