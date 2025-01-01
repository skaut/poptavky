/** @type {import('jest').Config} */
export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",
    "!src/config.ts",
    "!src/globalStyles.ts",
  ],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/fileMock.ts",
  },
  resetMocks: true,
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}"],
  transform: {
    "^.+\\.(j|t)sx?$": ["ts-jest", { tsconfig: "test.tsconfig.json" }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-markdown)/",
    "node_modules/@testing-library/",
  ],
};
