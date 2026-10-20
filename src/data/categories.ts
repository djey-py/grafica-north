import heroApparel from "../assets/images/hero-apparel.jpg";
import heroMugs from "../assets/images/hero-mugs.jpg";
import catBadges from "../assets/images/cat-badges.jpg";
import catCopier from "../assets/images/cat-copier.jpg";
import catFinishing from "../assets/images/cat-finishing.jpg";
import catLaser from "../assets/images/cat-laser.jpg";
import catPress from "../assets/images/cat-press.jpg";
import catPrinting from "../assets/images/cat-printing.jpg";
import featuredKeychains from "../assets/images/featured-keychains.jpg";
import heroEquipment from "../assets/images/hero-equipment.jpg";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BatteryCharging,
  Copy,
  Gift,
  Layers,
  Printer,
  ScanLine,
  Zap,
} from "lucide-react";

/**
 * Inventário visual do website.
 * As fotografias são ilustrativas da tipologia de equipamento/produto e
 * encontram-se assinaladas como tal na interface. Para substituir por
 * fotografias reais da Gráfica Noreth basta trocar os ficheiros em
 * src/assets/images e/ou os importe abaixo.
 */
export const IMAGES = {
  heroEquipment,
  heroMugs,
  heroApparel,
  catPrinting,
  catPress,
  catLaser,
  catFinishing,
  catBadges,
  catCopier,
  featuredKeychains,
} as const;

export type ImageKey = keyof typeof IMAGES;

export interface Category {
  id: string;
  name: string;
  short: string;
  description: string;
  image: ImageKey | null;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  {
    id: "impressao-profissional",
    name: "Impressão profissional",
    short: "Impressão",
    description:
      "Impressoras profissionais para produção gráfica, impressão fotográfica e trabalho contínuo.",
    image: "catPrinting",
    icon: Printer,
  },
  {
    id: "plastificacao-acabamento",
    name: "Plastificação e acabamento",
    short: "Acabamento",
    description:
      "Laminadoras, guilhotinas e equipamentos de acabamento para um resultado final impecável.",
    image: "catFinishing",
    icon: Layers,
  },
  {
    id: "prensas-termicas",
    name: "Prensas térmicas",
    short: "Prensas",
    description:
      "Prensas planas para camisolas, canecas e soluções multifuncionais para sublimação e DTF.",
    image: "catPress",
    icon: Zap,
  },
  {
    id: "identificacao-crachas",
    name: "Identificação e crachás",
    short: "Crachás",
    description:
      "Equipamentos para impressão de cartões PVC e produção de crachás e bottons.",
    image: "catBadges",
    icon: BadgeCheck,
  },
  {
    id: "gravacao-laser",
    name: "Gravação a laser",
    short: "Laser",
    description:
      "Máquinas de gravação a laser para personalização de materiais e peças promocionais.",
    image: "catLaser",
    icon: ScanLine,
  },
  {
    id: "fotocopiadoras",
    name: "Fotocopiadoras",
    short: "Fotocópia",
    description:
      "Fotocopiadoras profissionais para escritórios, papelarias e centros de cópia.",
    image: "catCopier",
    icon: Copy,
  },
  {
    id: "personalizacao-brindes",
    name: "Personalização e brindes",
    short: "Personalização",
    description:
      "Equipamentos para personalização de vestuário, brindes e materiais publicitários.",
    image: "heroApparel",
    icon: Gift,
  },
  {
    id: "energia-protecao",
    name: "Energia e proteção elétrica",
    short: "Energia",
    description:
      "Estabilizadores e UPS para proteger os seus equipamentos de impressão e produção.",
    image: null,
    icon: BatteryCharging,
  },
];

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
) as Record<string, Category>;
