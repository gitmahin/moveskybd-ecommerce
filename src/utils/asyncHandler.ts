import { logger } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./ApiError";
import { DrizzleQueryError } from "drizzle-orm";

type RouteHandler = (request: NextRequest) => Promise<NextResponse>

export const asyncHandler = (requestHandler: RouteHandler) => {
    return async (request: NextRequest) => {
        return Promise.resolve(requestHandler(request)).catch(err => {
            let error: ApiError
            if (err instanceof ApiError) {
                error = err
            }
            else {
                // -- If err is not instanceof ApiError, convert it to ApiError for error handling consistancy
                const status = err.status || err instanceof DrizzleQueryError ? 400 : 500

                const message = err instanceof DrizzleQueryError ? "Database error!" : err.message || "Something went wrong"
                error = new ApiError(status, message, err?.errors || [], err.stack)
            }
            const response = {
                success: false,
                status: error.status,
                message: error.message,
                errors: error.errors,
                // -- Error stack is only for development purpose
                ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
            };
            logger.error(response)
            return NextResponse.json(response, { status: response.status })
        })
    }
}