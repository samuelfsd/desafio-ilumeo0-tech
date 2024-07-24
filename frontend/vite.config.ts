import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    host: 'localhost',
    proxy: {
      '/api': 'http://localhost:3333'
    }
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
