import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  plugins: [
    dyadComponentTagger(),
    react(),
    VitePWA({
      registerType: "inject",
      manifest: {
        name: "Study App PWA",
        short_name: "StudyApp",
        theme_color: "#1a237e",
        icons: [
          { src: "icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
          { src: "icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" }
        ]
      },
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