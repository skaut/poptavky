const legacy = require("@vitejs/plugin-legacy");
const react = require("@vitejs/plugin-react");
const { defineConfig } = require("vite");

export default defineConfig({
  build: {
    outDir: "../dist",
  },
  plugins: [legacy(), react()],
  root: "src",
});
