import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import { MESSAGES } from "../utils/whatsapp";
import WhatsAppLink from "./WhatsAppLink";

import capsImage from "../assets/images/hero/custom-caps.webp";
import shirtsImage from "../assets/images/hero/embroidered-shirts.webp";
import totesImage from "../assets/images/hero/printed-totes.webp";
import schoolKeychainsImage from "../assets/images/hero/school-keychains.webp";
import brandKeychainsImage from "../assets/images/hero/brand-keychains.webp";

const SLIDES = [
  {
    id: "bones",
    eyebrow: "Bordado personalizado",
    title: "Bonés personalizados",
    description:
      "Bordados com detalhe para destacar a identidade da sua organização, equipa ou evento.",
    phrase: "A sua identidade, bordada ao detalhe.",
    image: capsImage,
    imageAlt: "Bonés azuis com brasões e identificação institucional bordados",
    imageWidth: 1280,
    imageHeight: 960,
    cta: "Ver personalização",
    to: "/personalizados",
  },
  {
    id: "camisas",
    eyebrow: "Uniformes e vestuário",
    title: "Camisas personalizadas",
    description:
      "Personalize camisas de trabalho e uniformes para dar à equipa uma imagem cuidada e consistente.",
    phrase: "A sua equipa, com identidade própria.",
    image: shirtsImage,
    imageAlt: "Camisas brancas com o logótipo Inside Interiores bordado no peito",
    imageWidth: 1280,
    imageHeight: 960,
    cta: "Explorar vestuário",
    to: "/personalizados",
  },
  {
    id: "sacolas",
    eyebrow: "Impressão para marcas e eventos",
    title: "Sacolas personalizadas",
    description:
      "Transforme sacolas de tecido em suportes de comunicação para campanhas, eventos e lançamentos.",
    phrase: "Leve a sua mensagem consigo.",
    image: totesImage,
    imageAlt: "Sacolas brancas de tecido impressas com material de divulgação de um lançamento de livro",
    imageWidth: 1280,
    imageHeight: 960,
    cta: "Personalizar sacolas",
    to: "/personalizados",
  },
  {
    id: "porta-chaves-institucionais",
    eyebrow: "Brindes úteis para divulgar",
    title: "Porta-chaves personalizados",
    description:
      "Apresente a identidade da sua escola, empresa ou evento num brinde prático para oferecer e divulgar.",
    phrase: "A sua marca, sempre à mão.",
    image: schoolKeychainsImage,
    imageAlt: "Conjunto de porta-chaves personalizados com a identidade de uma escola de condução",
    imageWidth: 960,
    imageHeight: 1280,
    cta: "Ver opções de brindes",
    to: "/personalizados",
  },
  {
    id: "porta-chaves-de-marca",
    eyebrow: "Peças promocionais",
    title: "Porta-chaves com logótipo",
    description:
      "Leve o logótipo da sua empresa ou projeto para um artigo promocional útil, compacto e fácil de oferecer.",
    phrase: "Pequenos detalhes, uma marca memorável.",
    image: brandKeychainsImage,
    imageAlt: "Porta-chaves azuis personalizados com o logótipo Cyber Riding",
    imageWidth: 960,
    imageHeight: 1280,
    cta: "Pedir o seu orçamento",
    to: "/personalizados",
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
    <section className="hero-slider-section relative isolate overflow-hidden border-b border-white/[0.06]" aria-label="Produtos personalizados da Gráfica Noreth">
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-[12%] h-[32rem] w-[32rem] rounded-full bg-electric/[0.16] blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[20%] -right-48 h-[34rem] w-[34rem] rounded-full bg-aqua/[0.1] blur-[160px]" />

      <div className="shell hero-fullscreen-inner relative">
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
                      <WhatsAppLink message={MESSAGES.personalizados} variant="ghost" size="sm" className="min-h-[50px]">
                        Pedir informações
                      </WhatsAppLink>
                    </div>
                  </div>

                  <div className="hero-slide-visual group relative order-1 min-w-0 overflow-hidden bg-[#07101d] lg:order-2">
                    <figure className="hero-slide-figure relative m-0 h-full min-h-[240px] overflow-hidden bg-[#07101d] sm:min-h-[320px] lg:min-h-[510px]">
                    <img
                      src={slide.image}
                      alt=""
                      aria-hidden="true"
                      decoding="async"
                      className="hero-slide-backdrop absolute inset-0 h-full w-full object-cover"
                    />
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={slide.imageWidth}
                      height={slide.imageHeight}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="hero-slide-image absolute inset-0 h-full w-full object-contain p-1 sm:p-2 lg:p-3"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#050914]/70 via-transparent to-[#050914]/10 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#050914]/20" />
                    <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8">
                      <span className="max-w-[min(88%,24rem)] rounded-xl border border-aqua/35 bg-[#0867e8]/90 px-4 py-3 text-xs leading-snug font-bold text-white shadow-[0_12px_40px_-16px_rgba(8,103,232,0.95)] backdrop-blur-md sm:px-5 sm:py-3.5 sm:text-sm">
                        {slide.phrase}
                      </span>
                      <ArrowDownRight className="hidden h-8 w-8 shrink-0 text-white/70 drop-shadow sm:block" aria-hidden="true" />
                    </figcaption>
                    </figure>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hero-controls flex items-center gap-3" aria-label="Controlos do slider">
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
