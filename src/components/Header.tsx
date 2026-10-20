import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao mudar de página
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  // Bloqueia o scroll do body com o menu aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape fecha o menu e devolve o foco ao botão
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled || open
          ? "border-line/80 bg-ink/85 backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-ink/90 to-transparent",
      )}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-4 md:h-[76px]">
        <Link
          to="/"
          className="rounded-lg transition-opacity hover:opacity-90"
          aria-label="Gráfica Noreth — Página inicial"
        >
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative rounded-full px-3 py-2 text-[0.8125rem] font-semibold transition-colors xl:px-3.5 xl:text-[0.875rem]",
                      isActive
                        ? "text-white"
                        : "text-muted hover:text-white",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-electric to-aqua transition-opacity",
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

        <div className="flex items-center gap-2.5">
          <a
            href={PHONE_TEL_HREF}
            className="hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.8125rem] font-semibold text-muted transition-colors hover:border-aqua/50 hover:text-white xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-aqua" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <WhatsAppLink
            message={MESSAGES.geral}
            size="sm"
            className="hidden sm:inline-flex"
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
            aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel/70 text-white transition-colors hover:border-aqua/50 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-line/70 bg-ink/97 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Navegação principal (mobile)" className="shell py-4">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-electric/12 text-white"
                        : "text-muted hover:bg-white/5 hover:text-white",
                    )
                  }
                >
                  {item.label}
                  <span aria-hidden="true" className="text-aqua">
                    →
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-line/70 pt-4">
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
          </div>
        </nav>
      </div>
    </header>
  );
}
