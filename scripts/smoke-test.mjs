/**
 * Smoke test: carrega a aplicação num DOM em memória (happy-dom) e percorre
 * todas as rotas, registando erros de runtime e validando os links de
 * WhatsApp e o número de destino.
 */
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
    canonical.href = "https://graficanoreth.ao/";
    document.head.appendChild(canonical);
    const container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
    root = createRoot(container);
    root.render(React.createElement(App));
    await wait(400);
  const results = [];

  for (const route of ROUTES) {
    const link = [...document.querySelectorAll("header nav a")].find(
      (a) => a.getAttribute("href") === `#${route}`,
    );
    if (!link) throw new Error(`Nav link nao encontrado para ${route}`);
    link.click();
    await wait(350);

    const html = document.body.innerHTML;
    const waLinks = [...document.querySelectorAll('a[href*="wa.me"]')];
    const telLinks = [...document.querySelectorAll('a[href^="tel:"]')];
    results.push({
      route,
      hash: window.location.hash,
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

  window.history.pushState(null, "", "#/rota-inexistente");
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: null }));
  await wait(220);
  const missingTitle = document.title;
  const missingRobots = document.querySelector('meta[name="robots"]')?.getAttribute("content");
  if (!missingTitle.startsWith("404") || !missingRobots?.startsWith("noindex")) {
    throw new Error(`Rota inválida sem metadados 404: title=${missingTitle}, robots=${missingRobots}, hash=${window.location.hash}`);
  }

  // Teste de pesquisa no catálogo
  [...document.querySelectorAll("header nav a")].find(
    (a) => a.getAttribute("href") === "#/equipamentos",
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
  const menuOpen = document.getElementById("menu-mobile")?.hasAttribute("hidden") === false;

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
