export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*",
    "!src/index.ts",
    "!src/interfaces/ProjectIssue.ts", // Interface only, see kulshekhar/ts-jest#378
    "!src/interfaces/ProjectListing.ts", // Interface only, see kulshekhar/ts-jest#378
    "!src/interfaces/ProjectListings.ts", // Interface only, see kulshekhar/ts-jest#378
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  setupFiles: ["<rootDir>/__tests__/setup.ts"],
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/test.tsconfig.json",
    },
  },
  resetMocks: true,
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
};
