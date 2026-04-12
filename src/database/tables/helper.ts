import * as t from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { BASIC_STATUS_VALUES, ROLE_VALUES } from "./constants";

//  -- Table Timestamps
export const table_timestamps = {
  updated_at: t.timestamp(),
  created_at: t.timestamp().defaultNow().notNull(),
};

// -- Table Deletion
export const is_deleted = {
  is_deleted: t.boolean().default(false).notNull(),
  deleted_at: t.timestamp(),
};

// -- Basic Status of every table row
export const BASIC_STATUS_E = pgEnum("basic_status_enum", BASIC_STATUS_VALUES);

// -- User Roles
export const USER_ROLE_E = pgEnum("user_role_enum", ROLE_VALUES);
