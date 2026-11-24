import { Megaphone, Printer, ShieldCheck, Gift } from "lucide-react";
import SectionHeading from "./SectionHeading";
import WhatsAppLink from "./WhatsAppLink";
import Reveal from "./Reveal";

const SOLUTIONS = [
  {
    icon: Printer,
    title: "Impressão e produção gráfica",
    description:
      "Impressoras profissionais, laminadoras, guilhotinas e fotocopiadoras para quem produz ou pretende produzir trabalho gráfico com qualidade consistente.",
    message:
      "Olá, Gráfica Noreth! Tenho interesse em impressoras profissionais. Gostaria de conhecer as opções disponíveis e solicitar um orçamento.",
    cta: "Consultar equipamentos",
    color: "blue",
  },
  {
    icon: Megaphone,
    title: "Publicidade e comunicação visual",
    description:
      "Equipamentos para quem trabalha com publicidade, sinalética e comunicação visual, incluindo soluções de gravação e personalização.",
    message:
      "Olá, Gráfica Noreth! Trabalho com publicidade e comunicação visual e gostaria de conhecer os equipamentos disponíveis para este tipo de produção.",
    cta: "Falar sobre publicidade",
    color: "cyan",
  },
  {
    icon: Gift,
    title: "Brindes e produtos personalizados",
    description:
      "Prensas térmicas e equipamentos de personalização para produzir brindes, vestuário, canecas, porta-chaves e outros artigos com identidade própria.",
    message:
      "Olá, Gráfica Noreth! Gostaria de conhecer as opções de produtos personalizados. Podem informar-me sobre os produtos disponíveis, técnicas de personalização, quantidades e preços?",
    cta: "Quero personalizar",
    color: "violet",
  },
  {
    icon: ShieldCheck,
    title: "Identificação corporativa e materiais promocionais",
    description:
      "Crachás, cartões PVC, bottons e materiais promocionais para empresas, instituições, eventos e equipas de trabalho.",
    message:
      "Olá, Gráfica Noreth! Gostaria de receber informações sobre soluções de identificação corporativa e materiais promocionais para a minha organização.",
    cta: "Pedir informações",
    color: "blue",
  },
];

export default function Solutions() {
  return (
    <section id="solucoes" className="solutions-editorial-section" aria-labelledby="solucoes-title">
      <div className="shell">
        <div className="solutions-editorial-heading">
          <SectionHeading
            align="left"
            eyebrow="Soluções para negócios"
            title={
              <span id="solucoes-title">
                Equipamento para a próxima etapa do seu <span className="gradient-text">negócio</span>.
              </span>
            }
            description="Escolha a área que quer desenvolver. Ajudamos a encontrar equipamentos e soluções adequados ao seu projeto."
          />
          <span className="solutions-heading-stamp" aria-hidden="true">IDEIAS<br />EM PRODUÇÃO</span>
        </div>

        <div className="solutions-editorial-list">
          {SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Reveal key={solution.title} delay={index * 65}>
                <article className={`solution-row solution-row--${solution.color}`}>
                  <span className="solution-row-number">0{index + 1}</span>
                  <span className="solution-row-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div className="solution-row-copy">
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                  </div>
                  <WhatsAppLink
                    message={solution.message}
                    variant="ghost"
                    size="sm"
                    className="solution-row-cta"
                  >
                    {solution.cta}
                  </WhatsAppLink>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
