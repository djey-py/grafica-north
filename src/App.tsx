import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Equipamentos from "./pages/Equipamentos";
import Personalizados from "./pages/Personalizados";
import Solucoes from "./pages/Solucoes";
import Sobre from "./pages/Sobre";
import Contactos from "./pages/Contactos";

const SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Gráfica Noreth | Equipamentos Gráficos e Produtos Personalizados em Luanda",
    description:
      "Descubra equipamentos profissionais de impressão, prensas térmicas, fotocopiadoras e produtos personalizados na Gráfica Noreth. Solicite informações e orçamentos pelo WhatsApp.",
  },
  "/equipamentos": {
    title: "Equipamentos gráficos e de impressão | Gráfica Noreth",
    description:
      "Catálogo de equipamentos profissionais: impressoras, laminadoras, guilhotinas, prensas térmicas, máquinas de gravação a laser e fotocopiadoras Ricoh e Xerox. Consulte pelo WhatsApp.",
  },
  "/personalizados": {
    title: "Produtos personalizados e brindes | Gráfica Noreth",
    description:
      "T-shirts, polos, canecas, porta-chaves, crachás, bottons e outros brindes personalizados com impressão UV, sublimação, DTF, gravação a laser e bordado. Peça um orçamento.",
  },
  "/solucoes": {
    title: "Soluções para negócios gráficos | Gráfica Noreth",
    description:
      "Equipamentos e soluções para impressão, produção gráfica, publicidade, comunicação visual, brindes e identificação corporativa. Fale com um especialista.",
  },
  "/sobre": {
    title: "Sobre a Gráfica Noreth | Equipamentos e soluções gráficas",
    description:
      "Conheça a Gráfica Noreth — Prestação de Serviços & Comércio, Lda., equipamentos profissionais e soluções gráficas para empresas, instituições e empreendedores.",
  },
  "/contactos": {
    title: "Contactos e localizações | Gráfica Noreth",
    description:
      "Fale com a Gráfica Noreth por telefone ou WhatsApp, consulte as localizações em Luanda e solicite orçamentos para equipamentos e produtos personalizados.",
  },
};

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const meta = SEO[location.pathname] ?? SEO["/"];
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", window.location.href);

    // Âncora interna (ex.: /personalizados#tecnicas)
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        window.requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <RouteEffects />
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("conteudo");
          main?.focus();
          main?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-ink"
      >
        Saltar para o conteúdo principal
      </button>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipamentos" element={<Equipamentos />} />
            <Route path="/personalizados" element={<Personalizados />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <WhatsAppButton />
    </HashRouter>
  );
}
