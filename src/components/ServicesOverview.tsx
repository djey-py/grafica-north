import { ArrowRight, Boxes, Gift, Printer, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";
import { MESSAGES } from "../utils/whatsapp";

const SERVICES = [
  {
    icon: Printer,
    title: "Trabalhos gráficos",
    text: "Cartões de visita, roll-ups, carimbos, envelopes e materiais para dar visibilidade à sua marca.",
  },
  {
    icon: Gift,
    title: "Personalização",
    text: "Polos, T-shirts, bonés, coletes, sacolas, agendas, porta-chaves e brindes personalizados.",
  },
  {
    icon: Boxes,
    title: "Materiais e consumíveis",
    text: "Toners, tintas e outros materiais gráficos para apoiar o trabalho diário da sua empresa.",
  },
  {
    icon: ScanLine,
    title: "Equipamentos gráficos",
    text: "Prensas térmicas e máquinas de impressão, bordado e gravação a laser.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="border-y border-line/60 bg-ink-soft/50 py-20 md:py-24" aria-labelledby="servicos-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Serviços & comércio"
          title={<span id="servicos-title">Serviços gráficos e materiais para a sua marca</span>}
          description="Na Gráfica Noreth encontra serviços de impressão e personalização, materiais gráficos e consumíveis, além de equipamentos para dar forma às suas ideias."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 70}>
                <article className="card flex h-full flex-col p-5 md:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink/70 text-aqua">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[1rem] font-bold text-white">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-muted">{service.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <WhatsAppLink message={MESSAGES.geral}>Pedir informações ou orçamento</WhatsAppLink>
          <Link to="/personalizados" className="btn btn-ghost">
            Ver produtos personalizados <ArrowRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
