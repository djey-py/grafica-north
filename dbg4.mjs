import App from "./src/App.tsx";
import { Window } from "happy-dom";
import React from "react";
import { createRoot } from "react-dom/client";
const window = new Window({ url: "https://x.test/" });
const document = window.document;
globalThis.window = window; globalThis.document = document;
globalThis.navigator = window.navigator; globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLInputElement = window.HTMLInputElement;
globalThis.Node = window.Node; globalThis.SVGElement = window.SVGElement;
globalThis.Event = window.Event; globalThis.MouseEvent = window.MouseEvent;
globalThis.KeyboardEvent = window.KeyboardEvent; globalThis.CustomEvent = window.CustomEvent;
globalThis.location = window.location; globalThis.history = window.history;
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
globalThis.IntersectionObserver = class { observe(){} disconnect(){} unobserve(){} };
process.on("unhandledRejection", e => console.log("REJECTION:", e?.message || e));

const container = document.createElement("div"); document.body.appendChild(container);
createRoot(container).render(React.createElement(App));
const wait = ms => new Promise(r => setTimeout(r, ms));
async function main() {
  await wait(300);
  [...document.querySelectorAll("header nav a")].find(a => a.getAttribute("href") === "#/equipamentos").click();
  await wait(300);
  const count = () => document.querySelectorAll("article").length;
  console.log("articles initial:", count());
  const input = document.getElementById("pesquisa-equipamentos");
  console.log("input found:", !!input, "tag:", input?.tagName);
  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  nativeSetter.call(input, "laser");
  input.dispatchEvent(new window.Event("input", { bubbles: true }));
  await wait(300);
  console.log("articles after 'laser':", count());
  console.log("live region:", document.querySelector('[aria-live="polite"]')?.textContent);
  // filtro por categoria
  const chips = [...document.querySelectorAll("button.chip")];
  console.log("chips:", chips.length);
  const laserChip = chips.find(c => c.textContent.includes("Gravação a laser"));
  laserChip?.click();
  await wait(200);
  console.log("articles after laser category:", count(), "live:", document.querySelector('[aria-live="polite"]')?.textContent);
}
main().catch(e => console.log("ERR", e));
