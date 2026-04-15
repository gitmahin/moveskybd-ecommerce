import { z } from "zod/v4";

export type ServiceResponseType<T = any> =
  | { type: "SUCCESS"; data: T; error?: never; status: number }
  | { type: "ERROR"; data?: never; error: string; status: number };
