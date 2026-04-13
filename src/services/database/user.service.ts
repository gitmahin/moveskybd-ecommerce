import { usersTable } from "@/database";
import { PgUserInsertType } from "@/database/tables/types";
import { pgDb } from "@/lib";

class UserDatabaseService {
  async createUserAccount({
    email,
    username,
    password,
    account_provider,
  }: PgUserInsertType) {
    await pgDb
      .insert(usersTable)
      .values({
        email,
        username,
        password,
        account_provider,
      })
      .then((result) => {
        console.log(result);
      });
  }
}

export const userDatabaseService = new UserDatabaseService();
