import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { is_deleted, table_timestamps, USER_ROLE_E } from "./helper";
import { NOTE_PRIVACY_TYPE_VALUES } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { userShippingInformationTable, usersTable } from "./users.table";
import { relations } from "drizzle-orm";
import { ordersTable } from "./orders.table";
import { transactionTable } from "./payments.table";

export const NOTE_PRIVACY_TYPE_E = pgEnum(
  "notes_privacy_type_enum",
  NOTE_PRIVACY_TYPE_VALUES
);

/**
 * Table for storing various types of notes within the system.
 * 
 * Used for customer shipping notes, order-specific notes, and transaction notes.
 * Supports privacy levels (PUBLIC/PRIVATE) and role-based access control,
 * tracking the creator and timestamps for each entry.
 */
export const notesTable = pgTable("notes", {
  id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
  privacy_type: NOTE_PRIVACY_TYPE_E().default("PRIVATE").notNull(),
  role: USER_ROLE_E().default("CUSTOMER").notNull(),
  created_by_id: t.uuid().references(() => usersTable.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  title: t.varchar({ length: 100 }),
  content: t.varchar({ length: 300 }).notNull(),
  ...is_deleted,
  ...table_timestamps,
});

/**
 * Defines the relationships for the `notesTable`.
 * Connects notes to shipping information, orders, transactions, and the creator (user).
 */
export const notesTableRelations = relations(notesTable, ({ one }) => ({
  user_shipping_info: one(userShippingInformationTable),
  order_note: one(ordersTable),
  transaction: one(transactionTable),
  created_by: one(usersTable, {
    fields: [notesTable.created_by_id],
    references: [usersTable.id],
  }),
}));
