import { MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ContactSection from "../components/ContactSection";
import SectionHeading from "../components/SectionHeading";
import WhatsAppLink from "../components/WhatsAppLink";
import Reveal from "../components/Reveal";
import { LOCATIONS } from "../components/ContactSection";
import { MESSAGES } from "../utils/whatsapp";

export default function Contactos() {
  return (
    <>
      <PageHeader
        eyebrow="Contactos"
        title={
          <>
            Vamos transformar a sua ideia em{" "}
            <span className="gradient-text">realidade</span>?
          </>
        }
        description="Fale connosco para conhecer os equipamentos disponíveis, explorar as opções de personalização ou solicitar um orçamento para o seu negócio."
      >
        <WhatsAppLink message={MESSAGES.geral}>
          Falar com a Gráfica Noreth
        </WhatsAppLink>
      </PageHeader>

      <ContactSection id="contactos-completos" />

      <section className="border-t border-line/60 bg-ink-soft/50 py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Localizações"
            title="Onde encontrar a Gráfica Noreth"
            description="Duas referências de localização em Luanda. Como as referências podem exigir confirmação, recomendamos validar a melhor opção antes da deslocação."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {LOCATIONS.map((location, index) => (
              <Reveal key={location.id} delay={index * 90}>
                <article className="card card-hover flex h-full flex-col gap-4 p-6 md:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-ink/70 text-aqua">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-[1.0625rem] font-bold text-white">{location.label}</h3>
                  <p className="flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {location.text}
                  </p>
                  <WhatsAppLink
                    message={MESSAGES.localizacao}
                    variant="ghost"
                    size="sm"
                    className="w-fit"
                  >
                    Confirmar localização
                  </WhatsAppLink>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-line bg-ink/60 p-6">
            <h3 className="text-[0.9375rem] font-bold text-white">
              Nota sobre as localizações
            </h3>
            <p className="max-w-3xl text-[0.875rem] leading-relaxed text-muted">
              As duas referências são apresentadas exatamente como fornecidas pela empresa.
              Para evitar deslocações desnecessárias, confirme previamente por WhatsApp onde
              se encontram os equipamentos e produtos que pretende consultar.
            </p>
            <WhatsAppLink message={MESSAGES.localizacao} size="sm">
              Confirmar localização pelo WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  );
}
