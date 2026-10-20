import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "./BrandIcons";
import { Logo } from "./Logo";
import WhatsAppLink from "./WhatsAppLink";
import { FOOTER_NAV } from "../data/navigation";
import {
  COMPANY_LEGAL_NAME,
  MESSAGES,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  WHATSAPP_DISPLAY,
} from "../utils/whatsapp";

const LOCATIONS = [
  "Golf2, Quintalão do Petro, de frente às bombas da Sonangol — Rua 14.",
  "Golf2, Bairro Anel de Ouro, por detrás do antigo Edifício da Coca-Cola, junto ao Colégio Inácio Maria.",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-8 border-t border-line/80 bg-ink-soft/60">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
          <div className="max-w-sm">
            <Link to="/" aria-label="Gráfica Noreth — Página inicial" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-5 text-sm font-semibold leading-snug text-white">
              {COMPANY_LEGAL_NAME}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Qualidade, personalização e profissionalismo em cada detalhe. Equipamentos
              profissionais e soluções gráficas para o seu negócio.
            </p>
            <WhatsAppLink
              message={MESSAGES.geral}
              size="sm"
              variant="ghost"
              className="mt-5"
            >
              Falar com a Gráfica Noreth
            </WhatsAppLink>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-[0.6875rem] font-bold tracking-[0.18em] text-aqua uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[0.6875rem] font-bold tracking-[0.18em] text-aqua uppercase">
              Contactos
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={PHONE_TEL_HREF}
                  className="inline-flex items-start gap-2.5 text-muted transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                  <span>
                    Telefone
                    <span className="block font-semibold text-white">{PHONE_DISPLAY}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-[0.7rem] font-bold text-wa"
                >
                  WA
                </span>
                <span>
                  WhatsApp
                  <span className="block font-semibold text-white">{WHATSAPP_DISPLAY}</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <FacebookIcon className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span>
                  Facebook
                  <span className="block font-semibold text-white">Gráfica Noreth</span>
                </span>
              </li>
            </ul>

            <h3 className="mt-7 text-[0.6875rem] font-bold tracking-[0.18em] text-aqua uppercase">
              Localizações
            </h3>
            <ul className="mt-4 space-y-3">
              {LOCATIONS.map((location) => (
                <li
                  key={location}
                  className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-line mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="text-[0.8125rem] text-muted">
            © {year} {COMPANY_LEGAL_NAME} Todos os direitos reservados.
          </p>
          <p className="text-[0.8125rem] text-muted">
            Na Gráfica Noreth transformamos ideias em realidade.
          </p>
        </div>
      </div>
    </footer>
  );
}
