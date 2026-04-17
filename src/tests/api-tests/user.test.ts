import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from "@/app/api/v1/user/index"
import { NextRequest } from 'next/server';
import { setSearchParams } from '../helper';

describe("Test User API", () => {
    it("should return accessToken & refreshToken through cookies with 200 status", async () => {
        await testApiHandler({
            appHandler,
            requestPatcher: (req: NextRequest) => {

                const queryParams = {
                    email: "nimulmahin@gmail.com",
                    username: "gitmahin",
                    password: "Mahin15006",
                }

                const url = setSearchParams(queryParams, req.url)
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
            }
        })
    })
})