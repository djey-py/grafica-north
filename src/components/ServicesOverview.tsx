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
    <section className="services-overview-section" aria-labelledby="servicos-title">
      <div className="shell services-overview-layout">
        <div className="services-overview-intro">
          <SectionHeading
            align="left"
            eyebrow="Serviços & comércio"
            title={<span id="servicos-title">Tudo para dar forma à sua marca.</span>}
            description="Da primeira impressão ao produto final, encontra aqui serviços, materiais e equipamentos para fazer a sua ideia avançar."
          />
          <div className="services-overview-actions">
            <WhatsAppLink message={MESSAGES.geral}>Pedir informações ou orçamento</WhatsAppLink>
            <Link to="/personalizados" className="services-overview-link">
              Explorar personalizados <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <span className="services-overview-watermark" aria-hidden="true">N</span>
        </div>

        <div className="services-overview-list">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 70}>
                <article className="service-line">
                  <span className="service-line-number">0{index + 1}</span>
                  <span className="service-line-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div className="service-line-copy">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <ArrowRight className="service-line-arrow" aria-hidden="true" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
