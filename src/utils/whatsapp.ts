/**
 * Integração central do WhatsApp Business — Gráfica Noreth.
 *
 * Todos os botões comerciais do website passam por este ficheiro, para
 * garantir que o número de destino e a codificação das mensagens são
 * sempre os mesmos.
 */

/** Número de WhatsApp (formato internacional, sem "+" nem espaços). */
export const WHATSAPP_NUMBER = "244930745803";

/** Número de WhatsApp formatado para exibição. */
export const WHATSAPP_DISPLAY = "+244 930 745 803";

/** Número de telefone (apenas chamadas — não usar em links wa.me). */
export const PHONE_DISPLAY = "+244 973 372 083";

/** Link de chamada telefónica direta. */
export const PHONE_TEL_HREF = "tel:+244973372083";

/** Nome comercial utilizado nas mensagens. */
export const COMPANY_NAME = "Gráfica Noreth";

/** Nome legal completo da empresa. */
export const COMPANY_LEGAL_NAME =
  "Gráfica Noreth — Prestação de Serviços & Comércio, Lda.";

/**
 * Constrói um link wa.me com a mensagem codificada.
 * O visitante confirma e envia a mensagem na interface do WhatsApp.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensagens comerciais padrão do website. */
export const MESSAGES = {
  geral:
    "Olá, Gráfica Noreth! Visitei o vosso website e gostaria de solicitar informações e um orçamento. Podem ajudar-me?",
  equipamentos:
    "Olá, Gráfica Noreth! Tenho interesse nos vossos equipamentos profissionais. Gostaria de receber informações sobre os modelos disponíveis, preços e condições de aquisição.",
  personalizados:
    "Olá, Gráfica Noreth! Gostaria de conhecer as opções de produtos personalizados. Podem informar-me sobre os produtos disponíveis, técnicas de personalização, quantidades e preços?",
  impressoras:
    "Olá, Gráfica Noreth! Tenho interesse em impressoras profissionais. Gostaria de conhecer as opções disponíveis e solicitar um orçamento.",
  prensas:
    "Olá, Gráfica Noreth! Tenho interesse em prensas térmicas para personalização. Podem informar-me sobre os modelos disponíveis e respetivos preços?",
  fotocopiadoras:
    "Olá, Gráfica Noreth! Gostaria de receber informações sobre fotocopiadoras profissionais Ricoh e Xerox, incluindo modelos disponíveis e preços.",
  laser:
    "Olá, Gráfica Noreth! Tenho interesse em máquinas de gravação a laser. Gostaria de conhecer as opções disponíveis e solicitar um orçamento.",
  portaChaves:
    "Olá, Gráfica Noreth! Gostaria de solicitar informações e um orçamento para porta-chaves personalizados. Podem apresentar-me as opções disponíveis?",
  localizacao:
    "Olá, Gráfica Noreth! Gostaria de confirmar a localização da empresa e saber mais sobre os equipamentos e produtos disponíveis para visita ou aquisição.",
  outrasNecessidades:
    "Olá, Gráfica Noreth! Tenho uma necessidade específica na área de impressão, publicidade ou personalização. Gostaria de saber se disponibilizam uma solução adequada.",
} as const;

/** Mensagem para um equipamento específico do catálogo. */
export function equipmentMessage(equipmentName: string): string {
  return `Olá, Gráfica Noreth! Tenho interesse em ${equipmentName}. Gostaria de receber informações sobre modelos disponíveis, preço e condições de aquisição.`;
}

/** Mensagem para um produto personalizado específico. */
export function personalizadoMessage(productName: string): string {
  return `Olá, Gráfica Noreth! Gostaria de personalizar ${productName}. Podem informar-me sobre as opções disponíveis, quantidades, preços e possibilidades de personalização?`;
}

/** Mensagem para uma categoria de equipamentos. */
export function categoryMessage(categoryName: string): string {
  return `Olá, Gráfica Noreth! Tenho interesse em ${categoryName}. Podem informar-me sobre os equipamentos disponíveis, preços e condições de aquisição?`;
}
