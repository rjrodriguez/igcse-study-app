import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  base: "./",
  plugins: [
    dyadComponentTagger(),
    react(),
    VitePWA({
      injectRegister: "inline",
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*pdf\.js.*$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "pdfjs-cdn",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === "https://www.soundhelix.com" ||
              url.origin === "https://www.w3schools.com" ||
              url.origin === "https://www.w3.org",
            handler: "CacheFirst",
            options: {
              cacheName: "study-media",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
              rangeRequests: true,
            },
          },
          {
            urlPattern: ({ url }) =>
              url.pathname.includes("/media/") ||
              url.pathname.includes("/pdfs/") ||
              url.pathname.includes("/jpgs/"),
            handler: "CacheFirst",
            options: {
              cacheName: "local-chapter-assets",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
              rangeRequests: true,
            },
          },
        ],
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    host: "::",
    port: 8080,
  }
}));