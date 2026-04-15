import { NextResponse, type NextRequest } from "next/server";
import { pgDb } from "./lib";
import { usersTable } from "./database";
import { eq } from "drizzle-orm";

export async function proxy(request: NextRequest) {
  const res = NextResponse.next();

  const refreshToken = request.cookies.get("refreshToken");
  const accessToken = request.cookies.get("accessToken");
  console.log("session is here", accessToken, refreshToken);

  /**
   * Start session via user on signin
   * Check refreshToken in middleware and rotate accessToken & refreshToken in middleware
   */

  // -- Check if refreshToken
  // if (!refreshToken) {
  //   console.log("Creating refresh token.................")
  //   const username = await pgDb.select({ username: usersTable.username }).from(usersTable).where(eq(usersTable.username, "gitmahin"))
  //   console.log("username is here", username[0].username)
  //   res.cookies.set('refreshToken', `giveMeToken`, { maxAge: 60 * 2 });
  //   res.cookies.set('accessToken', `${username[0].username}`, { maxAge: 60 });
  // }

  // -- check if accessToken, otherwise refresh via refreshToken
  // if (!accessToken) {
  //   console.log("Refreshing Access token.................")
  //   if (refreshToken && refreshToken.value == "giveMeToken") {
  //     res.cookies.set('accessToken', `gitmahin`, { maxAge: 60 });
  //   }

  // }

  return res;
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/page-1", "/page-2"],
};
