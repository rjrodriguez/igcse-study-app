import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'IGCSE Study App',
        short_name: 'IGCSEStudyApp',
        description: 'A progressive web app for studying IGCSE ICT with audio, video, and PDF content',
        theme_color: '#ffffff'
      }
    })
  ],
  server: {
    port: 32104,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});