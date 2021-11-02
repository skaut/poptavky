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
  projects: [
    {
      displayName: "collector",
      globals: {
        "ts-jest": {
          tsconfig: "packages/collector/tsconfig.json",
        },
      },
      setupFiles: ["<rootDir>/packages/collector/__tests__/setup.ts"],
      teardownFiles: ["<rootDir>/packages/collector/__tests__/teardown.ts"],
      preset: "ts-jest/presets/default-esm",
      resetMocks: true,
      testMatch: ["<rootDir>/packages/collector/__tests__/**/*.test.ts"],
    },
  ],
};
