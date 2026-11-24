import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import seoPages from "./src/data/seo-pages.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_ORIGIN = "https://grafica-north.vercel.app";

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;");
}

function replaceMeta(html: string, attribute: "name" | "property", key: string, value: string): string {
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*>`, "i");
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`);
}

function seoStaticPages(): Plugin {
  return {
    name: "noreth-static-seo-pages",
    apply: "build",
    async closeBundle() {
      const outputDirectory = path.resolve(__dirname, "dist");
      const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
      const urls: string[] = [];

      for (const page of seoPages) {
        const canonical = new URL(page.path, SITE_ORIGIN).href;
        urls.push(`  <url><loc>${canonical}</loc></url>`);
        if (page.path === "/") continue;

        let html = template
          .replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(page.title)}</title>`)
          .replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
        html = replaceMeta(html, "name", "description", page.description);
        html = replaceMeta(html, "property", "og:title", page.title);
        html = replaceMeta(html, "property", "og:description", page.description);
        html = replaceMeta(html, "property", "og:url", canonical);
        html = replaceMeta(html, "name", "twitter:title", page.title);
        html = replaceMeta(html, "name", "twitter:description", page.description);

        const structuredDataMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
        if (structuredDataMatch) {
          const structuredData = JSON.parse(structuredDataMatch[1]);
          const webPage = structuredData["@graph"]?.find((entry: { [key: string]: unknown }) => entry["@type"] === "WebPage");
          if (webPage) {
            webPage["@id"] = `${canonical}#webpage`;
            webPage.url = canonical;
            webPage.name = page.title;
            webPage.description = page.description;
          }
          html = html.replace(structuredDataMatch[0], `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>`);
        }

        const fileName = `${page.path.slice(1)}.html`;
        await writeFile(path.join(outputDirectory, fileName), html);
      }

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
        "",
      ].join("\n");
      await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoStaticPages()],
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
