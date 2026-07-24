import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        preview: resolve(__dirname, "preview.html"),
        fitness: resolve(__dirname, "projects/21-day-fitness-challenge.html"),
        brand: resolve(__dirname, "projects/brand-upgrade.html"),
      },
    },
  },
});
