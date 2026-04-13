import {
  CreateUserWithEmailPassType,
  CreateUserWithEmailPassZodSchema,
} from "@/zod/database";
import { userDatabaseService } from "./database";
import bcrypt from "bcryptjs";
import { logger } from "@/lib";
import { ServiceResponseType } from "./type";
import { z } from "zod/v4";

class UserService {
  async createUserWithEmailPass(
    data: CreateUserWithEmailPassType
  ): Promise<ServiceResponseType<{ id: string }[]>> {
    const validatePayload = CreateUserWithEmailPassZodSchema.safeParse(data);
    if (validatePayload.error) {
      logger.verbose(validatePayload.error);
      return {
        type: "ZODERROR",
        zod_errors: z.flattenError(validatePayload.error),
      };
    }

    const safeData = validatePayload.data;
    const { email, account_provider, password, username } = safeData;
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    try {
      const db_result = await userDatabaseService.InsertUserWithEmailPass({
        email,
        account_provider,
        password: hash_password,
        username,
      });
      return {
        type: "SUCCESS",
        data: db_result,
      };
    } catch (error) {
      return {
        type: "ERROR",
        error: "Error creating user",
      };
    }
  }
}

export const userService = new UserService();
