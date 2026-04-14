import { z } from "zod/v4";

export type ServiceResponseType<T = any> =
  | { type: "SUCCESS"; data: T; error?: never }
  | { type: "ERROR"; data?: never; error: string };
