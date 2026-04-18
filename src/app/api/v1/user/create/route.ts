import { usersTable } from "@/database";
import { handleApiRequest, logger, pgDb } from "@/lib";
import { userService } from "@/services";
import { JWTEncryptedUserAuthData } from "@/types/user";
import {ApiError} from "@/utils/ApiError"
import {ApiResponse} from "@/utils/ApiResponse"
import {asyncHandler} from "@/utils/asyncHandler"
import {validateWithZod} from "@/utils/validateWithZod"
import {
  CreateUserWithEmailPassPayloadType,
  userValidationZodSchema,
} from "@/zod";
import bcrypt from "bcryptjs";
import { eq, or, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";

export async function POST(request: NextRequest) {
  return handleApiRequest(request, null, CreateNewUser);
}

// ===============================================================
// Create new user logic
// ===============================================================

const CreateNewUser = asyncHandler(async (request: NextRequest) => {
  const bodyData: CreateUserWithEmailPassPayloadType = await request.json();
  logger.verbose(bodyData);

  // -- Validate payload
  const { data: safePayload, error } = validateWithZod(
    bodyData,
    userValidationZodSchema.CreateUserWithEmailPass()
  );

  // -- ⛔ Return response error
  if (error) {
    throw new ApiError(400, "Error validating your request!", [
      z.flattenError(error),
    ]);
  }

  // -- Hash password
  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(safePayload.password, salt);

  // -- Check if user exist
  const existUser = await pgDb
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where(or(eq(usersTable.email, sql.placeholder("email")), eq(usersTable.username, sql.placeholder("username"))))
    .prepare("pFindExistedUser");

  // -- Execute PSQL prepared statement
  const existUserResult = await existUser.execute({ email: safePayload.email, username: safePayload.username });

  // -- ⛔ If user already exist with given data
  if (existUserResult[0]) {
    throw new ApiError(400, "User already exists!");
  }

  // -- Insert data to database and return id
  const userId = await pgDb
    .insert(usersTable)
    .values({
      email: safePayload.email,
      password: hash_password,
      username: safePayload.username,
      is_verified: false,
    })
    .returning({
      id: usersTable.id,
      email: usersTable.email,
      username: usersTable.username,
    });

  // -- ⛔ If has no id returned by database
  if (!userId[0].id) {
    throw new ApiError(400, "User id not returned");
  }

  const createdUser = userId[0];

  const jwtPayload: JWTEncryptedUserAuthData = {
    email: createdUser.email,
    id: createdUser.id,
    username: createdUser.username,
  };

  userService.createJWTAuthCookies(jwtPayload, { id: createdUser.id });

  // -- send email
  // code here ---

  // -- ✅ Return success response
  return ApiResponse("Account created.", 201, {id: createdUser.id});
});
