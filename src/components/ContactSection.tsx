import { useState } from "react";
import { CheckCircle2, MapPin, Phone, Send } from "lucide-react";
import { FacebookIcon, WhatsAppIcon } from "./BrandIcons";
import WhatsAppLink from "./WhatsAppLink";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  MESSAGES,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  WHATSAPP_DISPLAY,
  whatsappUrl,
} from "../utils/whatsapp";

export const LOCATIONS = [
  {
    id: "localizacao-1",
    label: "Golf2, Quintalão do Petro",
    text: "Golf2, Quintalão do Petro, de frente às bombas da Sonangol — Rua 14.",
  },
  {
    id: "localizacao-2",
    label: "Golf2, Bairro Anel de Ouro",
    text: "Golf2, Bairro Anel de Ouro, por detrás do antigo Edifício da Coca-Cola, junto ao Colégio Inácio Maria.",
  },
];

const SUBJECTS = [
  { value: "orcamento", label: "Solicitar orçamento", message: "gostaria de solicitar um orçamento" },
  { value: "equipamentos", label: "Equipamentos", message: "tenho interesse nos vossos equipamentos profissionais" },
  { value: "personalizados", label: "Produtos personalizados", message: "gostaria de conhecer as opções de produtos personalizados" },
  { value: "disponibilidade", label: "Consultar disponibilidade", message: "gostaria de consultar a disponibilidade de artigos" },
  { value: "outro", label: "Outra necessidade", message: "tenho uma necessidade específica na área gráfica" },
];

interface ContactSectionProps {
  id?: string;
}

export default function ContactSection({ id = "contactos" }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0].value);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError("Indique o seu nome para podermos responder corretamente.");
      return;
    }
    if (trimmedMessage.length < 5) {
      setError("Escreva uma breve descrição do que pretende (mínimo 5 caracteres).");
      return;
    }

    setError("");

    const subjectLabel =
      SUBJECTS.find((item) => item.value === subject)?.message ?? "gostaria de solicitar um orçamento";

    const text = `Olá, Gráfica Noreth! Sou ${trimmedName} e ${subjectLabel}.\n\n${trimmedMessage}`;

    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section id={id} className="relative py-20 md:py-28" aria-labelledby="contactos-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Contactos"
          title={
            <span id="contactos-title">
              Vamos transformar a sua ideia em <span className="gradient-text">realidade</span>?
            </span>
          }
          description="Fale connosco para conhecer os equipamentos disponíveis, explorar as opções de personalização ou solicitar um orçamento para o seu negócio."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Cartões de contacto */}
          <div className="flex flex-col gap-4">
            <Reveal className="card flex items-start gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink/70 text-aqua">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[0.6875rem] font-bold tracking-[0.16em] text-muted uppercase">
                  Telefone
                </h3>
                <a
                  href={PHONE_TEL_HREF}
                  className="mt-1.5 block text-xl font-extrabold text-white transition-colors hover:text-aqua"
                >
                  {PHONE_DISPLAY}
                </a>
                <p className="mt-1 text-[0.8125rem] text-muted">
                  Chamada direta para a Gráfica Noreth.
                </p>
              </div>
            </Reveal>

            <Reveal delay={70} className="card flex items-start gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-wa/30 bg-wa/10 text-wa">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[0.6875rem] font-bold tracking-[0.16em] text-muted uppercase">
                  WhatsApp
                </h3>
                <p className="mt-1.5 text-xl font-extrabold text-white">{WHATSAPP_DISPLAY}</p>
                <p className="mt-1 text-[0.8125rem] text-muted">
                  A forma mais rápida de receber informações e orçamentos.
                </p>
                <WhatsAppLink
                  message={MESSAGES.geral}
                  variant="wa"
                  size="sm"
                  className="mt-4"
                >
                  Iniciar conversa
                </WhatsAppLink>
              </div>
            </Reveal>

            <Reveal delay={110} className="card flex items-start gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink/70 text-aqua">
                <FacebookIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[0.6875rem] font-bold tracking-[0.16em] text-muted uppercase">
                  Facebook
                </h3>
                <p className="mt-1.5 text-xl font-extrabold text-white">Gráfica Noreth</p>
                <p className="mt-1 text-[0.8125rem] text-muted">
                  Procure-nos na rede como Gráfica Noreth.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150} className="card p-6">
              <h3 className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.16em] text-aqua uppercase">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Localizações
              </h3>
              <ul className="mt-4 flex flex-col gap-4">
                {LOCATIONS.map((location) => (
                  <li key={location.id} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-electric to-aqua"
                    />
                    <div>
                      <p className="text-[0.9375rem] font-bold text-white">{location.label}</p>
                      <p className="mt-0.5 text-[0.875rem] leading-relaxed text-muted">
                        {location.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <WhatsAppLink
                message={MESSAGES.localizacao}
                variant="inline"
                size="sm"
                className="mt-5"
              >
                Confirmar localização e disponibilidade
              </WhatsAppLink>
            </Reveal>
          </div>

          {/* Formulário → WhatsApp */}
          <Reveal delay={90} className="card flex flex-col p-6 md:p-8">
            <h3 className="text-xl font-extrabold text-white">Envie-nos o seu pedido</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              Preencha os campos e a mensagem será preparada no WhatsApp — confirma e envia
              na aplicação, sem formulários demorados.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-[0.8125rem] font-semibold text-white">
                  Nome <span className="text-aqua">*</span>
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="field"
                  placeholder="O seu nome ou o nome da empresa"
                  autoComplete="name"
                  aria-required="true"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="assunto" className="text-[0.8125rem] font-semibold text-white">
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="field"
                >
                  {SUBJECTS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-[0.8125rem] font-semibold text-white">
                  Mensagem <span className="text-aqua">*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="field min-h-[130px] resize-y"
                  placeholder="Descreva o equipamento ou produto que procura, quantidades, materiais ou qualquer dúvida."
                  aria-required="true"
                />
              </div>

              {error ? (
                <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[0.8125rem] font-semibold text-red-200">
                  {error}
                </p>
              ) : null}

              <button type="submit" className="btn btn-primary w-full">
                <Send className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
                Enviar pelo WhatsApp
              </button>

              <p className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aqua" aria-hidden="true" />
                A mensagem não é enviada automaticamente: é aberta no WhatsApp para
                confirmação e envio por si.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
