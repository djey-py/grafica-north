/**
 * Smoke test: carrega a aplicação num DOM em memória (happy-dom) e percorre
 * todas as rotas, registando erros de runtime e validando os links de
 * WhatsApp e o número de destino.
 */
import { Window } from "happy-dom";
import App from "../src/App.tsx";
import React from "react";
import { createRoot } from "react-dom/client";

const window = new Window({ url: "https://graficanoreth.test/" });
const document = window.document;

globalThis.window = window;
globalThis.document = document;
globalThis.navigator = window.navigator;
globalThis.HTMLElement = window.HTMLElement;
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


  const container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);
  createRoot(container).render(React.createElement(App));

  const ROUTES = ["/", "/equipamentos", "/personalizados", "/solucoes", "/sobre", "/contactos"];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function main() {
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
    search.dispatchEvent(new window.Event("input", { bubbles: true }));
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
  }

  main().catch((error) => {
    console.error("SMOKE TEST FAILED:", error);
    process.exit(1);
  });
