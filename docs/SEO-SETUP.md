# SEO, indexação, medição e publicação — Gráfica Noreth

## Estado e limites do projeto

O site é uma aplicação Vite/React com `HashRouter`, não o projeto de cursos descrito no prompt de referência. Foram mantidos a marca e os conteúdos da Gráfica Noreth. As rotas públicas existentes são Início, Equipamentos, Produtos personalizados, Soluções para negócios, Sobre nós e Contactos. Não existem páginas individuais de cursos, instrutores, inscrições, nem perfis de redes sociais confirmados neste repositório.

As rotas são fragmentos (`/#/equipamentos`), não documentos HTML separados. O sitemap lista apenas a raiz pública real. Fragmentos não são URLs independentes para indexação convencional; canonical e JSON-LD apontam para `https://graficanoreth.ao/`. Os títulos/descrições das vistas são atualizados no cliente. Sem SSR/prerender — não adicionado para preservar a arquitetura — os metadados das vistas internas não são entregues como HTML independente a todos os crawlers. Se for necessário posicionar cada secção como página autónoma, migre as rotas para URLs reais e configure prerender/SSR e o servidor antes de as acrescentar ao sitemap.

O domínio e endereço canónicos abaixo foram herdados do `og:url` que já existia no site; confirme a propriedade do domínio e a preferência por `www` com a empresa/hosting antes de publicar. Nenhuma verificação externa de DNS/SSL foi feita nesta implementação.

## Ficheiros

- `public/robots.txt`: permite o rastreamento e anuncia o sitemap.
- `public/sitemap.xml`: inclui somente a homepage existente, sem `lastmod` fabricado.
- `public/grafica-noreth-og.png` (1200 × 630) e fonte `public/grafica-noreth-og.svg`: partilha social na paleta e marca existentes.
- `public/noreth-mark.svg`: símbolo da marca para ícone e Schema.org.
- `public/404.html`: página estática de erro; o servidor precisa responder com status 404 para uma URL inexistente.
- `public/.htaccess`: cabeçalhos de segurança, cache/compressão e `ErrorDocument` para Apache. Não ativa redirecionamentos de domínio ou HSTS automaticamente.
- `src/utils/analytics.ts`, `src/components/AnalyticsConsent.tsx`: GA4 sob consentimento e eventos.
- `.env.example`: configuração opcional do GA4 (Measurement ID vazio por omissão).

## Domínio, canonical, sitemap e robots

1. Confirme com a empresa/hosting que `https://graficanoreth.ao/` é o host definitivo (sem `www`) e que aponta para este site.
2. Se o host oficial mudar, atualize o canonical, Open Graph, JSON-LD em `index.html`, `CANONICAL_HOME` em `src/App.tsx`, `public/sitemap.xml`, `public/robots.txt` e URLs na documentação. Use apenas URLs publicamente existentes; não crie entradas para fragmentos `#`.
3. `robots.txt` não bloqueia CSS, JS ou imagens. Não use robots para remover URLs do índice; para uma página privada use autenticação e/ou `noindex`.
4. `sitemap.xml` fica em `public/` e é copiado para a raiz publicada pelo Vite. Atualize quando forem criadas páginas URL independentes; use `lastmod` apenas se houver datas reais de alteração.

## Google Search Console

1. Crie uma propriedade de domínio para `graficanoreth.ao` no [Google Search Console](https://search.google.com/search-console/).
2. Verifique a propriedade pelo método DNS (ou meta tag HTML). Para o método meta, insira no `<head>` de `index.html` exatamente a tag com o token entregue pelo Google; há um comentário no local adequado, mas nenhum token foi inventado.
3. Após o site estar acessível publicamente em HTTPS, envie `https://graficanoreth.ao/sitemap.xml` em **Sitemaps**.
4. Use **Inspeção de URL** na homepage publicada para verificar rastreabilidade/canonical e solicitar indexação quando apropriado.
5. Consulte as secções de páginas, experiência e ações manuais ao longo do tempo. A submissão não garante indexação nem posicionamento.

## Google Analytics 4

1. Crie uma propriedade GA4 e um fluxo Web para o domínio publicado; copie o Measurement ID real (formato `G-...`).
2. Na compilação de produção, configure `VITE_GA_MEASUREMENT_ID` com esse valor (por exemplo, variável de ambiente no hosting; localmente, copie `.env.example` para `.env.local`). Não inclua credenciais privadas — o Measurement ID é identificador público.
3. Volte a compilar/republicar. Sem um ID válido a integração e o aviso de consentimento ficam inativos. Com ID configurado, o script oficial só é descarregado depois do consentimento explícito de análise; aceitação/recusa pode ser alterada pelo link de preferências no rodapé.
4. Eventos implementados onde há interações reais: `page_view` (vista SPA), `click_whatsapp`, `click_contact` (telefone/email), `form_start` e `form_submit` (após validação local e preparação/abertura do WhatsApp). Não são enviados nomes, telefones, emails nem texto livre do formulário. O formulário não confirma que o visitante enviou efetivamente a mensagem no WhatsApp; o evento regista a intenção/pedido encaminhado, não entrega confirmada. Os eventos `click_course`, `click_inscription` e `social_media_click` só terão origem quando esses links existirem; atualmente o site não apresenta cursos, inscrições ou links sociais oficiais.
5. Teste no GA4 DebugView/Realtime após aceitar consentimento. Não considere a integração ativa até configurar o ID e verificar os hits na propriedade.

O aviso é uma proteção técnica de opt-in para Analytics; confirme a política de privacidade/cookies e obrigações legais aplicáveis ao público/mercado com a empresa. Não foi criado texto jurídico nem feita uma avaliação legal.

## Imagem, desempenho e fontes

As imagens JPEG usadas pelo projeto foram convertidas para WebP, ajustadas a no máximo 1920 px no lado maior e substituídas nas importações. Imagens secundárias têm `loading="lazy"` e dimensões; a foto principal da fachada é eager/default e tem prioridade alta. O build Vite produz JavaScript/CSS e imagens em ficheiros separados com nomes versionados, minifica para produção e desativa o embedding de imagens pequenas para manter lazy loading e cache independentes. A imagem principal da fachada é um WebP público, pré-carregado no HTML e marcado com prioridade alta; `.htaccess` permite cache longo para recursos versionados e compressão de tipos textuais quando os módulos Apache estiverem disponíveis. O site usa Google Fonts por import CSS; CSP permite o CSS/fontes desses hosts e a pré-conexão está no HTML. Publique sempre todo o conteúdo de `dist/`, incluindo a pasta `assets/`.

Confira Core Web Vitals no PageSpeed Insights com o domínio publicado. Resultado local de build não substitui medições de rede/dispositivo reais.

## HTTPS, redirecionamentos e cabeçalhos

- Em Apache, publique os ficheiros de `dist/` incluindo o `.htaccess` (habilite `AllowOverride` e módulos `headers`, `expires`, `deflate`). Teste que uma URL inexistente recebe status HTTP `404` com o conteúdo de `/404.html`; o ficheiro sozinho não define o status.
- Configure certificado TLS válido no hosting/CDN. Só depois confirme que domínio principal e subdomínios usam HTTPS e configure redirecionamento HTTP→HTTPS e `www`→host principal no painel do hosting/CDN. As regras estão intencionalmente não ativadas por não se ter verificado certificado, alias ou host definitivo.
- HSTS está documentado como linha comentada no `.htaccess`; só o ative depois de validar HTTPS em todos os hosts/subdomínios necessários. Não adicione `includeSubDomains`/`preload` sem auditoria específica.
- `.htaccess` define CSP para os bundles externos do Vite, Google Fonts e GA4, mais `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e `frame-ancestors 'none'`. Faça um teste no ambiente real: CSP pode precisar de ajuste se o hosting adicionar outros recursos/integradores. Cabeçalhos só são enviados se Apache/mod_headers estiver ativo; em Netlify/Vercel/CDN, configure cabeçalhos equivalentes na respetiva plataforma.
- Não foi possível confirmar HTTPS, redirecionamentos ou cabeçalhos do hosting nesta etapa.

## Página 404 e validação

`public/404.html` funciona como página estática; `src/pages/NotFound.tsx` trata rotas hash desconhecidas dentro da aplicação e aplica `noindex`. O status HTTP 404 em URL que não existe depende da configuração do servidor; em Apache, `ErrorDocument 404 /404.html`. Como a navegação atual é por hash, uma rota desconhecida dentro do próprio shell já carregado continua naturalmente com o status da resposta inicial, tipicamente 200; para status 404 por rota é necessário URL real + regras do hosting.

Antes de considerar publicação validada:

- abrir `/robots.txt`, `/sitemap.xml`, `/grafica-noreth-og.png` e `/404.html` no domínio final;
- confirmar 404 real com `curl -I https://graficanoreth.ao/nao-existe` e testar links internos;
- conferir canonicals, metadados renderizados, JSON-LD e imagem social no HTML final;
- validar JSON-LD no [Schema Markup Validator](https://validator.schema.org/) e, quando aplicável, no [Rich Results Test](https://search.google.com/test/rich-results/);
- testar Search Console, PageSpeed Insights/Lighthouse e TLS/SSL Labs no domínio de produção.

A integração Search Console, indexação, GA4, HTTPS, cabeçalhos do servidor e status 404 não podem ser declarados concluídos até concluir e verificar os passos externos acima.
