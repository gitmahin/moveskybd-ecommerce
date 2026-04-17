import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { table_timestamps, is_deleted, USER_ROLE_E } from "./helper";
import {
  ROLE_VALUES,
  USER_ACCOUNT_PROVIDER_VALUES,
  USER_ACCOUNT_STATUS_VALUES,
} from "./constants";
import { relations } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { notesTable } from "./notes.table";
import { productsTable } from "./products.table";
import { paymentProvidersTable, transactionTable } from "./payments.table";
import { ordersTable } from "./orders.table";

export const USER_ACCOUNT_STATUS_E = pgEnum(
  "user_account_status_enum",
  USER_ACCOUNT_STATUS_VALUES
);
export const USER_ACCOUNT_PROVIDER_E = pgEnum(
  "user_account_provider",
  USER_ACCOUNT_PROVIDER_VALUES
);

/**
 * Table for storing core user account information.
 * 
 * Manages authentication credentials, roles, account status, and verification details.
 * Supports multiple account providers (e.g., Google, Manual) and tracks refresh tokens.
 * Includes soft-delete support and standard timestamps.
 */
export const usersTable = pgTable("users", {
  id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
  email: t.varchar({ length: 255 }).unique().notNull(),
  username: t.varchar({ length: 50 }).unique().notNull(),
  password: t.varchar({ length: 200 }).notNull(),
  role: USER_ROLE_E().default("CUSTOMER").notNull(),
  account_status: USER_ACCOUNT_STATUS_E().default("NORMAL").notNull(),
  account_provider: USER_ACCOUNT_PROVIDER_E().default("MANUAL").notNull(),
  is_verified: t.boolean().notNull().default(false),
  verify_expiry: t.timestamp(),
  verify_code: t.varchar({ length: 8 }),
  refresh_token: t.text().unique(),
  ...is_deleted,
  ...table_timestamps,
});

/** Helper object for defining a foreign key reference to the users table. */
export const user_id_fk = {
  user_id: t.uuid().references(() => usersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
};

/** Helper object for common address fields used across multiple user-related tables. */
export const user_address = {
  addr1: t.varchar({ length: 300 }),
  addr2: t.varchar({ length: 300 }),
  city: t.varchar({ length: 100 }),
  post_code: t.varchar({ length: 20 }),
  country_iso: t.varchar({ length: 5 }),
  state: t.varchar({ length: 50 }),
};

/** Helper object for common contact fields used across multiple user-related tables. */
export const user_contact = {
  email: t.varchar({ length: 255 }),
  phone: t.varchar({ length: 30 }),
  phone_code: t.varchar({ length: 10 }),
  company: t.varchar("company", { length: 200 }),
};

/** Helper object for first and last name fields. */
export const user_fl_names = {
  first_name: t.varchar({ length: 100 }).notNull(),
  last_name: t.varchar({ length: 100 }),
};

/**
 * Table for storing extended user profile information.
 * 
 * Contains display names and media assets like avatars and cover images.
 * Linked one-to-one with the core `usersTable`.
 */
export const userProfilesTable = pgTable(
  "user_profiles",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    ...user_fl_names,
    avatar: t.varchar({ length: 300 }),
    cover_img: t.varchar({ length: 300 }),
    ...table_timestamps,
  },
  (table) => [t.uniqueIndex("uprofile_user_id_fk_index").on(table.user_id)]
);

/**
 * Table for storing a user's primary physical address.
 * 
 * Used for general account location data.
 * Linked one-to-one with the core `usersTable`.
 */
export const userAddressesTable = pgTable(
  "user_addresses",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    ...user_address,
    ...table_timestamps,
  },
  (table) => [t.uniqueIndex("uaddr_user_id_fk_index").on(table.user_id)]
);

/**
 * Table for storing a user's primary contact information.
 * 
 * Includes email, phone, and company details.
 * Linked one-to-one with the core `usersTable`.
 */
export const userContactsTable = pgTable(
  "user_contacts",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    ...user_contact,
    ...table_timestamps,
  },
  (table) => [t.uniqueIndex("ucontact_user_id_fk_index").on(table.user_id)]
);

/**
 * Table for storing multiple billing address configurations for a user.
 * 
 * Allows users to save different billing profiles (e.g., "Home", "Office").
 * Includes full contact and address details for invoice generation.
 */
export const userBillingInformationsTable = pgTable(
  "users_billing_infos",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    label: t.varchar({ length: 100 }),
    value: t.varchar({ length: 100 }).notNull(),
    ...user_fl_names,
    ...user_contact,
    ...user_address,
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("ubilling_user_id_fk_index").on(table.user_id)]
);

/**
 * Table for storing multiple shipping address configurations for a user.
 * 
 * Allows users to save different shipping destinations.
 * Links to an optional `notesTable` entry for specific delivery instructions.
 */
export const userShippingInformationTable = pgTable(
  "users_shippping_infos",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    label: t.varchar({ length: 100 }),
    value: t.varchar({ length: 100 }).notNull(),
    customer_note_id: t.uuid().references(() => notesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    ...user_fl_names,
    ...user_contact,
    ...user_address,
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [
    t.index("ushipping_user_id_fk_index").on(table.user_id),
    t
      .uniqueIndex("ushipping_customer_note_id_fk_index")
      .on(table.customer_note_id),
  ]
);

// -- Relations
/**
 * Defines the relationships for the `userProfilesTable`.
 * Connects a profile back to its parent user.
 */
export const userProfileRelations = relations(userProfilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userProfilesTable.user_id],
    references: [usersTable.id],
  }),
}));

/**
 * Defines the relationships for the `userAddressesTable`.
 * Connects an address back to its parent user.
 */
export const userAddressRelations = relations(
  userAddressesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userAddressesTable.user_id],
      references: [usersTable.id],
    }),
  })
);

/**
 * Defines the relationships for the `userContactsTable`.
 * Connects contact info back to its parent user.
 */
export const userContactRelations = relations(userContactsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userContactsTable.user_id],
    references: [usersTable.id],
  }),
}));

/**
 * Defines the relationships for the `userBillingInformationsTable`.
 * Connects a billing profile back to its parent user.
 */
export const userBillingInformationRelations = relations(
  userBillingInformationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userBillingInformationsTable.user_id],
      references: [usersTable.id],
    }),
  })
);

/**
 * Defines the relationships for the `userShippingInformationTable`.
 * Connects a shipping profile to its parent user and an optional customer note.
 */
export const userShippingInformationRelations = relations(
  userShippingInformationTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userShippingInformationTable.user_id],
      references: [usersTable.id],
    }),
    customer_note: one(notesTable, {
      fields: [userShippingInformationTable.customer_note_id],
      references: [notesTable.id],
    }),
  })
);

/**
 * Defines the comprehensive relationships for the `usersTable`.
 * Connects a user to their profile, contact, address, billing/shipping lists,
 * created products, orders, notes, transactions, and managed payment providers.
 */
export const userRelations = relations(usersTable, ({ one, many }) => ({
  profile: one(userProfilesTable),
  contact: one(userContactsTable),
  address: one(userAddressesTable),
  billing: many(userBillingInformationsTable),
  shipping: many(userShippingInformationTable),
  products: many(productsTable),
  orders: many(ordersTable),
  notes: many(notesTable),
  transactions: many(transactionTable),
  created_payment_providers: many(paymentProvidersTable),
}));
