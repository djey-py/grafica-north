import PageHeader from "../components/PageHeader";
import Solutions from "../components/Solutions";
import SectionHeading from "../components/SectionHeading";
import WhatsAppLink from "../components/WhatsAppLink";
import Reveal from "../components/Reveal";
import { MESSAGES } from "../utils/whatsapp";

const STEPS = [
  {
    title: "Descreva a sua necessidade",
    text: "Indique a área em que pretende trabalhar, o tipo de produção e os produtos que pretende oferecer.",
  },
  {
    title: "Receba informações",
    text: "A Gráfica Noreth apresenta os equipamentos disponíveis e as opções adequadas ao seu contexto.",
  },
  {
    title: "Esclareça dúvidas",
    text: "Modelos, disponibilidade e condições de aquisição são confirmados diretamente com a empresa.",
  },
  {
    title: "Avance com o seu projeto",
    text: "Com o equipamento certo, dá o próximo passo para concretizar a sua ideia de negócio.",
  },
];

export default function Solucoes() {
  return (
    <>
      <PageHeader
        eyebrow="Soluções para negócios"
        title={
          <>
            Equipamentos certos para transformar a sua ideia num{" "}
            <span className="gradient-text">negócio</span>.
          </>
        }
        description="Se pretende iniciar uma atividade na área gráfica, expandir os serviços da sua empresa ou modernizar a sua produção, a Gráfica Noreth disponibiliza equipamentos e soluções para diferentes necessidades profissionais."
      >
        <WhatsAppLink message={MESSAGES.outrasNecessidades}>
          Falar com um especialista
        </WhatsAppLink>
      </PageHeader>

      <Solutions />

      <section className="border-t border-line/60 bg-ink-soft/50 py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Como funciona"
            title="Do primeiro contacto à concretização do projeto"
            description="Um processo simples, pensado para que chegue rapidamente à informação de que precisa."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80}>
                <div className="card flex h-full flex-col gap-3 p-6">
                  <span className="gradient-text text-2xl font-extrabold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1rem] leading-snug font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <WhatsAppLink message={MESSAGES.equipamentos}>
              Consultar disponibilidade
            </WhatsAppLink>
            <WhatsAppLink message={MESSAGES.localizacao} variant="ghost">
              Confirmar localização
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  );
}
