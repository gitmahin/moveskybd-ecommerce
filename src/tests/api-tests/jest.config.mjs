import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('jest').Config} */
const config = {
  displayName: "Api test",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  rootDir: ".",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": resolve(__dirname, "../../../src/$1"),
  },
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
};

export default config;
