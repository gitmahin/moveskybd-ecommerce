import { z } from "zod/v4";

/**
 * Validates an unknown payload against a Zod schema.
 *
 * @param payload - The unknown data to validate.
 * @param schema - The Zod schema to validate against.
 *
 * @returns A `ZodSafeParseResult` containing either:
 * - `{ success: false, error: ZodError }` — if validation fails.
 * - `{ success: true, data: T }` — if validation passes.
 *
 * @example
 * const result = validateWithZod(req.body, CreateUserWithEmailPassZodSchema);
 *
 * if (!result.success) {
 *   console.log(result.error);
 * } else {
 *   console.log(result.data);
 * }
 */
export const validateWithZod = <T>(
  payload: unknown,
  schema: z.ZodType<T>
): z.ZodSafeParseResult<T> => {
  const validatePayload = schema.safeParse(payload);
  if (validatePayload.error && !validatePayload.success) {
    const { error, success } = validatePayload;
    return { error, success };
  }

  const { success, data } = validatePayload;
  return { data, success };
};
