import { logger } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./ApiError";
import { DrizzleQueryError } from "drizzle-orm";
import { CustomApiResponse } from "@/types/api";
import { ApiResponse } from "./ApiResponse";

type RouteHandler<T = null> = (
  request: NextRequest
) => Promise<CustomApiResponse<T>>;

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
