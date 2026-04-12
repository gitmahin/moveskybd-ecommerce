import { seed } from "drizzle-seed";
import { usersTable, userAddressesTable, userBillingInformationsTable, userContactsTable, userProfilesTable, userShippingInformationTable } from "./users.table"
import { productAttributesTable, productsTable, inventoryTable, productMediasTable, productCategoriesTable, productVariationsTable } from "./products.table"
import { ordersTable, orderItemsTable } from "./orders.table"
import { transactionTable, paymentProvidersTable } from "./payments.table"
import { notesTable } from "./notes.table"
import { pgDb } from "@/lib";
import { faker } from '@faker-js/faker';
import { PgUserAddressInsertType, PgUserBillingInformationInsertType, PgUserContactInsertType, PgUserProfileInsertType, PgUserShippingInformationInsertType } from "./types";
import { v4 as uuidv4 } from "uuid"

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

const FAKE_NUMBERS: string[] = []

for (let i = 0; i < 10; i++) {
    const randomFakeNumber = faker.phone.imei()
    FAKE_NUMBERS.push(randomFakeNumber)
}

const main = async () => {

    // Create users
    await seed(pgDb, { usersTable }).refine(() => ({
        usersTable: { count: 10 }
    }))

    // -- Get users
    const users = await pgDb.query.usersTable.findMany({
        columns: {
            id: true
        }
    })

    // -- Insert user profiles
    await pgDb.insert(userProfilesTable).values(
        users.map((user) => {
            const insertionData: PgUserProfileInsertType = {
                id: uuidv4(),
                user_id: user.id,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                avatar: faker.image.avatar(),
                cover_img: faker.image.avatarGitHub(),
            }

            return insertionData
        })
    )

    // -- Get user profiles
    const userProfiles = await pgDb.query.userProfilesTable.findMany({
        columns: {
            first_name: true,
            last_name: true,
            user_id: true
        }
    })

    // -- Insert user contacts
    await pgDb.insert(userContactsTable).values(
        userProfiles.map((userProfile) => {
            const insertionData: PgUserContactInsertType = {
                id: uuidv4(),
                user_id: userProfile.user_id,
                company: faker.company.name(),
                email: faker.internet.email({ firstName: userProfile.first_name, lastName: userProfile.last_name! }),
                phone: faker.phone.imei(),
                phone_code: faker.phone.number({ style: "national" }).split("(")[1].split(")")[0],
            }
            return insertionData
        })
    )

    // -- Insert user address

    await pgDb.insert(userAddressesTable).values(
        userProfiles.map((userProfile) => {
            const insertionData: PgUserAddressInsertType = {
                id: uuidv4(),
                user_id: userProfile.user_id,
                addr1: faker.location.streetAddress(),
                addr2: faker.location.streetAddress(),
                city: faker.location.city(),
                country_iso: faker.location.countryCode('alpha-2'),
                post_code: faker.location.zipCode(),
                state: faker.location.state(),
            }

            return insertionData
        })
    )

    // -- Insert users billing & shipping informations
    
}

main()