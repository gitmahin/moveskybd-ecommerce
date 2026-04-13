import { z } from "zod/v4";

export type ServiceResponseType<T = any> =
  | { type: "SUCCESS"; data: T; error?: never; zod_errors?: never }
  | { type: "ERROR"; data?: never; error: string; zod_errors?: never }
  | { type: "ZODERROR"; data?: never; error?: never; zod_errors: unknown };
