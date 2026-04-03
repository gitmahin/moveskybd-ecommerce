import { DB_CONNECTION_URI } from "./src/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/index.ts",
  out: "./src/database/migrations",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: DB_CONNECTION_URI,
  },
  migrations: {
    schema: "public",
  },
  introspect: {
    casing: "preserve",
  },
});
