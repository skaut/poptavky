/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/*/src/**/*",
    "!packages/collector/src/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  errorOnDeprecated: true,
  preset: "ts-jest/presets/default-esm",
  projects: ["packages/collector"],
  resetMocks: true,
};
