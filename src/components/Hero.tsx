import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { ArrowDownRight, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import "swiper/css";
import { MESSAGES } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";

import printingImage from "../assets/images/hero/printing.webp";
import giftsImage from "../assets/images/hero/gifts.webp";
import apparelImage from "../assets/images/hero/apparel.webp";
import equipmentImage from "../assets/images/hero/equipment.webp";
import visualImage from "../assets/images/hero/visual.webp";

const SLIDES = [
  {
    id: "impressao",
    eyebrow: "Produção gráfica",
    title: "Impressão profissional",
    description:
      "Dê forma às suas ideias com materiais impressos para apresentar a sua marca com qualidade e confiança.",
    phrase: "A qualidade da sua marca, em cada detalhe.",
    image: printingImage,
    imageAlt: "Materiais impressos e acabamentos gráficos numa gráfica profissional",
    cta: "Falar sobre impressão",
    to: "/solucoes",
  },
  {
    id: "brindes",
    eyebrow: "A sua marca em todo o lado",
    title: "Brindes personalizados",
    description:
      "Canecas, garrafas, cadernos e outros artigos para oferecer, promover a sua empresa e criar boas recordações.",
    phrase: "Ideias que ficam com as pessoas.",
    image: giftsImage,
    imageAlt: "Seleção de brindes promocionais como canecas, garrafa, caderno e saco de tecido",
    cta: "Ver produtos personalizados",
    to: "/personalizados",
  },
  {
    id: "vestuario",
    eyebrow: "Identidade para a sua equipa",
    title: "Vestuário personalizado",
    description:
      "Vista a identidade da sua empresa com opções de vestuário personalizável para equipas, eventos e negócios.",
    phrase: "A sua equipa, com uma identidade única.",
    image: apparelImage,
    imageAlt: "Casaco, camisolas e polos lisos disponíveis para personalização",
    cta: "Explorar personalização",
    to: "/personalizados",
  },
  {
    id: "equipamentos",
    eyebrow: "Produção e acabamento",
    title: "Equipamentos gráficos",
    description:
      "Encontre soluções profissionais de impressão, acabamento e personalização para dar capacidade ao seu negócio.",
    phrase: "Equipamento certo para produzir mais.",
    image: equipmentImage,
    imageAlt: "Impressora gráfica profissional de grande formato num espaço de produção",
    cta: "Explorar equipamentos",
    to: "/equipamentos",
  },
  {
    id: "comunicacao-visual",
    eyebrow: "Destaque para a sua marca",
    title: "Comunicação visual",
    description:
      "Leve a sua mensagem mais longe com soluções visuais para promover a sua marca e destacar o seu espaço.",
    phrase: "Faça-se notar. Seja lembrado.",
    image: visualImage,
    imageAlt: "Exemplos de materiais gráficos de comunicação visual em tons azuis numa sala de exposição",
    cta: "Pedir uma solução à medida",
    to: "/solucoes",
  },
] as const;

export default function Hero() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!swiper || !swiper.autoplay) return;
    if (reducedMotion) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [reducedMotion, swiper]);

  return (
    <section className="hero-slider-section relative isolate overflow-hidden border-b border-white/[0.06]" aria-label="Serviços da Gráfica Noreth">
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-[12%] h-[32rem] w-[32rem] rounded-full bg-electric/[0.16] blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[20%] -right-48 h-[34rem] w-[34rem] rounded-full bg-aqua/[0.1] blur-[160px]" />

      <div className="shell relative py-8 sm:py-10 lg:py-14">
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-aqua/20 bg-aqua/[0.07] px-3.5 py-2 text-[0.62rem] font-bold tracking-[0.16em] text-aqua uppercase sm:px-4 sm:text-[0.68rem]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Gráfica Noreth <span className="text-white/35">/</span> Serviços
          </span>
          <span className="hidden text-xs font-semibold text-muted sm:inline">Luanda, Angola</span>
        </div>

        <div className="hero-swiper-shell overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#080f20] shadow-[0_36px_110px_-48px_rgba(8,103,232,0.62)] sm:rounded-[1.8rem] lg:rounded-[2.1rem]">
          <Swiper
            modules={[Autoplay, Keyboard, A11y]}
            loop
            speed={700}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            a11y={{
              prevSlideMessage: "Serviço anterior",
              nextSlideMessage: "Serviço seguinte",
              slideLabelMessage: "{{index}} de {{slidesLength}}",
            }}
            onSwiper={setSwiper}
            onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
            className="hero-swiper"
          >
            {SLIDES.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <article className="hero-slide grid min-h-0 lg:min-h-[510px] lg:grid-cols-[0.72fr_1.28fr]" aria-labelledby={`hero-title-${slide.id}`}>
                  <div className="hero-slide-copy relative z-10 order-2 flex flex-col items-start justify-center px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:order-1 lg:px-10 lg:py-12 xl:px-14">
                    <span className="text-[0.64rem] font-bold tracking-[0.18em] text-aqua uppercase sm:text-xs">{slide.eyebrow}</span>
                    <h1 id={`hero-title-${slide.id}`} className="mt-3 max-w-[13ch] text-[clamp(2rem,5vw,3.65rem)] leading-[1.02] font-extrabold tracking-[-0.055em] text-white">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-[1.75] text-muted sm:mt-5 sm:text-base">{slide.description}</p>
                    <div className="mt-6 flex w-full flex-col gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:flex-wrap">
                      <Link to={slide.to} className="btn btn-primary min-h-[50px] px-5 text-sm sm:px-6 sm:text-[0.92rem]">
                        {slide.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      {index === 0 || index === 4 ? (
                        <WhatsAppLink message={index === 0 ? MESSAGES.geral : MESSAGES.outrasNecessidades} variant="ghost" size="sm" className="min-h-[50px]">
                          Pedir orçamento
                        </WhatsAppLink>
                      ) : null}
                    </div>
                  </div>

                  <figure className="hero-slide-visual group relative order-1 m-0 min-h-[240px] overflow-hidden bg-[#07101d] sm:min-h-[320px] lg:order-2 lg:min-h-[510px]">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={1200}
                      height={800}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="hero-slide-image absolute inset-0 h-full w-full object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#050914]/70 via-transparent to-[#050914]/10 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#050914]/20" />
                    <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8">
                      <span className="max-w-[min(88%,24rem)] rounded-xl border border-aqua/35 bg-[#0867e8]/90 px-4 py-3 text-xs leading-snug font-bold text-white shadow-[0_12px_40px_-16px_rgba(8,103,232,0.95)] backdrop-blur-md sm:px-5 sm:py-3.5 sm:text-sm">
                        {slide.phrase}
                      </span>
                      <ArrowDownRight className="hidden h-8 w-8 shrink-0 text-white/70 drop-shadow sm:block" aria-hidden="true" />
                    </figcaption>
                  </figure>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-5" aria-label="Controlos do slider">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5" aria-label="Progresso dos serviços">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => swiper?.slideToLoop(index)}
                aria-label={`Mostrar serviço ${index + 1}: ${slide.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="hero-progress-button group h-8 min-w-0 flex-1 cursor-pointer py-3"
              >
                <span className="hero-progress-track block h-[3px] overflow-hidden rounded-full bg-white/15 transition-colors group-hover:bg-white/30">
                  <span className={`hero-progress-fill block h-full rounded-full bg-gradient-to-r from-electric to-aqua ${activeIndex === index && !reducedMotion ? "is-running" : ""}`} />
                </span>
              </button>
            ))}
          </div>
          <span className="min-w-[3.3rem] text-right font-mono text-xs font-semibold tracking-wider text-white" aria-live="polite" aria-atomic="true">
            {String(activeIndex + 1).padStart(2, "0")}<span className="mx-1 text-muted/55">/</span>{String(SLIDES.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => swiper?.slidePrev()} className="hero-control-button" aria-label="Serviço anterior">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => swiper?.slideNext()} className="hero-control-button" aria-label="Serviço seguinte">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
