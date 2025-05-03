// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://irad.dev",
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    // @ts-ignore - Suppress vite type conflict due to pnpm structure
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    responsiveImages: true,
  },
  image: {
    experimentalLayout: "constrained",
  },
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          mermaidConfig: {
            look: "handDrawn",
            theme: "neutral",
            fontFamily: "Excalifont, monospace",
          },
        },
      ],
    ],
  },
});
