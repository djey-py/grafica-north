import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import WhatsAppLink from "./WhatsAppLink";
import { NAV_ITEMS } from "../data/navigation";
import { MESSAGES, PHONE_DISPLAY, PHONE_TEL_HREF } from "../utils/whatsapp";
import { cn } from "../utils/cn";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = document.querySelectorAll<HTMLElement>(
        '#menu-mobile a[href], #menu-mobile button:not([disabled])',
      );
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-2xl transition-colors duration-300",
        scrolled || open
          ? "border-line/90 bg-ink/95 shadow-[0_12px_40px_-26px_rgba(32,185,242,0.5)]"
          : "border-white/8 bg-ink/85",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/60 to-transparent"
      />

      <div className="shell flex min-h-[78px] items-center justify-between gap-3 py-1.5 sm:min-h-[86px] xl:min-h-[102px]">
        <Link
          to="/"
          className="shrink-0 rounded-xl transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-offset-4"
          aria-label="Gráfica Noreth — Página inicial"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden rounded-full border border-line/80 bg-panel/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] xl:block"
        >
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative flex min-h-10 items-center justify-center whitespace-nowrap rounded-full px-2 text-[0.7rem] font-bold transition-colors 2xl:px-2.5 2xl:text-xs",
                      isActive
                        ? "bg-white/[0.07] text-white"
                        : "text-muted hover:bg-white/[0.04] hover:text-white",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-electric to-aqua transition-opacity",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <a
            href={PHONE_TEL_HREF}
            aria-label={`Ligar para ${PHONE_DISPLAY}`}
            title={`Ligar: ${PHONE_DISPLAY}`}
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-line bg-panel/70 text-muted transition-colors hover:border-aqua/50 hover:text-white xl:inline-flex"
          >
            <Phone className="h-[1.1rem] w-[1.1rem] text-aqua" aria-hidden="true" />
          </a>
          <WhatsAppLink
            message={MESSAGES.geral}
            size="sm"
            className="hidden sm:inline-flex xl:min-h-11 xl:px-4"
            srLabel=" — abre uma conversa no WhatsApp"
          >
            Pedir orçamento
          </WhatsAppLink>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-haspopup="dialog"
            aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel/70 text-white transition-colors hover:border-aqua/60 hover:bg-panel xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>

      {open && createPortal(
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        onClick={closeMenu}
        className="fixed inset-0 z-[60] bg-ink/75 backdrop-blur-sm xl:hidden"
      >
        <nav
          aria-label="Navegação principal (mobile)"
          onClick={(event) => event.stopPropagation()}
          className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col overflow-y-auto border-l border-line/80 bg-ink px-5 pt-5 pb-8 shadow-[-24px_0_80px_rgba(0,0,0,0.55)] sm:px-7"
        >
          <div className="flex items-center justify-between gap-4 border-b border-line/80 pb-5">
            <Link to="/" onClick={closeMenu} aria-label="Gráfica Noreth — Página inicial">
              <Logo variant="compact" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-panel/70 text-white transition-colors hover:border-aqua/60"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="eyebrow mt-7 mb-3 px-1">Navegação</p>
          <ul className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    cn(
                      "group flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 text-[0.95rem] font-bold transition-all",
                      isActive
                        ? "border-aqua/25 bg-electric/10 text-white shadow-[inset_3px_0_0_#20b9f2]"
                        : "border-transparent text-muted hover:border-line hover:bg-panel/70 hover:text-white",
                    )
                  }
                >
                  {item.label}
                  <ChevronRight
                    className="h-4 w-4 text-aqua transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 border-t border-line/80 pt-6">
            <WhatsAppLink message={MESSAGES.geral} className="w-full">
              Pedir orçamento pelo WhatsApp
            </WhatsAppLink>
            <a
              href={PHONE_TEL_HREF}
              className="btn btn-ghost w-full"
              aria-label={`Ligar para ${PHONE_DISPLAY}`}
            >
              <Phone className="h-[1.15em] w-[1.15em] text-aqua" aria-hidden="true" />
              Ligar: {PHONE_DISPLAY}
            </a>
            <p className="pt-1 text-center text-[0.7rem] font-semibold tracking-[0.16em] text-muted uppercase">
              Serviços gráficos · Impressão · Marketing
            </p>
          </div>
        </nav>
      </div>,
      document.body,
      )}
    </>
  );
}
