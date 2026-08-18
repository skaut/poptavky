import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["tests/**"],
    },
    mockReset: true,
    setupFiles: ["tests/setup.ts"],
  },
});
