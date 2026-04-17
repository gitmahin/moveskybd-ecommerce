import { NextRequest, NextResponse } from "next/server";
import { logger } from "./winston.logger";
import { CustomApiResponse } from "@/types/api";

export type MiddlewareResponse = {
  pass: boolean;
  response?: NextResponse;
  data?: any;
};

export type RouteCallback<T = null> = (
  request: NextRequest,
  payload: T
) => Promise<CustomApiResponse | NextResponse>;

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
