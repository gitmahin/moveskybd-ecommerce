import {
  CreateUserWithEmailPassPayloadType,
  GetUserProfileViaUsernamePayloadType,
} from "@/zod/database";
import bcrypt from "bcryptjs";
import { logger, pgDb } from "@/lib";
import { ServiceResponseType } from "./type";
import { userProfilesTable, usersTable } from "@/database";
import { and, eq, sql } from "drizzle-orm";
import { PgUserProfileSelectType } from "@/database/tables/types";
import { serviceResponse } from "./utils";

class UserService {
  /**
   * Creates a new user account with email and password authentication.
   *
   * Validates the input payload, checks for existing users, hashes the password
   * with bcrypt, and inserts the new user record into the database.
   *
   * @param payload - The user creation payload.
   * @param payload.email - Valid email address, max 255 characters, required.
   * @param payload.username - Lowercase alphanumeric only, between 3–50 characters, required.
   * @param payload.password - Between 8–50 characters, must contain at least one uppercase letter, one lowercase letter, and one number, required.
   * @param payload.account_provider - Must be a valid value from `USER_ACCOUNT_PROVIDER_VALUES`, required.
   *
   * @returns A promise that resolves to:
   * - `{ type: "SUCCESS", data: { id: string }[] }` — on successful user creation.
   * - `{ type: "ERROR", error: "User already exists!" }` — if the email is already registered.
   * - `{ type: "ERROR", error: "User id not returned!" }` — if the database did not return a user ID.
   * - `{ type: "ERROR", error: "Error creating user!" }` — if an unexpected error occurs.
   *
   * @example
   * const result = await createUserWithEmailPass({
   *   email: "john@example.com",
   *   password: "SecurePass1",
   *   username: "john123",
   *   account_provider: "MANUAL",
   * });
   *
   * if (result.type === "SUCCESS") {
   *   console.log("Created user ID:", result.data[0].id);
   * }
   */
  async createUserWithEmailPass(
    payload: CreateUserWithEmailPassPayloadType
  ): Promise<ServiceResponseType<{ id: string }[]>> {
    try {
      // -- Extract valid data from zod
      const { email, account_provider, password, username } = payload;

      // -- Hash password
      const salt = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, salt);

      // -- Check if user exist
      const existUser = await pgDb
        .select({
          email: usersTable.email,
        })
        .from(usersTable)
        .where(eq(usersTable.email, sql.placeholder("email")))
        .prepare("pFindExistedUser");

      const existUserResult = await existUser.execute({ email });
      if (existUserResult.length > 0) {
        return {
          type: "ERROR",
          error: "User already exists!",
        };
      }

      // -- Insert data to database and return id
      const userId = await pgDb
        .insert(usersTable)
        .values({
          email,
          account_provider,
          password: hash_password,
          username,
        })
        .returning({ id: usersTable.id });

      // -- If has id return, else return error
      if (userId[0].id) {
        return {
          type: "SUCCESS",
          data: userId,
        };
      }

      return {
        type: "ERROR",
        error: "User id not returned!",
      };
    } catch (error) {
      logger.error(error);
      return {
        type: "ERROR",
        error: "Error creating user!",
      };
    }
  }

  /**
   * Retrieves a user's profile by their username and ID.
   *
   * Queries the database via a prepared statement joining `usersTable`
   * and `userProfilesTable` matching both username and ID.
   *
   * @param payload - The lookup payload.
   * @param payload.id - Valid UUID v4, required.
   * @param payload.username - Lowercase string, max 50 characters, required.
   *
   * @returns A promise that resolves to:
   * - `{ type: "SUCCESS", data: { profile: PgUserProfileSelectType } }` — if the profile is found.
   * - `{ type: "ERROR", error: "User not found!" }` — if no user matches the username and ID.
   * - `{ type: "ERROR", error: "Account exists, but the associated profile is missing!" }` — if the user exists but has no profile.
   * - `{ type: "ERROR", error: "Error getting user profile." }` — if an unexpected error occurs.
   *
   * @example
   * const result = await getUserProfileViaUsername({ username: "john123", id: "550e8400-e29b-41d4-a716-446655440000" });
   *
   * if (result.type === "SUCCESS") {
   *   console.log("User profile:", result.data.profile);
   * }
   */
  async getUserProfileViaUsername(
    payload: GetUserProfileViaUsernamePayloadType
  ): Promise<
    ServiceResponseType<{
      profile: PgUserProfileSelectType | null;
    }>
  > {
    // -- Extract valid data from zod
    const { username, id } = payload;

    try {
      // -- Get user profile from database
      const userProfile = await pgDb
        .select({
          id: usersTable.id,
          profile: userProfilesTable,
        })
        .from(usersTable)
        .leftJoin(
          userProfilesTable,
          eq(userProfilesTable.user_id, usersTable.id)
        )
        .where(
          and(
            eq(usersTable.username, sql.placeholder("username")),
            eq(usersTable.id, sql.placeholder("id"))
          )
        )
        .prepare("pGetUserProfileViaUsername");

      // -- Execute prepared statement
      const result = await userProfile.execute({ username, id });

      // -- If profile found return profile data, else return error
      if (!result[0]?.id) {
        return serviceResponse("ERROR", "User not found!");
      } else if (!result[0]?.profile) {
        return serviceResponse(
          "ERROR",
          "Account exists, but the associated profile is missing!"
        );
      }

      return serviceResponse("SUCCESS", result[0]);
    } catch (error) {
      logger.error(error);
      return serviceResponse("ERROR", "Error getting user profile.");
    }
  }
}

export const userService = new UserService();
