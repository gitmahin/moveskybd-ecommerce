import { usersTable } from "@/database";
import { handleApiRequest, logger, pgDb } from "@/lib";
import { userService } from "@/services";
import { ApiError, asyncHandler, validateWithZod } from "@/utils";
import {
    CreateUserWithEmailPassPayloadType,
    CreateUserWithEmailPassZodSchema,
} from "@/zod";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
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
    logger.verbose(bodyData)

    // -- Validate payload
    const { data, error } = validateWithZod(
        bodyData,
        CreateUserWithEmailPassZodSchema
    );

    // -- ⛔ Return response error
    if (error) {
        throw new ApiError(400, "Error validating your request!", [z.flattenError(error)])

    }

    // -- Extract valid data from zod
    const { email, password, username } = data;

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

    // -- Execute PSQL prepared statement
    const existUserResult = await existUser.execute({ email });

    // -- ⛔ If user already exist with given data
    if (existUserResult[0]) {
        throw new ApiError(400, "User already exists")

    }

    // -- Insert data to database and return id
    const userId = await pgDb
        .insert(usersTable)
        .values({
            email,
            account_provider: "MANUAL",
            password: hash_password,
            username,
        })
        .returning({ id: usersTable.id });

    // -- ⛔ If has no id returned by database
    if (!userId[0].id) {
        throw new ApiError(400, "User id not returned")
    }

    // -- Send email here
    // code here --------

  
    // -- ✅ Return success response
    return NextResponse.json({ message: "OK" }, { status: 200 });

})
