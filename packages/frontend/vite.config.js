import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../dist",
    target: "es2022",
  },
  plugins: [react()],
  root: "src",
  test: {
    coverage: {
      exclude: ["tests/**"],
    },
    environment: "jsdom",
    mockReset: true,
    root: ".",
  },
});
