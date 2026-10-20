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
    accent: "from-electric/25 to-transparent",
  },
  {
    icon: Megaphone,
    title: "Publicidade e comunicação visual",
    description:
      "Equipamentos para quem trabalha com publicidade, sinalética e comunicação visual, incluindo soluções de gravação e personalização.",
    message:
      "Olá, Gráfica Noreth! Trabalho com publicidade e comunicação visual e gostaria de conhecer os equipamentos disponíveis para este tipo de produção.",
    cta: "Falar sobre publicidade",
    accent: "from-aqua/20 to-transparent",
  },
  {
    icon: Gift,
    title: "Brindes e produtos personalizados",
    description:
      "Prensas térmicas e equipamentos de personalização para produzir brindes, vestuário, canecas, porta-chaves e outros artigos com identidade própria.",
    message:
      "Olá, Gráfica Noreth! Gostaria de conhecer as opções de produtos personalizados. Podem informar-me sobre os produtos disponíveis, técnicas de personalização, quantidades e preços?",
    cta: "Quero personalizar",
    accent: "from-grape/40 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "Identificação corporativa e materiais promocionais",
    description:
      "Crachás, cartões PVC, bottons e materiais promocionais para empresas, instituições, eventos e equipas de trabalho.",
    message:
      "Olá, Gráfica Noreth! Gostaria de receber informações sobre soluções de identificação corporativa e materiais promocionais para a minha organização.",
    cta: "Pedir informações",
    accent: "from-electric/20 to-transparent",
  },
];

export default function Solutions() {
  return (
    <section
      id="solucoes"
      className="relative py-20 md:py-28"
      aria-labelledby="solucoes-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Soluções para negócios"
          title={
            <span id="solucoes-title">
              Equipamentos certos para transformar a sua ideia num{" "}
              <span className="gradient-text">negócio</span>.
            </span>
          }
          description="Se pretende iniciar uma atividade na área gráfica, expandir os serviços da sua empresa ou modernizar a sua produção, a Gráfica Noreth disponibiliza equipamentos e soluções para diferentes necessidades profissionais."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Reveal key={solution.title} delay={(index % 2) * 90}>
                <article className="card card-hover group relative flex h-full flex-col gap-4 overflow-hidden p-6 md:p-7">
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${solution.accent}`}
                  />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink/80 text-aqua">
                    <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="relative text-[1.125rem] leading-snug font-bold text-white">
                    {solution.title}
                  </h3>
                  <p className="relative flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {solution.description}
                  </p>
                  <WhatsAppLink
                    message={solution.message}
                    variant="ghost"
                    size="sm"
                    className="relative mt-1 w-fit"
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
