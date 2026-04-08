import { pgTable, pgEnum } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"
import { v4 as uuidv4 } from "uuid"
import { is_deleted, table_timestamps } from "./helper"
import { PAYMENT_PROVIDER_BRAND_VALUES, PAYMENT_PROVIDER_SETUP_STATUS_VALUES, TRANSACTION_STATUS_VALUES } from "./constants"
import { usersTable } from "./users.table"
import { ordersTable } from "./orders.table"
import { notesTable } from "./notes.table"


export const PAYMENT_PROVIDER_BRAND_TYPE_E = pgEnum("payment_provider_brand_enum", PAYMENT_PROVIDER_BRAND_VALUES)
export const PAYMENT_PROVIDER_SETUP_STATUS_E = pgEnum("payment_provider_setup_status_enum", PAYMENT_PROVIDER_SETUP_STATUS_VALUES)
export const TRANSACTION_STATUS_E = pgEnum("transaction_status_enum", TRANSACTION_STATUS_VALUES)

export const paymentProvidersTable = pgTable("payment_providers", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    created_by: t.uuid().references(() => usersTable.id, { onDelete: "restrict", onUpdate: "cascade" }),
    brand: PAYMENT_PROVIDER_BRAND_TYPE_E().notNull().unique(),
    name: t.varchar({ length: 100 }).notNull(),
    image: t.varchar({ length: 300 }).notNull(),
    client_id: t.varchar({ length: 50 }),
    client_secret: t.varchar({ length: 50 }),
    success_url: t.varchar({ length: 255 }),
    fail_url: t.varchar({ length: 255 }),
    cancel_url: t.varchar({ length: 255 }),
    ipn_url: t.varchar({ length: 255 }),
    setup_status: PAYMENT_PROVIDER_SETUP_STATUS_E().default("PENDING").notNull(),
    ...is_deleted,
    ...table_timestamps
}, (table) => [
    t.index("pp_brand_fk_index").on(table.brand)
])


export const transactionTable = pgTable("transactions", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    order_id: t.uuid().references(() => ordersTable.id, {onDelete: "restrict", onUpdate: "cascade"}),
    note: t.uuid().references(() => notesTable.id, {onDelete: "set null", onUpdate: "cascade"}),
    discount: t.integer(),
    amount: t.integer().notNull(),
    currency: t.varchar({length: 10}).notNull(),
    sessionKey: t.varchar({length: 255}).unique(),
    status: TRANSACTION_STATUS_E().default("INITIATED").notNull(),
    user_id: t.uuid().references(() => usersTable.id, {onDelete: "restrict", onUpdate: "cascade"}),
    last_4: t.varchar({length: 4}),
    card_holder_name: t.varchar({length: 255}),
    provider_token: t.varchar({length: 255}).unique(),
    provider: t.uuid().references(() => paymentProvidersTable.id, {onDelete: "restrict", onUpdate: "cascade"}),
    metadata: t.jsonb(),
    ...table_timestamps
}, (table) => [
    t.index("transction_order_id_fk_index").on(table.order_id),
    t.index("transction_user_id_fk_index").on(table.user_id),
    
])