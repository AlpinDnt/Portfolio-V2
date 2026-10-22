import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/*
 * Above-the-fold fonts are referenced from a JS-imported CSS bundle, so the
 * browser only discovers the .woff2 files after JS parses. Preloading the two
 * fonts the hero uses removes that discovery delay and shortens the fallback
 * → Barlow Condensed swap (FOUT).
 */
const PRELOAD_FONTS = [
  /barlow-condensed-latin-800-normal-.*\.woff2$/,
  /space-grotesk-latin-400-normal-.*\.woff2$/,
];

function preloadFonts() {
  return {
    name: "preload-fonts",
    enforce: "post",
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      const tags = Object.values(ctx.bundle)
        .filter((asset) => PRELOAD_FONTS.some((re) => re.test(asset.fileName)))
        .map((asset) => ({
          tag: "link",
          attrs: {
            rel: "preload",
            as: "font",
            type: "font/woff2",
            href: `/${asset.fileName}`,
            crossorigin: "",
          },
          injectTo: "head-prepend",
        }));
      return { html, tags };
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  server: { port: 5173 },
});
