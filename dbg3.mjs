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

process.on("unhandledRejection", (e) => console.log("UNHANDLED REJECTION:", e?.message || e));
process.on("uncaughtException", (e) => console.log("UNCAUGHT:", e?.message || e));


async function main() {
  const { default: App } = await import("./src/App.tsx");
  const container = document.createElement("div");
  document.body.appendChild(container);
  createRoot(container).render(React.createElement(App));
  await new Promise(r => setTimeout(r, 400));

  console.log("hash:", window.location.hash);
  const links = [...document.querySelectorAll("header nav a")];
  console.log("nav links:", links.map(a => a.getAttribute("href")));
  links[1].click();
  await new Promise(r => setTimeout(r, 600));
  console.log("after click hash:", window.location.hash);
  console.log("h1:", document.querySelector("h1")?.textContent?.slice(0, 50));
  console.log("has catalog section:", !!document.getElementById("catalogo"));

}
main().catch(e=>{console.log('MAIN ERR',e);process.exit(1)});
