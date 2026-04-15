import { BaseConfig, DB_CONNECTION_URI } from "@/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/database";

export const pgDb = drizzle(DB_CONNECTION_URI, {
  schema,
  logger: BaseConfig.NODE_ENV !== "production",
  casing: "snake_case",
});
