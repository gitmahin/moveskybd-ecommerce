import { NextRequest, NextResponse } from "next/server";
import { logger } from "./winston.logger";
import { CustomApiResponse } from "@/types/api";

/**
 * Represents the result of a middleware execution.
 */
export type MiddlewareResponse = {
  /** Whether the request should proceed to the next middleware or the route handler. */
  pass: boolean;
  /** An optional `NextResponse` to return immediately if `pass` is false. */
  response?: NextResponse;
  /** Optional data to be merged into the `request.data` object for use in subsequent handlers. */
  data?: any;
};

/**
 * Type definition for the final route handler callback.
 */
export type RouteCallback<T = null> = (
  request: NextRequest,
  payload: T
) => Promise<CustomApiResponse | NextResponse>;

/**
 * A utility to handle API requests by executing a chain of middlewares before the final route logic.
 * 
 * This function iterates through an array of middleware functions. If any middleware fails 
 * (returns `pass: false`), it returns that middleware's response immediately. 
 * It also allows middlewares to attach data to the request object.
 * 
 * @template T - The type of the payload passed to the handler and middlewares.
 * @param request - The incoming Next.js request object.
 * @param payload - The data payload (e.g., validated body or params).
 * @param callback - The main route handler to execute if all middlewares pass.
 * @param middlwares - An array of middleware functions to execute sequentially.
 * 
 * @returns A promise resolving to the response from either a middleware or the final callback.
 * 
 * @example
 * return await handleApiRequest(req, body, async (req, payload) => {
 *   return ApiResponse("Success", 200, payload);
 * }, [authMiddleware, validationMiddleware]);
 */
export async function handleApiRequest<T>(
  request: NextRequest,
  payload: T,
  callback: RouteCallback<T>,
  middlwares: ((
    request: NextRequest,
    payload: T
  ) => MiddlewareResponse | Promise<MiddlewareResponse>)[] = []
) {
  for (const middlwareFunction of middlwares) {
    const result = await middlwareFunction(request, payload);

    if (!result.pass) {
      return result.response;
    } else if (result.data) {
      if (!request.data) {
        request.data = {};
      }

      try {
        request.data = {
          ...request.data,
          ...result.data,
        };
      } catch (error) {
        logger.error(error);
      }
    }
  }
  return await callback(request, payload);
}
