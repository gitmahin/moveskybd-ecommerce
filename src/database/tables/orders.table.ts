import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { is_deleted, table_timestamps } from "./helper";
import {
  userBillingInformationsTable,
  userShippingInformationTable,
  usersTable,
} from "./users.table";
import { notesTable } from "./notes.table";
import { productsTable } from "./products.table";
import { v4 as uuidv4 } from "uuid";
import { relations } from "drizzle-orm";
import { transactionTable } from "./payments.table";

/**
 * Table for storing customer orders.
 * 
 * Tracks the customer, associated billing and shipping information,
 * and links to an optional internal or customer note.
 * Includes soft-delete support and standard timestamps.
 */
export const ordersTable = pgTable(
  "orders",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    customer_id: t.uuid().references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    note_id: t.uuid().references(() => notesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    billing_id: t.uuid().references(() => userBillingInformationsTable.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    shipping_id: t.uuid().references(() => userShippingInformationTable.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("ot_customer_id_fk_index").on(table.customer_id)]
);

/**
 * Junction table for the many-to-many relationship between orders and products.
 * 
 * Maps which products belong to which orders.
 * Includes soft-delete support and standard timestamps for each line item.
 */
export const orderToProductsTable = pgTable(
  "order_to_products",
  {
    order_id: t.uuid().references(() => ordersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    product_id: t.uuid().references(() => productsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [primaryKey({ columns: [table.order_id, table.product_id] })]
);

// -- Relations
/**
 * Defines the relationships for the `ordersTable`.
 * Connects an order to its customer, billing/shipping addresses,
 * notes, transactions, and the list of products included.
 */
export const ordersTableRelations = relations(ordersTable, ({ one, many }) => ({
  customer: one(usersTable, {
    fields: [ordersTable.customer_id],
    references: [usersTable.id],
  }),
  billing: one(userBillingInformationsTable, {
    fields: [ordersTable.billing_id],
    references: [userBillingInformationsTable.id],
  }),
  shipping: one(userShippingInformationTable, {
    fields: [ordersTable.shipping_id],
    references: [userShippingInformationTable.id],
  }),
  note: one(notesTable, {
    fields: [ordersTable.note_id],
    references: [notesTable.id],
  }),
  transaction: one(transactionTable),
  products: many(productsTable),
}));

/**
 * Defines the relationships for the `orderToProductsTable`.
 * Links the junction table entries back to their respective order and product.
 */
export const orderToProductsTableRelations = relations(
  orderToProductsTable,
  ({ one }) => ({
    order: one(ordersTable, {
      fields: [orderToProductsTable.order_id],
      references: [ordersTable.id],
    }),
    product: one(productsTable, {
      fields: [orderToProductsTable.product_id],
      references: [productsTable.id],
    }),
  })
);
