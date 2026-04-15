import {
  usersTable,
  userAddressesTable,
  userBillingInformationsTable,
  userContactsTable,
  userProfilesTable,
  userShippingInformationTable,
} from "./users.table";
import {
  productAttributesTable,
  productsTable,
  inventoryTable,
  productMediasTable,
  productCategoriesTable,
  productVariationsTable,
} from "./products.table";
import { ordersTable, orderToProductsTable } from "./orders.table";
import { transactionTable, paymentProvidersTable } from "./payments.table";
import { notesTable } from "./notes.table";

// -- User Select Types
export type PgUserSelectType = typeof usersTable.$inferSelect;
export type PgUserAddressSelectType = typeof userAddressesTable.$inferSelect;
export type PgUserBillingInformationSelectType =
  typeof userBillingInformationsTable.$inferSelect;
export type PgUserContactSelectType = typeof userContactsTable.$inferSelect;
export type PgUserProfileSelectType = typeof userProfilesTable.$inferSelect;
export type PgUserShippingInformationSelectType =
  typeof userShippingInformationTable.$inferSelect;

// -- User Insert Types
export type PgUserInsertType = typeof usersTable.$inferInsert;
export type PgUserAddressInsertType = typeof userAddressesTable.$inferInsert;
export type PgUserBillingInformationInsertType =
  typeof userBillingInformationsTable.$inferInsert;
export type PgUserContactInsertType = typeof userContactsTable.$inferInsert;
export type PgUserProfileInsertType = typeof userProfilesTable.$inferInsert;
export type PgUserShippingInformationInsertType =
  typeof userShippingInformationTable.$inferInsert;

// -- Product Select Types
export type PgProductSelectType = typeof productsTable.$inferSelect;
export type PgProductAttributeSelectType =
  typeof productAttributesTable.$inferSelect;
export type PgInventorySelectType = typeof inventoryTable.$inferSelect;
export type PgProductMediaSelectType = typeof productMediasTable.$inferSelect;
export type PgProductCategorySelectType =
  typeof productCategoriesTable.$inferSelect;
export type PgProductVariationSelectType =
  typeof productVariationsTable.$inferSelect;

// -- Product Insert Types
export type PgProductInsertType = typeof productsTable.$inferInsert;
export type PgProductAttributeInsertType =
  typeof productAttributesTable.$inferInsert;
export type PgInventoryInsertType = typeof inventoryTable.$inferInsert;
export type PgProductMediaInsertType = typeof productMediasTable.$inferInsert;
export type PgProductCategoryInsertType =
  typeof productCategoriesTable.$inferInsert;
export type PgProductVariationInsertType =
  typeof productVariationsTable.$inferInsert;

// -- Order Select Types
export type PgOrderSelectType = typeof ordersTable.$inferSelect;
export type PgOrderItemSelectType = typeof orderToProductsTable.$inferSelect;

// -- Order Insert Types
export type PgOrderInsertType = typeof ordersTable.$inferInsert;
export type PgOrderItemInsertType = typeof orderToProductsTable.$inferInsert;

// -- Payment Select Types
export type PgTransactionSelectType = typeof transactionTable.$inferSelect;
export type PgPaymentProviderSelectType =
  typeof paymentProvidersTable.$inferSelect;

// -- Payment Insert Types
export type PgTransactionInsertType = typeof transactionTable.$inferInsert;
export type PgPaymentProviderInsertType =
  typeof paymentProvidersTable.$inferInsert;

// -- Note Select Type
export type PgNoteSelectType = typeof notesTable.$inferSelect;

// -- Note Insert Type
export type PgNoteInsertType = typeof notesTable.$inferInsert;
