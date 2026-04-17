import { configDefaults, defineConfig } from "vitest/config";
import { resolve } from "path";
export default defineConfig({
  resolve: {

    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    globalSetup: "src/tests/global-setup.ts",
    exclude: [...configDefaults.exclude],
    include: ["src/tests/**/*.test.{ts,js}"],
    projects: [
      {
        extends: true,
        test: {
          name: "api",
          include: ['src/tests/api-tests/*.test.{ts,js}'],
          environment: "node",
        },
      },
    ],
  },
});
