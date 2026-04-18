import { z } from "zod/v4";


class UserValidationZodSchema {

    // Api Paylod: Create account with Email & Password
    CreateUserWithEmailPass() {
        return z.object({
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
        });

    }

    // -- Api Payload: Get profile via username
    GetUserProfileViaUsername() {
        return z.object({
            id: z.uuidv4({ error: "Invalid id" }).nonempty({ error: "id is required" }),
            username: z
                .string()
                .max(50, { error: "Username must be at most 50 characters" })
                .lowercase({ error: "Username must be in lowercase" })
                .nonempty({ error: "username is required" }),
        });
    }


    // -- Api Payload: Login User - Manual Method
    LoginUserManualMethod() {
        return z.object({
            identifier: z
                .string()
                .max(255, { error: "Text length exceeded" }).nonempty({ error: "Email or Username is required" }),
            password: z
                .string()
                .max(50, { error: "Password must be at most 50 characters" })
                .nonempty({ error: "password is required" }),


        });
    }


}

export const userValidationZodSchema = new UserValidationZodSchema();



export type CreateUserWithEmailPassPayloadType = z.infer<
    ReturnType<typeof userValidationZodSchema.CreateUserWithEmailPass>
>;


export type LoginUserManualMethodPayloadType = z.infer<
    ReturnType<typeof userValidationZodSchema.LoginUserManualMethod>
>;


export type GetUserProfileViaUsernamePayloadType = z.infer<
    ReturnType<typeof userValidationZodSchema.GetUserProfileViaUsername>
>;
