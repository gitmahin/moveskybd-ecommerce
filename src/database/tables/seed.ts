import { seed } from "drizzle-seed";
import { usersTable, userAddressesTable, userBillingInformationsTable, userContactsTable, userProfilesTable, userShippingInformationTable } from "./users.table"
import { productAttributesTable, productsTable, inventoryTable, productMediasTable, productCategoriesTable, productVariationsTable } from "./products.table"
import { ordersTable, orderItemsTable } from "./orders.table"
import { transactionTable, paymentProvidersTable } from "./payments.table"
import { notesTable } from "./notes.table"
import { pgDb } from "@/lib";
import { USER_ACCOUNT_PROVIDER_VALUES } from "./constants";
import { PHONE_CODES } from "./seed.constant";

export const schema = {
    // users
    usersTable,
    userAddressesTable,
    userBillingInformationsTable,
    userContactsTable,
    userProfilesTable,
    // userShippingInformationTable,

    // // products
    // productAttributesTable,
    // productsTable,
    // inventoryTable,
    // productMediasTable,
    // productCategoriesTable,
    // productVariationsTable,

    // // orders
    // ordersTable,
    // orderItemsTable,

    // // payments
    // transactionTable,
    // paymentProvidersTable,

    // // notes
    // notesTable,
}

const main = async () => {

    await seed(pgDb, schema).refine((func) => ({
        usersTable: {
            count: 10,
        },
        userContactsTable: {
       
            columns: {
                phone_code: func.valuesFromArray({values: PHONE_CODES}),
            }
        },
        userAddressesTable: {
            count: 10
        },
        userBillingInformationsTable: {
            count: 10
        },
        userProfilesTable: {
            count: 10
        },
    }))
}

main()