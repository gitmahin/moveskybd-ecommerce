import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "@/app/api/v1/user/index";
import { NextRequest } from "next/server";
import { setSearchParams } from "../helper";
import { describe, it, expect } from "vitest";
import { logger } from "@/lib";
import { ApiResponse } from "@/utils";

// -- Test user management
describe("Test User API", () => {
  // =================================================
  // Testing user account create via email-password
  // ==================================================
  // -- Case: Successful account creation
  it("should return user_id and store cookies with 201 status");

  // ==================================================
  // Test user login
  // ==================================================
  // -- Case: Successful login
  it("should return accessToken & refreshToken through cookies with 200 status", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher: (req: NextRequest) => {
        const queryParams = {
          email: "nimulmahin@gmail.com",
          username: "gitmahin",
          password: "Mahin15006",
        };

        const url = setSearchParams(queryParams, req.url);
        return new Request(url, req);
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        expect(response.cookies).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              accessToken: expect.any(String),
            }),
            expect.objectContaining({
              refreshToken: expect.any(String),
            }),
          ])
        );
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toEqual(
          expect.objectContaining(
            ApiResponse("Login success.", 200, null, null)
          )
        );
      },
    });
  });
});
