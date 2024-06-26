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
  setupFiles: ["<rootDir>/__tests__/setup.ts"],
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Regexp key
    "^.+\\.[jt]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/test.tsconfig.json",
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!node-fetch)/"],
  resetMocks: true,
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
};
