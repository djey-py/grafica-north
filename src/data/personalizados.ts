import type { ImageKey } from "./categories";

export interface PersonalizedProduct {
  id: string;
  name: string;
  singular: string;
  description: string;
  image: ImageKey | null;
  imageAlt?: string;
  gradient: string;
  price?: string;
  priceOptions?: { label: string; price: string }[];
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
    price: "1.000 Kz",
    featured: true,
    keywords: ["porta-chaves", "chaveiro", "brinde", "acrílico", "metal", "couro"],
  },
  {
    id: "t-shirts",
    name: "T-shirts",
    singular: "t-shirts",
    description: "T-shirts personalizadas para equipas, eventos, campanhas e uso promocional.",
    image: "workSampleTshirtsAsagropec",
    gradient: "from-[#0867E8] to-[#382080]",
    priceOptions: [
      { label: "Tecido pesado", price: "4.000 Kz" },
      { label: "Tecido leve · sublimação", price: "3.000 Kz" },
      { label: "Tecido leve · DTF", price: "3.500 Kz" },
    ],
    keywords: ["t-shirt", "camisola", "vestuário", "roupa", "texto", "sublimação", "DTF"],
  },
  {
    id: "camisas",
    name: "Camisas",
    singular: "camisas",
    description: "Camisas personalizadas para equipas, empresas e eventos.",
    image: "workSampleEmbroideredShirts",
    imageAlt: "Camisas brancas com o logótipo Inside Interiores bordado — fotografia de trabalho realizado pela Gráfica Noreth.",
    gradient: "from-[#0E1730] to-[#1677FF]",
    price: "10.000 Kz",
    keywords: ["camisa", "uniforme", "vestuário", "trabalho"],
  },
  {
    id: "polos",
    name: "Polos",
    singular: "polos",
    description: "Polos personalizados com aplicação adequada a vestuário corporativo.",
    image: "workSamplePoloDreamhomeFront",
    gradient: "from-[#1677FF] to-[#20B9F2]",
    priceOptions: [
      { label: "Lacoste timbrada", price: "6.000 Kz" },
      { label: "Lacoste bordada", price: "8.500 Kz" },
    ],
    keywords: ["polo", "Lacoste", "timbrada", "vestuário", "corporativo", "bordado"],
  },
  {
    id: "bones",
    name: "Chapéus e bonés",
    singular: "chapéus e bonés",
    description: "Chapéus e bonés personalizados para equipas, eventos e ações promocionais.",
    image: "workSampleCapsAsagropecGroup",
    gradient: "from-[#0B1224] to-[#0867E8]",
    priceOptions: [
      { label: "Timbrado", price: "3.000 Kz" },
      { label: "Bordado", price: "6.500 Kz" },
    ],
    keywords: ["chapéu", "boné", "timbrado", "bordado", "capacete", "vestuário", "headwear"],
  },
  {
    id: "coletes-refletores",
    name: "Coletes refletores",
    singular: "coletes refletores",
    description: "Coletes refletores personalizados para equipas de trabalho e segurança.",
    image: "workSampleVestBgs",
    gradient: "from-[#20B9F2] to-[#0867E8]",
    priceOptions: [
      { label: "Normal", price: "3.000 Kz" },
      { label: "Com bolso", price: "4.500 Kz" },
    ],
    keywords: ["colete", "refletor", "normal", "com bolso", "segurança", "trabalho"],
  },
  {
    id: "coletes-multibolsos",
    name: "Coletes multibolsos",
    singular: "coletes multibolsos",
    description: "Coletes multibolsos personalizados para uso técnico e promocional.",
    image: "workSampleVestAngola",
    gradient: "from-[#382080] to-[#0867E8]",
    priceOptions: [
      { label: "Bordado", price: "18.000 Kz" },
      { label: "Timbrado", price: "16.500 Kz" },
    ],
    keywords: ["colete", "multibolsos", "timbrado", "bordado", "técnico", "trabalho"],
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
    id: "sacolas-tnt",
    name: "Sacolas TNT",
    singular: "sacolas TNT",
    description: "Sacolas TNT personalizadas para eventos, campanhas e divulgação da sua marca.",
    image: "workSamplePrintedTotes",
    imageAlt: "Sacolas brancas com impressão colorida — fotografia de trabalho realizado pela Gráfica Noreth.",
    gradient: "from-[#0867E8] to-[#20B9F2]",
    price: "1.500 Kz",
    keywords: ["sacola", "TNT", "sacola TNT", "brinde", "evento"],
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
    image: "workSampleKeychainsDrivingSchool",
    title: "Porta-chaves de uma escola de condução",
    caption: "Exemplo de porta-chaves personalizados com a identidade visual de um cliente.",
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
    image: "workSampleTshirtsAsagropec",
    title: "T-shirts personalizadas ASAGROPEC",
    caption: "Exemplo de vestuário personalizado para a marca ASAGROPEC.",
    group: "Personalização",
  },
  {
    id: "g10",
    image: "catPrinting",
    title: "Impressoras profissionais",
    caption: "Impressão de qualidade para produção gráfica e fotográfica.",
    group: "Equipamentos",
  },
  {
    id: "work-vest-angola",
    image: "workSampleVestAngola",
    title: "Colete de trabalho personalizado",
    caption: "Colete multibolsos com identificação institucional para uma equipa na Lunda Norte.",
    group: "Personalização",
  },
  {
    id: "work-vest-multibolsos",
    image: "workSampleVestMultibolsos",
    title: "Colete multibolsos bordado",
    caption: "Vestuário de trabalho personalizado com faixas refletoras e emblema bordado.",
    group: "Personalização",
  },
  {
    id: "work-caps-asagropec-group",
    image: "workSampleCapsAsagropecGroup",
    title: "Bonés e t-shirts ASAGROPEC",
    caption: "Conjunto de bonés e t-shirts personalizados para a marca ASAGROPEC.",
    group: "Personalização",
  },
  {
    id: "work-cap-asagropec",
    image: "workSampleCapAsagropec",
    title: "Boné ASAGROPEC",
    caption: "Boné personalizado com a identidade visual da ASAGROPEC.",
    group: "Personalização",
  },
  {
    id: "work-caps-asagropec-lot",
    image: "workSampleCapsAsagropecLot",
    title: "Lote de bonés personalizados",
    caption: "Vários bonés personalizados para a marca ASAGROPEC.",
    group: "Personalização",
  },
  {
    id: "work-polo-inside",
    image: "workSamplePoloInside",
    title: "Vestuário Inside Interiores",
    caption: "Exemplo de vestuário personalizado com a identidade Inside Interiores.",
    group: "Personalização",
  },
  {
    id: "work-keychains-cyber-red",
    image: "workSampleKeychainsCyberRed",
    title: "Porta-chaves CYBER — vermelho",
    caption: "Porta-chaves personalizados com a marca CYBER Riding.",
    group: "Personalização",
  },
  {
    id: "work-keychains-cyber-white",
    image: "workSampleKeychainsCyberWhite",
    title: "Porta-chaves CYBER — branco",
    caption: "Outra versão de porta-chaves personalizados para a marca CYBER Riding.",
    group: "Personalização",
  },
  {
    id: "work-vest-bgs",
    image: "workSampleVestBgs",
    title: "Coletes refletores BGS",
    caption: "Coletes de alta visibilidade personalizados para a equipa BGS.",
    group: "Personalização",
  },
  {
    id: "work-polo-dreamhome-front",
    image: "workSamplePoloDreamhomeFront",
    title: "Polo Dreamhome — frente",
    caption: "Polo personalizado com aplicação da identidade Dreamhome.",
    group: "Personalização",
  },
  {
    id: "work-polo-dreamhome-back",
    image: "workSamplePoloDreamhomeBack",
    title: "Polo Dreamhome — costas",
    caption: "Vista das costas do polo personalizado para a Dreamhome.",
    group: "Personalização",
  },
  {
    id: "work-polo-geoverde",
    image: "workSamplePoloGeoverde",
    title: "Polo GeoVerde",
    caption: "Polo escuro personalizado com o logótipo GeoVerde.",
    group: "Personalização",
  },
];

export const GALLERY_NOTE =
  "A galeria reúne trabalhos reais realizados pela Gráfica Noreth e imagens ilustrativas de categorias de equipamento. Consulte-nos para confirmar opções e disponibilidade.";
