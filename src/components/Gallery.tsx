import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY } from "../data/personalizados";
import { IMAGES } from "../data/categories";
import Reveal from "./Reveal";

const GROUPS = ["Todos", ...Array.from(new Set(GALLERY.map((item) => item.group)))];

export default function Gallery() {
  const [group, setGroup] = useState("Todos");
  const [active, setActive] = useState<number | null>(null);

  const items = group === "Todos" ? GALLERY : GALLERY.filter((i) => i.group === group);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((current) => (current === null ? null : (current + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setActive((current) =>
        current === null ? null : (current - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  const current = active === null ? null : items[active];

  return (
    <div>
      <div className="mb-7 flex flex-wrap justify-center gap-2.5">
        {GROUPS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setGroup(item);
              setActive(null);
            }}
            aria-pressed={group === item}
            className={`chip ${group === item ? "chip-active" : ""}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={(index % 4) * 60}>
            <button
              type="button"
              onClick={() => setActive(index)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-panel text-left"
              aria-label={`Ampliar imagem: ${item.title}`}
            >
              <span className="block aspect-[4/3] overflow-hidden">
                <img
                  src={IMAGES[item.image]}
                  alt={`${item.title} — ${item.caption}`}
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={750}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-85"
              />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3.5">
                <span className="text-[0.8125rem] font-bold text-white">{item.title}</span>
                <span className="line-clamp-2 text-[0.6875rem] leading-snug text-muted">
                  {item.caption}
                </span>
              </span>
              <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-ink/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${current.title}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
          onClick={close}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={IMAGES[current.image]}
              alt={`${current.title} — ${current.caption}`}
              width={1400}
              height={933}
              className="max-h-[76vh] w-full rounded-2xl border border-line object-contain"
            />
            <div className="mt-4 flex flex-col gap-1 text-center">
              <p className="text-base font-bold text-white">{current.title}</p>
              <p className="text-[0.875rem] text-muted">{current.caption}</p>
            </div>
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Fechar imagem ampliada"
              className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel text-white transition-colors hover:border-aqua/50"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Imagem anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel/90 text-white transition-colors hover:border-aqua/50"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="text-sm font-semibold text-muted">
                {(active ?? 0) + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Imagem seguinte"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel/90 text-white transition-colors hover:border-aqua/50"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
