import { pgTable, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { table_timestamps, BASIC_STATUS_E, is_deleted } from "./helper";
import {
  PRODUCT_ATTRIBUTES_TYPE_VALUES,
  PRODUCT_MEDIA_TYPE_VALUES,
  PRODUCT_STOCK_STATUS_VALUES,
  PRODUCT_VARIATION_TYPE_VALUES,
} from "./constants";
import { usersTable } from "./users.table";
import { relations, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { ordersTable } from "./orders.table";

export const PRODUCT_MEDIA_TYPE_E = pgEnum(
  "product_media_type_enum",
  PRODUCT_MEDIA_TYPE_VALUES
);
export const PRODUCT_ATTR_TYPE_E = pgEnum(
  "product_attr_type_enum",
  PRODUCT_ATTRIBUTES_TYPE_VALUES
);
export const PRODUCT_VARIATION_TYPE_E = pgEnum(
  "product_variation_type_enum",
  PRODUCT_VARIATION_TYPE_VALUES
);
export const PRODUCT_STOCK_STATUS_E = pgEnum(
  "product_stock_status_enum",
  PRODUCT_STOCK_STATUS_VALUES
);
export type ProductIndetifiersType = "GTIN" | "UPC" | "EAN" | "ISBN";

export const productsTable = pgTable(
  "products",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    name: t.varchar({ length: 100 }).notNull(),
    slug: t.varchar({ length: 100 }).notNull().unique(),
    status: BASIC_STATUS_E().default("DRAFT").notNull(),
    created_by_id: t
      .uuid()
      .references(() => usersTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      })
      .notNull(),
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("pcreated_by_user_id_fk_index").on(table.created_by_id)]
);

export const product_id_fk = {
  product_id: t.uuid().references(() => productsTable.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
};

export const productMediasTable = pgTable(
  "product_medias",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    title: t.varchar({ length: 100 }),
    desc: t.varchar({ length: 255 }),
    type: PRODUCT_MEDIA_TYPE_E().default("IMAGE").notNull(),
    src: t.varchar({ length: 300 }).notNull().unique(),
    status: BASIC_STATUS_E().default("DRAFT").notNull(),
    is_thumbnail: t.boolean().default(false).notNull(),
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("pm_product_id_fk_index").on(table.product_id)]
);

export const productCategoriesTable = pgTable(
  "product_categories",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    title: t.varchar({ length: 100 }),
    slug: t.varchar({ length: 100 }).notNull().unique(),
    icon: t.varchar({ length: 50 }),
    image: t.varchar({ length: 300 }),
    status: BASIC_STATUS_E().default("DRAFT").notNull(),
    is_primary: t.boolean().default(false).notNull(),
    parent_cat_id: t
      .uuid()
      .references((): t.AnyPgColumn => productCategoriesTable.id, {
        onDelete: "set null",
        onUpdate: "cascade",
      }),
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("pc_product_id_fk_index").on(table.product_id)]
);

export const productAttributesTable = pgTable(
  "product_attributes",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    label: t.varchar({ length: 100 }).notNull(),
    value: t.varchar({ length: 100 }).notNull().unique(),
    type: PRODUCT_ATTR_TYPE_E().notNull(),
    attributes: t.jsonb(),
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("pa_product_id_fk_index").on(table.product_id)]
);

export const productVariationsTable = pgTable(
  "product_variations",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    type: PRODUCT_VARIATION_TYPE_E().default("DEFAULT").notNull(),
    set_attrs: t
      .text()
      .array()
      .notNull()
      .default(sql`ARRAY[]::TEXT[]`),
    identifiers: t
      .jsonb()
      .$type<{ type: ProductIndetifiersType; value: string }>(),
    sku: t.varchar({ length: 20 }).notNull().unique(),
    regular_price: t.integer(),
    sale_price: t.integer().notNull(),
    discount: t.integer(),
    weight: t.integer(),
    dimentions: t
      .jsonb()
      .$type<{ width: number; height: number; length: number }>(),
    ...is_deleted,
    ...table_timestamps,
  },
  (table) => [t.index("pv_product_id_fk_index").on(table.product_id)]
);

export const inventoryTable = pgTable(
  "inventory",
  {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    product_id: t.uuid().references(() => productsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    stock_count: t.integer().notNull().default(0),
    stock_status: PRODUCT_STOCK_STATUS_E().default("IN_STOCK").notNull(),
    ...table_timestamps,
  },
  (table) => [
    t.uniqueIndex("inventory_product_id_fk_index").on(table.product_id),
  ]
);

// -- Many to many

export const productCategoriesToProductsTable = pgTable(
  "product_cat_to_products",
  {
    product_id: t.uuid().references(() => productsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    product_cat_id: t.uuid().references(() => productCategoriesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => [primaryKey({ columns: [table.product_id, table.product_cat_id] })]
);

export const productAttributesToProductsTable = pgTable(
  "product_attr_to_products",
  {
    product_id: t.uuid().references(() => productsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    product_attr_id: t.uuid().references(() => productAttributesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    primaryKey({ columns: [table.product_id, table.product_attr_id] }),
  ]
);

export const productMediasToProductsTable = pgTable(
  "product_media_to_products",
  {
    product_id: t.uuid().references(() => productsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    product_media_id: t.uuid().references(() => productMediasTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    primaryKey({ columns: [table.product_id, table.product_media_id] }),
  ]
);

// -- Relations
export const productsTableRelations = relations(
  productsTable,
  ({ many, one }) => ({
    categories: many(productCategoriesToProductsTable),
    attributes: many(productAttributesToProductsTable),
    medias: many(productMediasToProductsTable),
    variations: many(productVariationsTable),
    orders: many(ordersTable),
    inventory: one(inventoryTable),
    created_by: one(usersTable, {
      fields: [productsTable.created_by_id],
      references: [usersTable.id],
    }),
  })
);

export const productCategoriesToProductsTableRelations = relations(
  productCategoriesToProductsTable,
  ({ one }) => ({
    category: one(productCategoriesTable, {
      fields: [productCategoriesToProductsTable.product_cat_id],
      references: [productCategoriesTable.id],
    }),
    product: one(productsTable, {
      fields: [productCategoriesToProductsTable.product_id],
      references: [productsTable.id],
    }),
  })
);

export const productAttributesToProductsTableRelations = relations(
  productAttributesToProductsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productAttributesToProductsTable.product_id],
      references: [productsTable.id],
    }),
    attribute: one(productAttributesTable, {
      fields: [productAttributesToProductsTable.product_attr_id],
      references: [productAttributesTable.id],
    }),
  })
);

export const productMediasToProductsTableRelations = relations(
  productMediasToProductsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productMediasToProductsTable.product_id],
      references: [productsTable.id],
    }),
    media: one(productMediasTable, {
      fields: [productMediasToProductsTable.product_media_id],
      references: [productMediasTable.id],
    }),
  })
);

export const productVariationsTableRelations = relations(
  productVariationsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productVariationsTable.product_id],
      references: [productsTable.id],
    }),
  })
);


export const inventoryTableRelations = relations(inventoryTable, ({one}) =>({
  product: one(productsTable, {
    fields: [inventoryTable.product_id],
    references: [productsTable.id]
  })
}))