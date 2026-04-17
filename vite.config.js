import { configDefaults, defineConfig } from "vitest/config";
import { resolve } from "path";
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    exclude: [...configDefaults.exclude],
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
