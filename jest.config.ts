/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/*/src/**/*",
    "!packages/collector/src/index.ts",
    "!packages/collector/src/interfaces/ProjectIssue.ts", // Interface only, see kulshekhar/ts-jest#378
    "!packages/collector/src/interfaces/ProjectListing.ts", // Interface only, see kulshekhar/ts-jest#378
    "!packages/collector/src/interfaces/ProjectListings.ts", // Interface only, see kulshekhar/ts-jest#378
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  errorOnDeprecated: true,
  preset: "ts-jest/presets/default-esm",
  projects: ["packages/collector"],
  resetMocks: true,
};
