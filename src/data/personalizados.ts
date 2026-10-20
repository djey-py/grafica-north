import type { ImageKey } from "./categories";

export interface PersonalizedProduct {
  id: string;
  name: string;
  singular: string;
  description: string;
  image: ImageKey | null;
  gradient: string;
  featured?: boolean;
  keywords?: string[];
}

export interface Technique {
  name: string;
  description: string;
}

/** Técnicas de personalização indicadas pela empresa. */
export const TECHNIQUES: Technique[] = [
  {
    name: "Impressão UV",
    description:
      "Impressão de alta definição com tintas curadas por ultravioleta, adequada a materiais rígidos e acabamentos duradouros.",
  },
  {
    name: "Sublimação",
    description:
      "Transferência de tinta por calor, muito utilizada em produtos com revestimento próprio para sublimação.",
  },
  {
    name: "DTF",
    description:
      "Transferência por filme, com boa aderência e flexibilidade em têxtil, inclusive em tecidos de cor escura.",
  },
  {
    name: "Gravação a laser",
    description:
      "Marcação permanente por laser, indicada para madeira, acrílico, metal, couro e outros materiais.",
  },
  {
    name: "Bordado",
    description:
      "Bordado aplicado em vestuário e têxtil-lar, com resultado resistente e de elevada perceção de qualidade.",
  },
];

export const TECHNIQUE_NOTE =
  "A técnica adequada depende do produto, do material e do efeito pretendido. A Gráfica Noreth confirma a melhor opção para cada pedido.";

export const PERSONALIZED_PRODUCTS: PersonalizedProduct[] = [
  {
    id: "porta-chaves",
    name: "Porta-chaves",
    singular: "porta-chaves",
    description:
      "Porta-chaves personalizados em diferentes materiais e formatos — um brinde de elevada visibilidade para a sua marca.",
    image: "featuredKeychains",
    gradient: "from-[#0867E8] via-[#1677FF] to-[#20B9F2]",
    featured: true,
    keywords: ["porta-chaves", "chaveiro", "brinde", "acrílico", "metal", "couro"],
  },
  {
    id: "t-shirts",
    name: "T-shirts",
    singular: "t-shirts",
    description: "T-shirts personalizadas para equipas, eventos, campanhas e uso promocional.",
    image: "heroApparel",
    gradient: "from-[#0867E8] to-[#382080]",
    keywords: ["t-shirt", "camisola", "vestuário", "roupa", "texto"],
  },
  {
    id: "polos",
    name: "Polos",
    singular: "polos",
    description: "Polos personalizados com aplicação adequada a vestuário corporativo.",
    image: "heroApparel",
    gradient: "from-[#1677FF] to-[#20B9F2]",
    keywords: ["polo", "vestuário", "corporativo", "bordado"],
  },
  {
    id: "bones",
    name: "Bonés",
    singular: "bonés",
    description: "Bonés personalizados para equipas, eventos e ação promocional.",
    image: "heroApparel",
    gradient: "from-[#0B1224] to-[#0867E8]",
    keywords: ["boné", "capacete", "vestuário", "headwear"],
  },
  {
    id: "coletes-refletores",
    name: "Coletes refletores",
    singular: "coletes refletores",
    description: "Coletes refletores personalizados para equipas de trabalho e segurança.",
    image: null,
    gradient: "from-[#20B9F2] to-[#0867E8]",
    keywords: ["colete", "refletor", "segurança", "trabalho"],
  },
  {
    id: "coletes-multibolsos",
    name: "Coletes multibolsos",
    singular: "coletes multibolsos",
    description: "Coletes multibolsos personalizados para uso técnico e promocional.",
    image: null,
    gradient: "from-[#382080] to-[#0867E8]",
    keywords: ["colete", "multibolsos", "técnico", "trabalho"],
  },
  {
    id: "canecas-termicas",
    name: "Canecas térmicas",
    singular: "canecas térmicas",
    description: "Canecas térmicas personalizadas para oferta e uso diário da sua marca.",
    image: "heroMugs",
    gradient: "from-[#1677FF] to-[#20B9F2]",
    keywords: ["caneca", "térmica", "sublimação", "brinde"],
  },
  {
    id: "chavenas",
    name: "Chávenas",
    singular: "chávenas",
    description: "Chávenas personalizadas para lembranças, eventos e oferta institucional.",
    image: "heroMugs",
    gradient: "from-[#0867E8] to-[#20B9F2]",
    keywords: ["chávena", "café", "loiça", "sublimação"],
  },
  {
    id: "canetas",
    name: "Canetas",
    singular: "canetas",
    description: "Canetas personalizadas — o brinde clássico com grande alcance de marca.",
    image: null,
    gradient: "from-[#20B9F2] to-[#382080]",
    keywords: ["caneta", "brinde", "escrita"],
  },
  {
    id: "cadernos",
    name: "Cadernos",
    singular: "cadernos",
    description: "Cadernos personalizados para instituições, empresas e eventos.",
    image: null,
    gradient: "from-[#0E1730] to-[#1677FF]",
    keywords: ["caderno", "bloco", "apontamentos"],
  },
  {
    id: "crachas",
    name: "Crachás",
    singular: "crachás",
    description: "Crachás personalizados para identificação de colaboradores e eventos.",
    image: "catBadges",
    gradient: "from-[#0867E8] to-[#20B9F2]",
    keywords: ["crachá", "identificação", "credencial", "pvc"],
  },
  {
    id: "bottons",
    name: "Bottons",
    singular: "bottons",
    description: "Bottons personalizados para campanhas, eventos e iniciativas institucionais.",
    image: "catBadges",
    gradient: "from-[#1677FF] to-[#382080]",
    keywords: ["botton", "button", "pin", "insígnia"],
  },
  {
    id: "outros-brindes",
    name: "Outros brindes e produtos personalizados",
    singular: "outros brindes e produtos",
    description:
      "Outras opções de brindes e produtos personalizados, conforme a necessidade do seu projeto.",
    image: null,
    gradient: "from-[#0867E8] via-[#382080] to-[#20B9F2]",
    keywords: ["brindes", "outros", "promoção", "oferta"],
  },
];

export interface GalleryItem {
  id: string;
  image: ImageKey;
  title: string;
  caption: string;
  group: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    image: "heroEquipment",
    title: "Impressão profissional",
    caption: "Equipamento de impressão profissional em ambiente de produção gráfica.",
    group: "Equipamentos",
  },
  {
    id: "g2",
    image: "catPress",
    title: "Prensas térmicas",
    caption: "Prensa térmica plana utilizada em personalização têxtil.",
    group: "Equipamentos",
  },
  {
    id: "g3",
    image: "catLaser",
    title: "Gravação a laser",
    caption: "Máquina de gravação a laser em trabalho sobre madeira.",
    group: "Equipamentos",
  },
  {
    id: "g4",
    image: "catFinishing",
    title: "Plastificação e corte",
    caption: "Acabamento com laminadora e guilhotina profissional.",
    group: "Equipamentos",
  },
  {
    id: "g5",
    image: "catBadges",
    title: "Cartões e crachás",
    caption: "Cartões PVC, crachás e bottons para identificação.",
    group: "Equipamentos",
  },
  {
    id: "g6",
    image: "catCopier",
    title: "Fotocopiadoras profissionais",
    caption: "Equipamento profissional de cópia e impressão para escritórios.",
    group: "Equipamentos",
  },
  {
    id: "g7",
    image: "featuredKeychains",
    title: "Porta-chaves personalizados",
    caption: "Porta-chaves em acrílico, metal e couro com gravação personalizada.",
    group: "Personalização",
  },
  {
    id: "g8",
    image: "heroMugs",
    title: "Canecas e chávenas",
    caption: "Personalização por sublimação em canecas e chávenas.",
    group: "Personalização",
  },
  {
    id: "g9",
    image: "heroApparel",
    title: "Vestuário personalizado",
    caption: "T-shirts, polos e bonés prontos para personalização.",
    group: "Personalização",
  },
  {
    id: "g10",
    image: "catPrinting",
    title: "Impressoras profissionais",
    caption: "Impressão de qualidade para produção gráfica e fotográfica.",
    group: "Equipamentos",
  },
];

export const GALLERY_NOTE =
  "As imagens apresentadas são ilustrativas das tipologias de equipamentos e produtos disponibilizados. Solicite fotografias e exemplos reais dos artigos disponíveis através do WhatsApp.";
