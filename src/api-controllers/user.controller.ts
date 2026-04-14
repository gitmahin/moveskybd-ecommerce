import { userService } from "@/services";
import { validateWithZod } from "@/utils";
import {
  CreateUserWithEmailPassPayloadType,
  CreateUserWithEmailPassZodSchema,
} from "@/zod/database";
import { NextRequest, NextResponse } from "next/server";

type GetUserPayloadType = {
  params: Promise<{ username: string }>;
};

class UserController {
  async handleCreateUserManualMethod(request: NextRequest) {
    const bodyData: CreateUserWithEmailPassPayloadType = await request.json();
    const { data, error } = validateWithZod(
      bodyData,
      CreateUserWithEmailPassZodSchema
    );
    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    if (data.account_provider != "MANUAL") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const result = await userService.createUserWithEmailPass(data);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (result.data) {
      return NextResponse.json(
        { message: "OK", data: result.data },
        { status: 200 }
      );
    }
  }

  async handleGetUser(request: NextRequest, payload: GetUserPayloadType) {}
}

export const userController = new UserController();
