module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",
    "!src/config.ts",
    "!src/globalStyles.ts",
  ],
  //preset: "ts-jest/presets/default-esm",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          [
          "react-app",
           {
            runtime: "automatic",
           }
          ]
        ],
      }
     ],
    '^.+\\.tsx?$': [
      'ts-jest',
      {
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!react-markdown)/"],
  resetMocks: true,
}
