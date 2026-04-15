import { userProfilesTable, usersTable } from "@/database";
import { handleApiRequest, logger, pgDb } from "@/lib";
import bcrypt from "bcryptjs";
import { and, eq, or, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { CookieService } from "@/services";

import { validateWithZod } from "@/utils";
import {
    LoginUserManualMethodPayloadType,
    LoginUserManualMethodZodSchema,
} from "@/zod/database";
import { z } from "zod/v4";
import { SearchParams } from "next/dist/server/request/search-params";
import { getObjectFromSearchParams } from "@/utils/getObjectFromSearchParams";

// -- HTTP request
export async function GET(request: NextRequest) {
    return handleApiRequest(request, null, LoginUser)
}

// ===============================================================
// Login user logic
// ===============================================================

type EncryptedUserData = {
    id: string
    username: string
    email: string
    avatar: string
}

async function LoginUser(request: NextRequest) {
    try {
        const cookieStore = await cookies()
        const { searchParams } = request.nextUrl;


        const payload: LoginUserManualMethodPayloadType = getObjectFromSearchParams(["email", "username", "password"], searchParams)

        logger.verbose("here is the query params", payload)

        // -- Validate payload with zod
        const { data, error } = validateWithZod(payload, LoginUserManualMethodZodSchema)

        // -- ⛔ Return zod flattened error response
        if (error) {
            logger.log("info", payload)
            logger.error(error)
            return NextResponse.json({ error: z.flattenError(error) }, { status: 400 });
        }

        /**
         * Extract safe value from zod
         * p<something> -> here 'p' means payload
         */
        const { email: pEmail, password: pPassword, username: pUsername } = data

        // -- Get user from database
        const selectUser = await pgDb.select({ id: usersTable.id, password: usersTable.password, email: usersTable.email, username: usersTable.username, avatar: userProfilesTable.avatar }).from(usersTable).leftJoin(userProfilesTable, eq(userProfilesTable.user_id, usersTable.id)).where(and(or(eq(usersTable.email, sql.placeholder("email")), eq(usersTable.account_provider, "MANUAL")), eq(usersTable.username, sql.placeholder("username")))).prepare("selectUserForLogin")

        // -- Execute PSQL prepared statement
        const result = await selectUser.execute({ email: pEmail, username: pUsername })

        // -- ⛔ handle not found user
        if (!result[0]) {
            logger.error("User not found")
            return NextResponse.json({ error: "User not found!" }, { status: 400 })
        }

        // Extract values from database result
        const { password: dbPassword, avatar, email, id, username } = result[0]

        // -- Check if password is matching with given payload
        const isPasswordMatched = await bcrypt.compare(pPassword, dbPassword)

        // ⛔
        if (!isPasswordMatched) {
            logger.error("Invalid credentials")
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        // -- Organize object data for jwt encryption
        const jwtPayload: EncryptedUserData = {
            id,
            avatar: avatar ?? "",
            email,
            username
        }

        // -- Set cookies
        const accessToken = jwt.sign(jwtPayload, String(process.env.JWT_AUTH_SECRET), { expiresIn: "5m" })
        // Store only id in refreshToken
        const refreshToken = jwt.sign({ id }, String(process.env.JWT_AUTH_SECRET), { expiresIn: "30d" })
        cookieStore.set(CookieService.ACCESS_TOKEN.name, accessToken, CookieService.ACCESS_TOKEN.cookie)
        cookieStore.set(CookieService.REFRESH_TOKEN.name, refreshToken, CookieService.REFRESH_TOKEN.cookie)

        // -- ✅ Return response user with credentials
        return NextResponse.json({ message: "Login success!" }, { status: 200 })
    } catch (error) {
        // ⛔
        logger.error(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}