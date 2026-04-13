import { seed } from "drizzle-seed";
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
import { ordersTable } from "./orders.table";
import { transactionTable, paymentProvidersTable } from "./payments.table";
import { notesTable } from "./notes.table";
import { pgDb } from "@/lib";
import { faker } from "@faker-js/faker";
import {
  PgNoteInsertType,
  PgUserAddressInsertType,
  PgUserBillingInformationInsertType,
  PgUserContactInsertType,
  PgUserProfileInsertType,
  PgUserShippingInformationInsertType,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import { NOTE_PRIVACY_TYPE_VALUES, ROLE_VALUES } from "./constants";
import { userService } from "@/services";

// -- MSG_WARNING: Remove this. Currently testing
async function run() {
  try {
    const data = await userService.createUserWithEmailPass({
      email: "nimahin25@gmail.com",
      account_provider: "MANUAL",
      password: "Mahin15006",
      username: "gitmahin",
    });
    console.log("Response:", data.data, data.error, data.zod_errors, data.type);
  } catch (err) {
    console.error("Critical Error:", err);
  } finally {
    process.exit(0);
  }
}

run();

const main = async () => {
  // Create users
  await seed(pgDb, { usersTable }).refine(() => ({
    usersTable: { count: 10 },
  }));

  // -- Get users
  const users = await pgDb.query.usersTable.findMany({
    columns: {
      id: true,
    },
  });

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
      };

      return insertionData;
    })
  );

  // -- Get user profiles
  const userProfiles = await pgDb.query.userProfilesTable.findMany({
    columns: {
      first_name: true,
      last_name: true,
      user_id: true,
    },
  });

  // -- Insert user contacts
  await pgDb.insert(userContactsTable).values(
    userProfiles.map((userProfile) => {
      const insertionData: PgUserContactInsertType = {
        id: uuidv4(),
        user_id: userProfile.user_id,
        company: faker.company.name(),
        email: faker.internet.email({
          firstName: userProfile.first_name,
          lastName: userProfile.last_name!,
        }),
        phone: faker.phone.imei(),
        phone_code: faker.phone
          .number({ style: "national" })
          .split("(")[1]
          .split(")")[0],
      };
      return insertionData;
    })
  );

  // -- Insert user address

  await pgDb.insert(userAddressesTable).values(
    userProfiles.map((userProfile) => {
      const insertionData: PgUserAddressInsertType = {
        id: uuidv4(),
        user_id: userProfile.user_id,
        addr1: faker.location.streetAddress(),
        addr2: faker.location.streetAddress(),
        city: faker.location.city(),
        country_iso: faker.location.countryCode("alpha-2"),
        post_code: faker.location.zipCode(),
        state: faker.location.state(),
      };

      return insertionData;
    })
  );

  // -- Insert users billing informations
  await pgDb.insert(userBillingInformationsTable).values(
    Array.from({ length: 20 }, (_, i) => {
      const profile = userProfiles[i % userProfiles.length];
      const insertionData: PgUserBillingInformationInsertType = {
        id: uuidv4(),
        user_id: profile.user_id,
        label: faker.word.adjective(),
        value: faker.word.adverb({ length: { min: 5, max: 7 } }),
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: faker.internet.email({
          firstName: profile.first_name,
          lastName: profile.last_name!,
        }),
        phone: faker.string.numeric(10),
        phone_code: faker.phone
          .number({ style: "national" })
          .split("(")[1]
          .split(")")[0],
        company: faker.company.name(),
        addr1: faker.location.streetAddress(),
        addr2: faker.location.streetAddress(),
        city: faker.location.city(),
        country_iso: faker.location.countryCode("alpha-2"),
        post_code: faker.location.zipCode(),
        state: faker.location.state(),
      };
      return insertionData;
    })
  );

  // Insert notes for shipping
  await pgDb.insert(notesTable).values(
    users.map((u, i) => {
      const insertionData: PgNoteInsertType = {
        id: uuidv4(),
        content: faker.lorem.lines({ max: 3, min: 1 }),
        title: faker.lorem.lines(1),
        created_by_id: u.id,
        privacy_type: faker.helpers.arrayElement([...NOTE_PRIVACY_TYPE_VALUES]),
        role: faker.helpers.arrayElement([...ROLE_VALUES]),
      };

      return insertionData;
    })
  );

  // -- Get notes
  const notes = await pgDb.query.notesTable.findMany({
    columns: {
      id: true,
    },
  });

  // -- Insert users shipping informations
  await pgDb.insert(userShippingInformationTable).values(
    Array.from({ length: 20 }, (_, i) => {
      const profile = userProfiles[i % userProfiles.length];
      const insertionData: PgUserShippingInformationInsertType = {
        id: uuidv4(),
        user_id: profile.user_id,
        label: faker.word.adjective(),
        value: faker.word.adverb({ length: { min: 5, max: 7 } }),
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: faker.internet.email({
          firstName: profile.first_name,
          lastName: profile.last_name!,
        }),
        phone: faker.string.numeric(10),
        phone_code: faker.phone
          .number({ style: "national" })
          .split("(")[1]
          .split(")")[0],
        company: faker.company.name(),
        addr1: faker.location.streetAddress(),
        addr2: faker.location.streetAddress(),
        city: faker.location.city(),
        country_iso: faker.location.countryCode("alpha-2"),
        customer_note_id: notes[i] ? notes[i].id : null,
        post_code: faker.location.zipCode(),
        state: faker.location.state(),
      };
      return insertionData;
    })
  );
};

// -- MSG_WARNING: Uncomment this
// main()
//   .then(() => {
//     console.log("Seed complete ✅");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("Seed failed ⚠️", err);
//     process.exit(1);
//   });
