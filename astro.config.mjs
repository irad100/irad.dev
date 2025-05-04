// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://irad.dev",
  integrations: [
    mdx(),
    sitemap(),
    icon(),
  ],
  vite: {
    // @ts-ignore - Suppress vite type conflict due to pnpm structure
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    responsiveImages: true,
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: ["400"],
        styles: ["normal"],
        subsets: ["latin"],
      },
      {
        provider: fontProviders.fontsource(),
        name: "Courier Prime",
        cssVariable: "--font-courier-prime",
        weights: ["400"],
        styles: ["normal"],
        subsets: ["latin"],
      }
    ],
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
      [rehypeMermaid, { strategy: "inline" }],
    ],
  },
  build: {
    inlineStylesheets: "always",
  },
});
