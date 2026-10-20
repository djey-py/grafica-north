import type { ImageKey } from "./categories";

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: ImageKey | null;
  /** Termos extra para a pesquisa. */
  keywords?: string[];
}

/**
 * Catálogo de equipamentos — designações comerciais fornecidas pela empresa.
 * Sem preços, modelos, especificações ou condições inventadas.
 */
export const PRODUCTS: Product[] = [
  {
    id: "carimbo-flash",
    name: "Máquinas de Carimbo Flash",
    categoryId: "impressao-profissional",
    description:
      "Equipamento para produção rápida de carimbos profissionais, ideal para papelarias e serviços de reprografia.",
    image: "catFinishing",
    keywords: ["carimbo", "carimbos", "flash", "selo"],
  },
  {
    id: "laminadoras",
    name: "Laminadoras Profissionais",
    categoryId: "plastificacao-acabamento",
    description:
      "Plastificação de documentos, cartões e materiais impressos com acabamento resistente e profissional.",
    image: "catFinishing",
    keywords: ["laminadora", "plastificadora", "plastificação", "acabamento"],
  },
  {
    id: "guilhotinas",
    name: "Guilhotinas",
    categoryId: "plastificacao-acabamento",
    description:
      "Corte preciso de papel, cartolina e materiais gráficos para produção com medidas exatas.",
    image: "catFinishing",
    keywords: ["guilhotina", "corte", "papel", "trimmer"],
  },
  {
    id: "impressoras-epson",
    name: "Impressoras Epson",
    categoryId: "impressao-profissional",
    description:
      "Impressoras profissionais para impressão de qualidade em diferentes formatos e suportes.",
    image: "catPrinting",
    keywords: ["epson", "impressora", "impressão", "tinta"],
  },
  {
    id: "impressoras-canon",
    name: "Impressoras Canon",
    categoryId: "impressao-profissional",
    description:
      "Impressoras profissionais para produção gráfica, fotográfica e documental.",
    image: "catPrinting",
    keywords: ["canon", "impressora", "impressão", "fotográfica"],
  },
  {
    id: "impressoras-cartoes-pvc",
    name: "Impressoras para Cartões PVC",
    categoryId: "identificacao-crachas",
    description:
      "Impressão de cartões PVC para crachás, cartões de membro, credenciais e cartões de identificação.",
    image: "catBadges",
    keywords: ["pvc", "cartões", "crachá", "identificação", "cartão"],
  },
  {
    id: "estabilizadores-ups",
    name: "Estabilizadores e UPS",
    categoryId: "energia-protecao",
    description:
      "Proteção elétrica para equipamentos de impressão e produção gráfica.",
    image: null,
    keywords: ["estabilizador", "ups", "energia", "proteção", "elétrica", "bateria"],
  },
  {
    id: "prensas-camisolas",
    name: "Prensas Planas para Camisolas",
    categoryId: "prensas-termicas",
    description:
      "Prensa térmica plana para personalização de t-shirts, polos e vestuário.",
    image: "catPress",
    keywords: ["prensa", "camisola", "t-shirt", "sublimação", "dtf", "térmica"],
  },
  {
    id: "prensas-canecas",
    name: "Prensas Planas para Canecas",
    categoryId: "prensas-termicas",
    description:
      "Prensa térmica específica para personalização de canecas e chávenas.",
    image: "catPress",
    keywords: ["prensa", "caneca", "chávena", "sublimação", "térmica"],
  },
  {
    id: "prensas-8-em-1",
    name: "Prensas Planas Multifuncionais 8 em 1",
    categoryId: "prensas-termicas",
    description:
      "Solução multifuncional com vários acessórios para personalizar diferentes tipos de produto.",
    image: "catPress",
    keywords: ["prensa", "multifuncional", "8 em 1", "sublimação", "acessórios"],
  },
  {
    id: "maquinas-crachas-bottons",
    name: "Máquinas para Produção de Crachás e Bottons",
    categoryId: "identificacao-crachas",
    description:
      "Produção de crachás, bottons e pins personalizados para eventos, empresas e instituições.",
    image: "catBadges",
    keywords: ["crachá", "botton", "button", "pin", "produção"],
  },
  {
    id: "gravacao-laser",
    name: "Máquinas de Gravação a Laser",
    categoryId: "gravacao-laser",
    description:
      "Gravação e corte a laser para personalização de materiais como madeira, acrílico, couro e outros.",
    image: "catLaser",
    keywords: ["laser", "gravação", "corte", "acrílico", "madeira"],
  },
  {
    id: "fotocopiadoras-ricoh",
    name: "Fotocopiadoras Profissionais Ricoh",
    categoryId: "fotocopiadoras",
    description:
      "Fotocopiadoras profissionais para cópia, impressão e digitalização em volume.",
    image: "catCopier",
    keywords: ["ricoh", "fotocopiadora", "copiadora", "multifunções", "cópias"],
  },
  {
    id: "fotocopiadoras-xerox",
    name: "Fotocopiadoras Profissionais Xerox",
    categoryId: "fotocopiadoras",
    description:
      "Fotocopiadoras profissionais para escritórios, papelarias e centros de cópia.",
    image: "catCopier",
    keywords: ["xerox", "fotocopiadora", "copiadora", "multifunções", "cópias"],
  },
  {
    id: "equipamentos-publicidade",
    name: "Equipamentos para Personalização e Publicidade",
    categoryId: "personalizacao-brindes",
    description:
      "Equipamentos e soluções para quem trabalha ou pretende trabalhar com personalização e publicidade.",
    image: "heroApparel",
    keywords: ["publicidade", "personalização", "brindes", "propaganda", "publicidade visual"],
  },
];

export const EQUIPMENT_CATEGORIES_NOTE =
  "Designações comerciais fornecidas pela Gráfica Noreth. Os modelos, preços e condições são confirmados diretamente com a empresa.";
