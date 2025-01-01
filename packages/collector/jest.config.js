/** @type {import('ts-jest').JestConfigWithTsJest} */
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
  resetMocks: true,
  setupFiles: ["<rootDir>/__tests__/setup.ts"],
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.[jt]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/test.tsconfig.json",
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!node-fetch)/"],
};
