import { USER_ACCOUNT_PROVIDER_VALUES } from "@/database/tables/constants";
import { z } from "zod/v4";

export const CreateUserWithEmailPassZodSchema = z.object({
  email: z
    .email()
    .max(255, { error: "Email must be at most 255 characters" })
    .nonempty({ error: "email is required" }),
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters" })
    .max(50, { error: "Username must be at most 50 characters" })
    .lowercase({ error: "Username must be in lowercase" })
    .regex(/^[a-z0-9]+$/, {
      error:
        "Username can only contain lowercase letters and numbers (no special characters or spaces)",
    })
    .nonempty({ error: "username is required" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .max(50, { error: "Password must be at most 50 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
      error:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .nonempty({ error: "password is required" }),
  account_provider: z.enum(USER_ACCOUNT_PROVIDER_VALUES, {
    error: "Invalid user role",
  }),
});
export type CreateUserWithEmailPassPayloadType = z.infer<
  typeof CreateUserWithEmailPassZodSchema
>;

export const GetUserProfileViaUsernameZodSchema = z.object({
  id: z.uuidv4({ error: "Invalid id" }).nonempty({ error: "id is required" }),
  username: z
    .string()
    .max(50, { error: "Username must be at most 50 characters" })
    .lowercase({ error: "Username must be in lowercase" })
    .nonempty({ error: "username is required" }),
});
export type GetUserProfileViaUsernamePayloadType = z.infer<
  typeof GetUserProfileViaUsernameZodSchema
>;
