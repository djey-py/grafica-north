# SEO, indexação, medição e publicação — Gráfica Noreth

## O que foi aplicado no código

A configuração foi adaptada ao website existente da Gráfica Noreth. O domínio confirmado na Vercel para este projeto é `https://grafica-north.vercel.app`; a Vercel não devolveu um domínio `graficanoreth.ao` ligado ao projeto. Por isso, canonical, Open Graph e sitemap usam o host ativo e verificável. Se a empresa ligar um domínio próprio, atualize primeiro os endereços canónicos e só depois solicite indexação.

- URLs reais para as seis páginas existentes, com `BrowserRouter`; links antigos `/#/rota` são encaminhados para o caminho equivalente.
- `src/data/seo-pages.json` é a fonte única dos títulos e descrições de cada página.
- O plugin em `vite.config.ts` gera HTML estático por página após o build. Cada documento recebe title, description, canonical, Open Graph e `WebPage` JSON-LD próprios; `vercel.json` publica os documentos com URLs limpas.
- `public/robots.txt` permite rastreio e anuncia o sitemap. `public/sitemap.xml` lista apenas as seis rotas reais.
- `public/grafica-noreth-og.png` (1200 × 630) é a imagem Open Graph/Twitter; `public/noreth-mark.svg` é o ícone.
- As imagens fotográficas estão otimizadas em WebP, com texto alternativo e dimensões; a imagem principal tem prioridade de carregamento.
- JSON-LD descreve a empresa como `LocalBusiness`, com a única morada confirmada: Golf2, Quintalão do Petro, de frente às bombas da Sonangol — Rua 14.
- `public/404.html` fornece a página de erro estática para Vercel; a aplicação mantém também uma vista 404 para navegação interna. URLs desconhecidas devem ser testadas no deployment para confirmar o status HTTP 404.
- `vercel.json` configura URLs sem `.html`, normalização de barra final e cabeçalhos de segurança. A Vercel fornece HTTPS para o domínio `vercel.app`; o `.htaccess` é apenas alternativa para alojamento Apache e não é aplicado pela Vercel.
- Google Analytics 4 tem suporte opcional, consentimento explícito e eventos de page view, WhatsApp, contactos e formulário. O Measurement ID ainda não está configurado nas variáveis do projeto Vercel, portanto não há recolha de dados ativa.

## Google Search Console e indexação — requer validação da empresa

A integração real não pode ser concluída sem verificação da propriedade do domínio no Google. Nenhum token foi inventado e não foi afirmado que o Google já indexou o site.

1. Escolha o domínio público definitivo. Atualmente o projeto Vercel só tem `grafica-north.vercel.app` associado; ligue o domínio oficial no hosting/DNS, se aplicável.
2. Crie/valide a propriedade correspondente no [Google Search Console](https://search.google.com/search-console/) por DNS. Se usar verificação HTML, forneça o token para o inserir no `<head>`.
3. Depois de o deployment público estar atualizado e acessível por HTTPS, submeta `https://grafica-north.vercel.app/sitemap.xml` (ou o sitemap do domínio oficial que vier a ser ligado).
4. Use Inspeção de URL nas páginas públicas para verificar resposta, canonical e rastreabilidade; peça indexação quando apropriado. A submissão não garante indexação ou posicionamento.

## Google Analytics 4 — Measurement ID por configurar

O código e eventos estão preparados, mas `list_env_vars` da Vercel não encontrou variáveis para o projeto. Para ativar medição:

1. Crie uma propriedade GA4 e um fluxo Web, e use o Measurement ID público `G-...`.
2. Configure `VITE_GA_MEASUREMENT_ID` no ambiente Production (e Preview, se desejado) da Vercel e faça um novo deployment. `.env.example` mostra a variável sem valor.
3. Verifique Realtime/DebugView depois de aceitar o consentimento. O script só é carregado após consentimento explícito; recusa e preferências ficam disponíveis na interface.

Eventos presentes no código: `page_view`, `click_whatsapp`, `click_contact`, `form_start`, `form_submit` e eventos condicionais para ligações específicas. Não são enviados nomes, telefones, emails ou texto livre do formulário. `form_submit` regista o pedido encaminhado para WhatsApp, não confirma que a mensagem foi efetivamente enviada.

## HTTPS, redirects e segurança

- O deployment está no domínio Vercel `grafica-north.vercel.app`, servido com TLS/HTTPS pela Vercel. HTTP→HTTPS e a normalização de URLs limpas são geridos pelo hosting/configuração da Vercel; `trailingSlash: false` evita variantes com barra final.
- Não foi configurado redirect de `www` nem de `graficanoreth.ao`: esses domínios não aparecem associados ao projeto Vercel. Ligue e valide o domínio antes de criar redirects/canónicos para ele.
- `vercel.json` aplica HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` e Content Security Policy. Confirme os cabeçalhos HTTP no deployment final, especialmente após qualquer integração nova.
- `public/.htaccess` conserva os cabeçalhos/cache/compressão para alojamento Apache. Não controla o deployment Vercel.

## Validação antes de anunciar indexação

Após publicar as alterações:

- confirmar `/robots.txt`, `/sitemap.xml`, `/grafica-noreth-og.png` e a página inexistente no domínio final;
- confirmar status HTTP 404 numa URL inexistente;
- verificar em cada página title, description, canonical, Open Graph e JSON-LD no HTML recebido (sem depender de JavaScript);
- verificar os cabeçalhos de segurança e o redirecionamento HTTP→HTTPS no deployment;
- validar os dados estruturados no [Schema Markup Validator](https://validator.schema.org/) e testar desempenho no PageSpeed Insights.

Os passos de Search Console/indexação e GA4 só devem ser considerados concluídos depois da verificação externa e do teste real descritos acima.
