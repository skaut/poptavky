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
    // eslint-disable-next-line @typescript-eslint/naming-convention -- The key is a glob matching files
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        presets: ["react-app"],
      },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention -- The key is a glob matching files
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!react-markdown)/"],
  moduleNameMapper: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- The key is a glob matching files
    "\\.svg$": "<rootDir>/__mocks__/fileMock.ts",
  },
  resetMocks: true,
};
