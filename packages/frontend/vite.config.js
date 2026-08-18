import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../dist",
  },
  plugins: [legacy(), react()],
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
