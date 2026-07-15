import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { vitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  plugins: [
    dyadComponentTagger(),
    react(),
    vitePWA({
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
        strategies: {
          "**/index.html": "NetworkFirst",
          "**/assets/*": "CacheFirst"
        }
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