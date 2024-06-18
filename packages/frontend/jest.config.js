/* eslint-env node */

/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",
    "!src/config.ts",
    "!src/globalStyles.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.ts"],
  testMatch: ["<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        presets: ["react-app"],
      },
    ],
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!react-markdown)/"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/fileMock.ts",
  },
  resetMocks: true,
};
