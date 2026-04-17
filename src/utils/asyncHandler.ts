import { logger } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import {ApiError} from "@/utils/ApiError"
import {ApiResponse} from "@/utils/ApiResponse"
import { DrizzleQueryError } from "drizzle-orm";
import { CustomApiResponse } from "@/types/api";


type RouteHandler<T = null> = (
  request: NextRequest
) => Promise<CustomApiResponse<T>>;

/**
 * A higher-order function for Next.js API route handlers to manage asynchronous operations and errors.
 * 
 * This wrapper catches any errors thrown within the handler and ensures they are returned
 * as a standardized JSON response using the {@link ApiError} class. It also handles
 * logging and differentiates between production and development error details.
 * 
 * @template T - The type of the data payload in the response.
 * @param requestHandler - The asynchronous function containing the route logic.
 * @returns A function that accepts a `NextRequest` and returns a `Promise<NextResponse>`.
 * 
 * @example
 * export const GET = asyncHandler(async (req) => {
 *   const data = await fetchData();
 *   if (!data) throw new ApiError(404, "Not Found");
 *   return ApiResponse("Success", 200, data);
 * });
 */
export const asyncHandler = <T = null>(requestHandler: RouteHandler<T>) => {
  return async (request: NextRequest) => {
    return Promise.resolve(requestHandler(request))
      .then((res) => NextResponse.json(res, { status: res.status }))
      .catch((err) => {
        let error: ApiError;
        if (err instanceof ApiError) {
          error = err;
        } else {
          // -- If err is not instanceof ApiError, convert it to ApiError for error handling consistancy
          const status =
            err.status || err instanceof DrizzleQueryError ? 400 : 500;

          const message =
            err instanceof DrizzleQueryError
              ? "Database error!"
              : err.message || "Something went wrong";
          error = new ApiError(status, message, err?.errors || [], err.stack);
        }
        const response = {
          data: null,
          message: error.message,
          errors: error.errors,
          status: error.status,
        };
        logger.error({
          response,
          ...(process.env.NODE_ENV !== "production"
            ? { stack: error.stack }
            : {}),
        });
        // -- ⛔ Return error response
        return NextResponse.json(response, { status: response.status });
      });
  };
};
