import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core"
import { isDeleted, $table_id, $table_timestamps, $user_address, $user_id_fk, $user_contact, $user_fl_names } from "./helper";

import { ROLE_VALUES, USER_ACCOUNT_PROVIDER_VALUES, USER_ACCOUNT_STATUS_VALUES } from "./constants";
import { relations } from "drizzle-orm";

export const USER_ROLE_E = pgEnum("user_role_enum", ROLE_VALUES)
export const USER_ACCOUNT_STATUS_E = pgEnum("user_account_status_enum", USER_ACCOUNT_STATUS_VALUES)
export const USER_ACCOUNT_PROVIDER_E = pgEnum("user_account_provider", USER_ACCOUNT_PROVIDER_VALUES)

export const usersTable = pgTable("users", {
    ...$table_id(),
    email: t.varchar({ length: 255 }).unique(),
    username: t.varchar({ length: 100 }).unique(),
    role: USER_ROLE_E().default("CUSTOMER"),
    account_status: USER_ACCOUNT_STATUS_E().default("NORMAL"),
    account_provider: USER_ACCOUNT_PROVIDER_E().default("MANUAL"),
    is_verified: t.boolean().notNull().default(false),
    verify_expiry: t.timestamp(),
    verify_code: t.varchar({ length: 8 }).unique(),
    is_deleted: isDeleted,
    deleted_at: t.timestamp(),
    ...$table_timestamps()
})

export const userProfiles = pgTable("user_profiles", {
    ...$table_id(),
    ...$user_id_fk(),
    ...$user_fl_names(),
    avatar: t.varchar({ length: 300 }),
    cover_img: t.varchar({ length: 300 }),
    ...$table_timestamps()
})

export const userAddresses = pgTable("user_addresses", {
    ...$table_id(),
    ...$user_id_fk(),
    ...$user_address(),
    ...$table_timestamps()
})

export const userContacts = pgTable("user_contacts", {
    ...$table_id(),
    ...$user_id_fk(),
    ...$user_contact(),
    ...$table_timestamps
})

export const userProfileRelations = relations(userProfiles, ({ one }) => ({
    user: one(usersTable, {
        fields: [userProfiles.user_id],
        references: [usersTable.id]
    })
}))
