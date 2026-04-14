import {
  CreateUserWithEmailPassType,
  CreateUserWithEmailPassZodSchema,
  UsernameZodSchema,
} from "@/zod/database";
import bcrypt from "bcryptjs";
import { logger, pgDb } from "@/lib";
import { ServiceResponseType } from "./type";
import { z } from "zod/v4";
import { userProfilesTable, usersTable } from "@/database";
import { eq, sql } from "drizzle-orm";
import { PgUserProfileSelectType } from "@/database/tables/types";
import { returnServiceResponse } from "./utils";

class UserService {
  /**
 * Creates a new user account with email and password validation.
 *
 * Validates the input payload using Zod, hashes the password with bcrypt,
 * and inserts the new user record into the database.
 *
 * @param data - The user creation payload.
 * @param data.email - Valid email address, max 255 characters.
 * @param data.username - Lowercase alphanumeric only, between 3–50 characters.
 * @param data.password - Between 8–50 characters, must contain at least one uppercase letter, one lowercase letter, and one number.
 * @param data.account_provider - Must be a valid value from `USER_ACCOUNT_PROVIDER_VALUES`.
 *
 * @returns A promise that resolves to:
 * - `{ type: "SUCCESS", data: { id: string }[] }` — on successful user creation.
 * - `{ type: "PAYLOADERROR", zod_errors: FlattenedError }` — if input validation fails.
 * - `{ type: "ERROR", error: string }` — if the user ID is not returned or an unexpected error occurs.
 *
 * @example
 * const result = await createUserWithEmailPass({
 *   email: "john@example.com",
 *   password: "SecurePass1",
 *   username: "john123",
 *   account_provider: "email",
 * });
 *
 * if (result.type === "SUCCESS") {
 *   console.log("Created user ID:", result.data[0].id);
 * }
 */
  async createUserWithEmailPass(
    data: CreateUserWithEmailPassType
  ): Promise<ServiceResponseType<{ id: string }[]>> {

    try {
      // -- Zod validate data payload
      const validatePayload = CreateUserWithEmailPassZodSchema.safeParse(data);

      // -- Return error if invalid payload
      if (validatePayload.error) {

        return {
          type: "PAYLOADERROR",
          zod_errors: z.flattenError(validatePayload.error),
        };
      }

      // -- Extract valid data from zod
      const safePayload = validatePayload.data;
      const { email, account_provider, password, username } = safePayload;

      // -- Hash password
      const salt = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, salt);

      // -- Check if user exist
      const existUser = await pgDb.select({
        email: usersTable.email
      }).from(usersTable).where(eq(usersTable.email, sql.placeholder("email"))).prepare("pFindExistedUser")

      const existUserResult = await existUser.execute({ email })
      if (existUserResult.length > 0) {
        return {
          type: "ERROR",
          error: "User already exists!"
        }
      }

      // -- Insert data to database and return id
      const userId = await pgDb
        .insert(usersTable)
        .values({
          email,
          account_provider,
          password: hash_password,
          username
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
        error: "User id not returned!"
      }
    } catch (error) {
      logger.error(error)
      return {
        type: "ERROR",
        error: "Error creating user!",
      };
    }
  }

  /**
 * Retrieves a user's profile by their username.
 *
 * Validates the username, then queries the database via a prepared statement
 * joining `usersTable` and `userProfilesTable`.
 *
 * @param username - The username to look up. Must be lowercase alphanumeric, between 3–50 characters.
 *
 * @returns A promise that resolves to:
 * - `{ type: "SUCCESS", data: { profile: PgUserProfileSelectType } }` — if the profile is found.
 * - `{ type: "PAYLOADERROR", zod_errors: FlattenedError }` — if the username fails validation.
 * - `{ type: "ERROR", error: string }` — if the account exists but has no associated profile, or a database error occurs.
 *
 * @example
 * const result = await getUserProfileViaUsername("john123");
 *
 * if (result.type === "SUCCESS") {
 *   console.log("User profile:", result.data.profile);
 * }
 */
  async getUserProfileViaUsername(username: string): Promise<ServiceResponseType<{
    profile: PgUserProfileSelectType | null
  }>> {

    // -- Zod validate username payload 
    const validatePayload = UsernameZodSchema.safeParse(username)

    // -- Return error if invalid payload
    if (validatePayload.error) {
      return returnServiceResponse("PAYLOADERROR", z.flattenError(validatePayload.error))
    }

    try {
      // -- Get user profile from database 
      const userProfile = await pgDb.select({
        profile: userProfilesTable
      }).from(usersTable).leftJoin(userProfilesTable, eq(userProfilesTable.user_id, usersTable.id)).where(eq(usersTable.username, sql.placeholder("username"))).prepare("pGetUserProfileViaUsername")

      // -- Execute prepared statement
      const result = await userProfile.execute({ username })

      // -- If profile found return profile data, else return error
      if (result[0].profile) {

        return returnServiceResponse("SUCCESS", result[0])
      } else {

        return returnServiceResponse("ERROR", "Account exists, but the associated profile is missing!")

      }
    } catch (error) {
      logger.error(error)
      return returnServiceResponse("ERROR", "Error getting user profile.")
    }
  }
}

export const userService = new UserService();
