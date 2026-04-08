import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core"
import { table_timestamps, BASIC_STATUS_E, is_deleted } from "./helper";
import { PRODUCT_ATTRIBUTES_TYPE_VALUES, PRODUCT_MEDIA_TYPE_VALUES, PRODUCT_STOCK_STATUS_VALUES, PRODUCT_VARIATION_TYPE_VALUES } from "./constants";
import { usersTable } from "./users.table";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';

export const PRODUCT_MEDIA_TYPE_E = pgEnum("product_media_type_enum", PRODUCT_MEDIA_TYPE_VALUES)
export const PRODUCT_ATTR_TYPE_E = pgEnum("product_attr_type_enum", PRODUCT_ATTRIBUTES_TYPE_VALUES)
export const PRODUCT_VARIATION_TYPE_E = pgEnum("product_variation_type_enum", PRODUCT_VARIATION_TYPE_VALUES)
export const PRODUCT_STOCK_STATUS_E = pgEnum("product_stock_status_enum", PRODUCT_STOCK_STATUS_VALUES)
export type ProductIndetifiersType = "GTIN" | "UPC" | "EAN" | "ISBN"

export const productsTable = pgTable("products", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    name: t.varchar({ length: 100 }).notNull(),
    slug: t.varchar({ length: 100 }).notNull().unique(),
    status: BASIC_STATUS_E().default("DRAFT").notNull(),
    created_by_id: t.uuid().references(() => usersTable.id, { onDelete: "restrict", onUpdate: "cascade" }).notNull(),
    ...is_deleted,
    ...table_timestamps
}, (table) => [
    t.index("pcreated_by_user_id_fk_index").on(table.created_by_id)
])

export const product_id_fk = {
    product_id: t.uuid().references(() => productsTable.id, { onDelete: "set null", onUpdate: "cascade" }),
}

export const productMediasTable = pgTable("product_medias", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    title: t.varchar({ length: 100 }),
    desc: t.varchar({ length: 255 }),
    type: PRODUCT_MEDIA_TYPE_E().default("IMAGE").notNull(),
    src: t.varchar({ length: 300 }).notNull().unique(),
    status: BASIC_STATUS_E().default("DRAFT").notNull(),
    is_thumbnail: t.boolean().default(false).notNull(),
    ...is_deleted,
    ...table_timestamps
}, (table) => [
    t.index("pm_product_id_fk_index").on(table.product_id)
])

export const productCategoriesTable = pgTable("product_categories", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    title: t.varchar({ length: 100 }),
    slug: t.varchar({ length: 100 }).notNull().unique(),
    icon: t.varchar({ length: 50 }),
    image: t.varchar({ length: 300 }),
    status: BASIC_STATUS_E().default("DRAFT").notNull(),
    is_primary: t.boolean().default(false).notNull(),
    parent_cat_id: t.uuid().references((): t.AnyPgColumn => productCategoriesTable.id, { onDelete: "set null", onUpdate: "cascade" }),
    ...is_deleted,
    ...table_timestamps
}, (table) => [
    t.index("pc_product_id_fk_index").on(table.product_id)
])

export const productAttributesTable = pgTable("product_attributes", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    label: t.varchar({ length: 100 }).notNull(),
    value: t.varchar({ length: 100 }).notNull().unique(),
    type: PRODUCT_ATTR_TYPE_E().notNull(),
    attributes: t.jsonb(),
    ...is_deleted,
    ...table_timestamps
}, (table) => [
    t.index("pa_product_id_fk_index").on(table.product_id)
])


export const productVariationsTable = pgTable("product_variations", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    ...product_id_fk,
    type: PRODUCT_VARIATION_TYPE_E().default("DEFAULT").notNull(),
    set_attrs: t.text().array().notNull().default(sql`ARRAY[]::TEXT[]`),
    identifiers: t.jsonb().$type<{ type: ProductIndetifiersType, value: string }>(),
    sku: t.varchar({ length: 20 }).notNull().unique(),
    regular_price: t.integer(),
    sale_price: t.integer().notNull(),
    discount: t.integer(),
    weight: t.integer(),
    dimentions: t.jsonb().$type<{ width: number, height: number, length: number }>(),
    ...is_deleted,
    ...table_timestamps
}, (table) => [
    t.index("pv_product_id_fk_index").on(table.product_id)
])

export const inventoryTable = pgTable("inventory", {
    id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    product_id: t.uuid().references(() => productsTable.id, { onDelete: "cascade", onUpdate: 'cascade' }),
    stock_count: t.integer().notNull().default(0),
    stock_status: PRODUCT_STOCK_STATUS_E().default("IN_STOCK").notNull(),
    ...table_timestamps

}, (table) => [
    t.uniqueIndex("inventory_product_id_fk_index").on(table.product_id)
])