/**
 * Smoke test: carrega a aplicação num DOM em memória (happy-dom) e percorre
 * todas as rotas, registando erros de runtime e validando os links de
 * WhatsApp e o número de destino.
 */
import { readFile } from "node:fs/promises";
import { Window } from "happy-dom";
import React from "react";
import { createServer } from "vite";

const window = new Window({ url: "https://graficanoreth.test/" });
const document = window.document;

globalThis.window = window;
globalThis.document = document;
Object.defineProperty(globalThis, "navigator", { value: window.navigator, configurable: true });
globalThis.HTMLElement = window.HTMLElement;
globalThis.Element = window.Element;
globalThis.HTMLFormElement = window.HTMLFormElement;
globalThis.HTMLInputElement = window.HTMLInputElement;
globalThis.HTMLAnchorElement = window.HTMLAnchorElement;
globalThis.HTMLButtonElement = window.HTMLButtonElement;
globalThis.HTMLSlotElement = window.HTMLSlotElement;
globalThis.ResizeObserver = window.ResizeObserver;
globalThis.location = window.location;
globalThis.history = window.history;
globalThis.CustomEvent = window.CustomEvent;
globalThis.MouseEvent = window.MouseEvent;
globalThis.KeyboardEvent = window.KeyboardEvent;
globalThis.Event = window.Event;
globalThis.SVGElement = window.SVGElement;
globalThis.Node = window.Node;
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe(el) {
    queueMicrotask(() => this.callback([{ isIntersecting: true, target: el }], this));
  }
  disconnect() {}
  unobserve() {}
};

const errors = [];
window.addEventListener("error", (event) => errors.push(String(event.message)));


const ROUTES = ["/", "/equipamentos", "/personalizados", "/solucoes", "/sobre", "/contactos"];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });
  let root;
  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
    const { createRoot } = await import("react-dom/client");
    const robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    robotsMeta.content = "index,follow";
    document.head.appendChild(robotsMeta);
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = "https://grafica-north.vercel.app/";
    document.head.appendChild(canonical);
    const container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
    root = createRoot(container);
    root.render(React.createElement(App));
    await wait(400);
    if (document.querySelectorAll(".hero-progress-button").length !== 5) {
      throw new Error("O slider da homepage não apresenta os cinco serviços previstos.");
    }
    if (!document.querySelector('img[src="/images/storefront-noreth.webp"]')) {
      throw new Error("A fotografia real da entrada da Gráfica Noreth não foi encontrada na homepage.");
    }
    if (document.querySelectorAll('button[aria-label^="Ampliar imagem:"]').length < 22) {
      throw new Error("A galeria da homepage não apresenta os novos exemplos de trabalhos reais.");
    }
    const christmasSection = document.querySelector("#surpresa-de-natal");
    if (!christmasSection || christmasSection.getAttribute("data-release-at") !== "2026-12-01T00:00:00+01:00") {
      throw new Error("A secção de Natal ou a data de abertura não está configurada corretamente.");
    }
    const christmasContent = christmasSection.querySelector("[data-christmas-content]");
    const christmasPosters = christmasSection.querySelectorAll('img[src^="/images/natal/"]');
    if (Date.now() < Date.parse("2027-11-30T23:00:00.000Z")) {
      if (christmasContent || christmasPosters.length || !christmasSection.textContent.includes("A surpresa abre em")) {
        throw new Error("A campanha de Natal deve mostrar apenas a contagem decrescente antes da data.");
      }
    } else if (!christmasContent || christmasPosters.length !== 20) {
      throw new Error("A campanha de Natal não revelou todos os cartazes após a data de abertura.");
    }
  const results = [];

  for (const route of ROUTES) {
    const link = [...document.querySelectorAll("header nav a")].find(
      (a) => a.getAttribute("href") === route,
    );
    if (!link) throw new Error(`Nav link nao encontrado para ${route}`);
    link.click();
    await wait(350);

    if (route === "/personalizados") {
      const realWorkPhotos = document.querySelectorAll(
        'article img[alt*="fotografia de trabalho realizado"]',
      );
      if (realWorkPhotos.length < 6) {
        throw new Error("As fotografias reais de vestuário e brindes não aparecem no catálogo.");
      }
    }

    if (route === "/equipamentos") {
      const promotionalPosters = document.querySelectorAll(
        'article img[alt*="cartaz promocional"]',
      );
      if (promotionalPosters.length < 8) {
        throw new Error("Os cartazes promocionais das máquinas não aparecem no catálogo.");
      }
      if ([...promotionalPosters].some((image) => !image.className.includes("object-contain"))) {
        throw new Error("Um cartaz promocional está a ser cortado no catálogo.");
      }
    }

    const html = document.body.innerHTML;
    const waLinks = [...document.querySelectorAll('a[href*="wa.me"]')];
    const telLinks = [...document.querySelectorAll('a[href^="tel:"]')];
    results.push({
      route,
      path: window.location.pathname,
      title: document.title,
      chars: html.length,
      h1: document.querySelector("h1")?.textContent?.slice(0, 40),
      waLinks: waLinks.length,
      telLinks: telLinks.length,
      images: document.querySelectorAll("img").length,
      brokenNumber: waLinks.filter((a) => !a.getAttribute("href").includes("244930745803")).length,
      emptyHref: [...document.querySelectorAll("a")].filter(
        (a) => !a.getAttribute("href") || a.getAttribute("href") === "#",
      ).length,
      encodedMsg: waLinks.filter((a) => a.getAttribute("href").includes("%20")).length,
    });
  }

  window.history.pushState(null, "", "/#/equipamentos");
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: null }));
  await wait(400);
  if (window.location.pathname !== "/equipamentos") {
    throw new Error(`A rota hash antiga não foi redirecionada: ${window.location.href}`);
  }

  window.history.pushState(null, "", "/rota-inexistente");
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: null }));
  await wait(220);
  const missingTitle = document.title;
  const missingRobots = document.querySelector('meta[name="robots"]')?.getAttribute("content");
  if (!missingTitle.startsWith("404") || !missingRobots?.startsWith("noindex")) {
    throw new Error(`Rota inválida sem metadados 404: title=${missingTitle}, robots=${missingRobots}, hash=${window.location.hash}`);
  }

  // Teste de pesquisa no catálogo
  [...document.querySelectorAll("header nav a")].find(
    (a) => a.getAttribute("href") === "/equipamentos",
  )?.click();
  await wait(300);
  const search = document.getElementById("pesquisa-equipamentos");
  const before = document.querySelectorAll("article").length;
  if (search) {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    );
    setter.set.call(search, "laser");
    search.dispatchEvent(new window.InputEvent("input", { bubbles: true, inputType: "insertText", data: "laser" }));
    search.dispatchEvent(new window.Event("change", { bubbles: true }));
    await wait(200);
  }
  const after = document.querySelectorAll("article").length;

  // Menu mobile
  const menuButton = document.querySelector('button[aria-controls="menu-mobile"]');
  if (menuButton) {
    menuButton.click();
    await wait(120);
  }
  const mobilePanel = document.getElementById("menu-mobile");
  const mobileLinkCount = mobilePanel?.querySelectorAll(
    'nav[aria-label="Navegação principal (mobile)"] a[href]',
  ).length ?? 0;
  const menuOpen = mobilePanel?.parentElement === document.body && mobileLinkCount >= ROUTES.length;

  for (const route of ROUTES) {
    const outputFile = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    const staticHtml = await readFile(new URL(`../dist/${outputFile}`, import.meta.url), "utf8");
    const expectedTitle = results.find((result) => result.path === route)?.title;
    if (!expectedTitle || !staticHtml.includes(`<title>${expectedTitle}</title>`)) {
      throw new Error(`HTML estático sem título correto para ${route}`);
    }
    if (!staticHtml.includes(`rel="canonical" href="https://grafica-north.vercel.app${route === "/" ? "/" : route}"`)) {
      throw new Error(`HTML estático sem canonical correto para ${route}`);
    }
    if (route === "/") {
      const favicon = await readFile(new URL("../dist/favicon.png", import.meta.url));
      if (!staticHtml.includes('href="/favicon.png"') || favicon.length < 500) {
        throw new Error("O favicon não usa o logótipo da Gráfica Noreth.");
      }
      if (!staticHtml.includes('"logo": "https://grafica-north.vercel.app/logo-grafica-noreth.png"')) {
        throw new Error("Os dados estruturados não apontam para o logótipo oficial.");
      }
      for (let index = 1; index <= 20; index += 1) {
        const poster = await readFile(
          new URL(`../dist/images/natal/natal-${String(index).padStart(2, "0")}.webp`, import.meta.url),
        );
        if (poster.length < 50_000) {
          throw new Error(`Cartaz de Natal ${index} em falta ou incompleto no build.`);
        }
      }
    }
  }
  const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
  if (ROUTES.some((route) => !sitemap.includes(`https://grafica-north.vercel.app${route === "/" ? "/" : route}`))) {
    throw new Error("Sitemap estático não inclui todas as rotas públicas.");
  }
  const notFoundHtml = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
  if (!notFoundHtml.includes('src="/logo-grafica-noreth.png"') || !notFoundHtml.includes('name="robots" content="noindex,follow"')) {
    throw new Error("A página 404 estática não tem o logo oficial ou a diretiva noindex.");
  }

  if (new Set(results.map((result) => result.title)).size !== ROUTES.length) {
    throw new Error("Os titles SEO das rotas não são únicos.");
  }
  if (results.some((result) => result.brokenNumber || result.emptyHref)) {
    throw new Error("Foi encontrado um link WhatsApp inválido ou um link sem destino.");
  }
  if (!search || after >= before) throw new Error("A pesquisa do catálogo não filtrou os produtos.");
  if (!menuOpen) throw new Error("O menu mobile não abriu no teste.");

  console.table(results);
  console.log({
    searchTest: { before, after, query: "laser" },
    mobileMenuOpens: menuOpen,
    runtimeErrors: errors,
    sampleWaLink: document.querySelector('a[href*="wa.me"]')?.getAttribute("href")?.slice(0, 140),
  });

  if (errors.length) {
    console.error("RUNTIME ERRORS:", errors);
    process.exit(1);
  }
  console.log("SMOKE TEST OK");
  } finally {
    root?.unmount();
    await vite.close();
  }
}

main().catch((error) => {
  console.error("SMOKE TEST FAILED:", error);
  process.exit(1);
});
