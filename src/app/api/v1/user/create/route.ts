import { userController } from "@/api-controllers/user.controller";
import { handleApiRequest } from "@/lib";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, payload: any) {
  return handleApiRequest(
    request,
    payload,
    userController.handleCreateUserManualMethod
  );
}
