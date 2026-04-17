import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
};

async function jestConfig() {
  const nextJestConfig = await createJestConfig(config)();
  return {
    ...nextJestConfig,
    transformIgnorePatterns: [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
    ],
  };
}

export default jestConfig;