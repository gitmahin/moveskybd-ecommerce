import * as t from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from 'uuid';
import { usersTable } from "./user.table";

// $<function name> means it should be called

// -- Table id
export const $table_id = () => ({
  id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
});

//  -- Table Timestamps
export const $table_timestamps = () => ({
  updated_at: t.timestamp(),
  created_at: t.timestamp().defaultNow().notNull(),
});

// -- Table Deletion
export const isDeleted = t.boolean().notNull().default(false);


// -- User Table Constants
export const $user_id_fk = () => ({
  user_id: t.uuid().references(() => usersTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
})

export const $user_address = () => ({
  addr1: t.varchar({ length: 300 }),
  addr2: t.varchar({ length: 300 }),
  city: t.varchar({ length: 100 }),
  post_code: t.varchar({ length: 12 }),
  country_iso: t.varchar({ length: 2 }),
  state: t.varchar({ length: 50 })
})

export const $user_contact = () => ({
  email: t.varchar({ length: 255 }),
  phone: t.varchar({ length: 20 }),
  countryCode: t.varchar({ length: 5 })
})

export const $user_fl_names = () => ({
    first_name: t.varchar({ length: 100 }).notNull(),
    last_name: t.varchar({ length: 100 }),
})