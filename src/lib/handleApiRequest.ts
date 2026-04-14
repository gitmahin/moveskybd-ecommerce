import { NextRequest, NextResponse } from "next/server";
import { logger } from "./winston.logger";

export type MiddlewareResponse = {
  pass: boolean;
  response?: NextResponse;
  data?: any;
};

/**
 * Handles an API route request by running a chain of middlewares before
 * executing the main callback handler.
 *
 * Each middleware can either block the request by returning `{ pass: false, response }`
 * or enrich `request.data` by returning `{ pass: true, data }`.
 *
 * @param request - The incoming Next.js request object.
 * @param payload - The typed request payload passed to middlewares and the callback.
 * @param callback - The main handler executed after all middlewares pass.
 * @param middlewares - An optional array of middleware functions to run in order before the callback.
 *
 * @returns The `NextResponse` from the blocking middleware, or the result of the callback.
 *
 * @example
 * export async function POST(request: NextRequest) {
 *   return handleApiRequest(
 *     request,
 *     await request.json(),
 *     async (req, payload) => {
 *       return NextResponse.json({ success: true });
 *     },
 *     [authMiddleware, rateLimitMiddleware]
 *   );
 * }
 */
export async function handleApiRequest<T>(
  request: NextRequest,
  payload: T,
  callback: (request: NextRequest, payload: T) => Promise<any> | any,
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
