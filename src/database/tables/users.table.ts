import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { table_timestamps, is_deleted } from "./helper";
import {
  ROLE_VALUES,
  USER_ACCOUNT_PROVIDER_VALUES,
  USER_ACCOUNT_STATUS_VALUES,
} from "./constants";
import { relations } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { notesTable } from "./notes.table";

export const USER_ROLE_E = pgEnum("user_role_enum", ROLE_VALUES);
export const USER_ACCOUNT_STATUS_E = pgEnum(
  "user_account_status_enum",
  USER_ACCOUNT_STATUS_VALUES
);
export const USER_ACCOUNT_PROVIDER_E = pgEnum(
  "user_account_provider",
  USER_ACCOUNT_PROVIDER_VALUES
);

export const usersTable = pgTable("users", {
  id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
  email: t.varchar({ length: 255 }).unique().notNull(),
  username: t.varchar({ length: 100 }).unique().notNull(),
  role: USER_ROLE_E().default("CUSTOMER").notNull(),
  account_status: USER_ACCOUNT_STATUS_E().default("NORMAL").notNull(),
  account_provider: USER_ACCOUNT_PROVIDER_E().default("MANUAL").notNull(),
  is_verified: t.boolean().notNull().default(false),
  verify_expiry: t.timestamp(),
  verify_code: t.varchar({ length: 8 }).unique(),
  ...is_deleted,
  ...table_timestamps,
});

export const user_id_fk = {
  user_id: t.uuid().references(() => usersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
};

export const user_address = {
  addr1: t.varchar({ length: 300 }),
  addr2: t.varchar({ length: 300 }),
  city: t.varchar({ length: 100 }),
  post_code: t.varchar({ length: 12 }),
  country_iso: t.varchar({ length: 5 }),
  state: t.varchar({ length: 50 }),
};

export const user_contact = {
  email: t.varchar({ length: 255 }),
  phone: t.varchar({ length: 20 }),
  countryCode: t.varchar({ length: 5 }),
  company: t.varchar("company", { length: 200 }),
};

export const user_fl_names = {
  first_name: t.varchar({ length: 100 }).notNull(),
  last_name: t.varchar({ length: 100 }),
};

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
  (table) => [t.index("uprofile_user_id_fk_index").on(table.user_id)]
);

export const userAddressesTable = pgTable(
  "user_addresses",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    ...user_address,
    ...table_timestamps,
  },
  (table) => [t.index("uaddr_user_id_fk_index").on(table.user_id)]
);

export const userContactsTable = pgTable(
  "user_contacts",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    ...user_contact,
    ...table_timestamps,
  },
  (table) => [t.index("ucontact_user_id_fk_index").on(table.user_id)]
);

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

export const userShippingInformationTable = pgTable(
  "users_shippping_infos",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...user_id_fk,
    label: t.varchar({ length: 100 }),
    value: t.varchar({ length: 100 }).notNull(),
    customer_note: t.uuid().references(() => notesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    ...user_fl_names,
    ...user_contact,
    ...user_address,
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("ushipping_user_id_fk_index").on(table.user_id)]
);

// -- Relations
export const userProfileRelations = relations(userProfilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userProfilesTable.user_id],
    references: [usersTable.id],
  }),
}));
