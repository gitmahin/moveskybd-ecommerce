import { userProfilesTable, usersTable } from "@/database";
import { PgUserInsertType } from "@/database/tables/types";
import { pgDb } from "@/lib";

class UserDatabaseService {
  async InsertUserWithEmailPass({
    email,
    username,
    password,
    account_provider,
  }: PgUserInsertType) {
    return await pgDb
      .insert(usersTable)
      .values({
        email,
        username,
        password,
        account_provider,
      })
      .returning({ id: usersTable.id });
  }
}

export const userDatabaseService = new UserDatabaseService();
