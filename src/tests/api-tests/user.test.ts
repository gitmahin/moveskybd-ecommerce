import { testApiHandler } from "next-test-api-route-handler";
import * as LoginAPI from "@/app/api/v1/user/login/route";
import * as CreateUserAPI from "@/app/api/v1/user/create/route";
import { NextRequest } from "next/server";
import { setSearchParams } from "../helper";
import { describe, it, expect } from "vitest";
import { ApiResponse } from "@/utils/ApiResponse";

const validUserAuthData = {
  email: "jhonDoe@gmail.com",
  password: "JhonDoe15506",
  username: "jhondoe",
}

// -- Test user management
describe("Test User API", () => {
  // =================================================
  // Testing user account create via email-password
  // ==================================================
  // -- ⛔ Case: Return Error - For invalid request body
  it("create account: should return 400 Bad Request on Zod validation failure", async () => {
    await testApiHandler({
      appHandler: CreateUserAPI,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST", body: JSON.stringify({
            email: "jhonDoegmail.com",
            password: "f444",
            username: "$",
          })
        });

        expect(response.status).toBe(400);
        const data = await response.json()
        expect(data.message).toEqual("Error validating your request!");
        expect(data.errors[0].fieldErrors).toEqual(
          expect.objectContaining({
            email: expect.any(Array),
            password: expect.any(Array),
            username: expect.any(Array),
          })
        )

      }

    })
  })

  // -- ✅ Case: Successful account creation
  it("create account: should return user_id and store cookies with 201 status.", async () => {
    await testApiHandler({
      appHandler: CreateUserAPI,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST", body: JSON.stringify({
            ...validUserAuthData
          })
        });

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
        expect(response.status).toBe(201);
        const data = await response.json()
        expect(data).toEqual(
          expect.objectContaining(
            ApiResponse("Account created.", 201, { id: expect.any(String) }, null)
          )
        );

      }

    })
  });

  // -- ⛔ Case: Return Error - For duplicate account creation
  it("create account: should return 400 Bad Request on attempting to create existing account", async () => {
    await testApiHandler({
      appHandler: CreateUserAPI,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST", body: JSON.stringify({
            // -- Check user via email or username
            ...validUserAuthData
          })
        });

        expect(response.status).toBe(400);
        const data = await response.json()
        expect(data.message).toEqual("User already exists!");

      }

    })
  })

  // ==================================================
  // Test user login
  // ==================================================
  // -- ⛔ Case: Return Error - For invalid request body
  it("login: should return 400 Bad Request on Zod validation failure", async () => {
    await testApiHandler({
      appHandler: LoginAPI,
      requestPatcher: (req: NextRequest) => {
        const queryParams = {
          // -- No identifier provided
          // -- And pass has not provided by user
        };

        const url = setSearchParams(queryParams, req.url);
        return new Request(url, req);
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });

        expect(response.status).toBe(400);
        const data = await response.json()
        expect(data.message).toEqual("Error validating your request!");
        console.log(data.errors[0].fieldErrors)
        expect(data.errors[0].fieldErrors).toEqual(
          expect.objectContaining({
            identifier: expect.any(Array),
            password: expect.any(Array)
          })
        )

      }

    })
  })
  // -- ✅ Case: Successful login
  it("login: should return accessToken & refreshToken through cookies with 200 status.", async () => {
    await testApiHandler({
      appHandler: LoginAPI,
      requestPatcher: (req: NextRequest) => {
        const queryParams = {
          // -- User can login via email or username
          identifier: validUserAuthData.username,
          password: validUserAuthData.password,
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
