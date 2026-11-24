import heroApparel from "../assets/images/hero-apparel.webp";
import heroMugs from "../assets/images/hero-mugs.webp";
import catBadges from "../assets/images/cat-badges.webp";
import catCopier from "../assets/images/cat-copier.webp";
import catFinishing from "../assets/images/cat-finishing.webp";
import catLaser from "../assets/images/cat-laser.webp";
import catPress from "../assets/images/cat-press.webp";
import catPrinting from "../assets/images/cat-printing.webp";
import featuredKeychains from "../assets/images/featured-keychains.webp";
import heroEquipment from "../assets/images/hero-equipment.webp";
import equipmentEpson from "../assets/images/equipment/epson-printers.webp";
import equipmentFlashStamp from "../assets/images/equipment/flash-stamp.webp";
import equipmentLaminator from "../assets/images/equipment/laminator-a4.webp";
import equipmentLaser from "../assets/images/equipment/laser-20w.webp";
import equipmentPressCylinderDouble from "../assets/images/equipment/press-cylinder-double.webp";
import equipmentPressFlat38 from "../assets/images/equipment/press-flat-38.webp";
import equipmentPress8in1 from "../assets/images/equipment/press-8-in-1.webp";
import equipmentUvDtf from "../assets/images/equipment/uv-dtf-locor.webp";
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
 * As imagens de equipamento fornecidas pela Gráfica Noreth são cartazes
 * promocionais e são identificadas como tal na interface. As demais imagens
 * continuam ilustrativas até serem substituídas por materiais correspondentes.
 */
export const IMAGES = {
  heroEquipment,
  equipmentEpson,
  equipmentFlashStamp,
  equipmentLaminator,
  equipmentLaser,
  equipmentPressCylinderDouble,
  equipmentPressFlat38,
  equipmentPress8in1,
  equipmentUvDtf,
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
    image: "equipmentEpson",
    icon: Printer,
  },
  {
    id: "plastificacao-acabamento",
    name: "Plastificação e acabamento",
    short: "Acabamento",
    description:
      "Laminadoras, guilhotinas e equipamentos de acabamento para um resultado final impecável.",
    image: "equipmentLaminator",
    icon: Layers,
  },
  {
    id: "prensas-termicas",
    name: "Prensas térmicas",
    short: "Prensas",
    description:
      "Prensas planas para camisolas, canecas e soluções multifuncionais para sublimação e DTF.",
    image: "equipmentPress8in1",
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
    image: "equipmentLaser",
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
    image: "equipmentUvDtf",
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
