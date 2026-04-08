import { pgTable, pgEnum } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"
import { is_deleted, table_timestamps } from "./helper"
import { userBillingInformationsTable, userShippingInformationTable, usersTable } from "./users.table"
import { notesTable } from "./notes.table"
import { productsTable } from "./products.table"
import { v4 as uuidv4 } from 'uuid';

export const ordersTable = pgTable("orders", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    customer_id: t.uuid().references(() => usersTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    note: t.uuid().references(() => notesTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    billing_id: t.uuid().references(() => userBillingInformationsTable.id, { onDelete: "set null", onUpdate: "cascade" }),
    shipping_id: t.uuid().references(() => userShippingInformationTable.id, { onDelete: "set null", onUpdate: "cascade" }),
    ...is_deleted,
    ...table_timestamps

})


export const orderItemsTable = pgTable("order_items", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    order_id: t.uuid().references(() => ordersTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    product_id: t.uuid().references(() => productsTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    ...is_deleted,
    ...table_timestamps
})

