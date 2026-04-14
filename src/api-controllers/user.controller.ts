import { NextRequest } from "next/server";

type GetUserPayloadType = {
  params: Promise<{ username: string }>;
};

class UserController {
  async handleCreateUser(request: NextRequest) {}

  async handleGetUser(request: NextRequest, payload: GetUserPayloadType) {}
}
