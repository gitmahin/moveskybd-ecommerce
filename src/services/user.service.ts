import { GetUserProfileViaUsernamePayloadType } from "@/zod/database";

import { logger, pgDb } from "@/lib";
import { ServiceResponseType } from "./type";
import { userProfilesTable, usersTable } from "@/database";
import { and, eq, sql } from "drizzle-orm";
import { PgUserProfileSelectType } from "@/database/tables/types";
import { serviceResponse } from "./utils";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { CookieService } from "./cookie.service";

class UserService {
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
        return serviceResponse("ERROR", "User not found!", 404);
      } else if (!result[0]?.profile) {
        return serviceResponse(
          "ERROR",
          "Account exists, but the associated profile is missing!",
          404
        );
      }

      return serviceResponse("SUCCESS", result[0], 200);
    } catch (error) {
      logger.error(error);
      return serviceResponse("ERROR", "Database connection failed!", 500);
    }
  }

  async createJWTAuthCookies(
    payloadForAccessToken: any,
    payloadForRefreshToken: any
  ) {
    const cookieStore = await cookies();
    // -- Set cookies
    const accessToken = jwt.sign(
      payloadForAccessToken,
      String(process.env.JWT_AUTH_SECRET),
      { expiresIn: "5m" }
    );
    // Store only id in refreshToken
    const refreshToken = jwt.sign(
      payloadForRefreshToken,
      String(process.env.JWT_AUTH_SECRET),
      { expiresIn: "30d" }
    );
    cookieStore.set(
      CookieService.ACCESS_TOKEN.name,
      accessToken,
      CookieService.ACCESS_TOKEN.cookie
    );
    cookieStore.set(
      CookieService.REFRESH_TOKEN.name,
      refreshToken,
      CookieService.REFRESH_TOKEN.cookie
    );
    return cookieStore;
  }
}

export const userService = new UserService();
