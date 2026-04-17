import { userProfilesTable, usersTable } from "@/database";
import { handleApiRequest, logger, pgDb } from "@/lib";
import bcrypt from "bcryptjs";
import { and, eq, or, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CookieService, userService } from "@/services";

import { ApiError, asyncHandler, validateWithZod } from "@/utils";
import {
    LoginUserManualMethodPayloadType,
    LoginUserManualMethodZodSchema,
} from "@/zod/database";
import { z } from "zod/v4";
import { getObjectFromSearchParams } from "@/utils/getObjectFromSearchParams";

// -- HTTP request
export async function GET(request: NextRequest) {
    return handleApiRequest(request, null, LoginUser);
}

// ===============================================================
// Login user logic
// ===============================================================

type EncryptedUserData = {
    id: string;
    username: string;
    email: string;
    avatar: string;
};

const LoginUser = asyncHandler(async (request: NextRequest) => {
    const { searchParams } = request.nextUrl;

    const payload: LoginUserManualMethodPayloadType = getObjectFromSearchParams(
        ["email", "username", "password"],
        searchParams
    );

    logger.verbose("Payload", payload)
    // -- Validate payload with zod
    const { data, error } = validateWithZod(
        payload,
        LoginUserManualMethodZodSchema
    );

    // -- ⛔ Return zod flattened error response
    if (error) {
        throw new ApiError(400, "Error validating your request!", [z.flattenError(error)])
    }

    /**
     * Extract safe value from zod
     * p<something> -> here 'p' means payload
     */
    const { email: pEmail, password: pPassword, username: pUsername } = data;

    // -- Get user from database
    const selectUser = await pgDb
        .select({
            id: usersTable.id,
            password: usersTable.password,
            email: usersTable.email,
            username: usersTable.username,
            avatar: userProfilesTable.avatar,
        })
        .from(usersTable)
        .leftJoin(userProfilesTable, eq(userProfilesTable.user_id, usersTable.id))
        .where(
            and(
                or(
                    eq(usersTable.email, sql.placeholder("email")),
                    eq(usersTable.account_provider, "MANUAL")
                ),
                eq(usersTable.username, sql.placeholder("username"))
            )
        )
        .prepare("selectUserForLogin");

    // -- Execute PSQL prepared statement
    const result = await selectUser.execute({
        email: pEmail,
        username: pUsername,
    });

    // -- ⛔ Handle not found user
    if (!result[0]) {
        throw new ApiError(400, "User not found!")

    }

    // Extract values from database result
    const { password: dbPassword, avatar, email, id, username } = result[0]; 

    // -- Check if password is matching with given payload
    const isPasswordMatched = await bcrypt.compare(pPassword, dbPassword); 

    // ⛔
    if (!isPasswordMatched) {
        throw new ApiError(401, "Invalid credentials")
    }

    // -- Organize object data for jwt encryption
    const jwtPayload: EncryptedUserData = {
        id,
        avatar: avatar ?? "",
        email,
        username,
    };

    // -- Set cookies
    userService.createJWTAuthCookies(jwtPayload, { id })

    // -- ✅ Return response user with credentials
    return NextResponse.json({ message: "Login success!" }, { status: 200 });
})
