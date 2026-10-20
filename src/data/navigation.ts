export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", to: "/" },
  { label: "Equipamentos", to: "/equipamentos" },
  { label: "Produtos personalizados", to: "/personalizados" },
  { label: "Soluções para negócios", to: "/solucoes" },
  { label: "Sobre nós", to: "/sobre" },
  { label: "Contactos", to: "/contactos" },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Navegação",
    items: [NAV_ITEMS[0], NAV_ITEMS[3], NAV_ITEMS[4], NAV_ITEMS[5]],
  },
  {
    title: "Equipamentos",
    items: [
      { label: "Catálogo completo", to: "/equipamentos" },
      { label: "Prensas térmicas", to: "/equipamentos?categoria=prensas-termicas" },
      { label: "Impressoras profissionais", to: "/equipamentos?categoria=impressao-profissional" },
      { label: "Fotocopiadoras", to: "/equipamentos?categoria=fotocopiadoras" },
    ],
  },
  {
    title: "Personalização",
    items: [
      { label: "Produtos personalizados", to: "/personalizados" },
      { label: "Porta-chaves personalizados", to: "/personalizados#porta-chaves" },
      { label: "Vestuário personalizado", to: "/personalizados" },
      { label: "Técnicas de personalização", to: "/personalizados#tecnicas" },
    ],
  },
];
