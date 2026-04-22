import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Represents a cookie configuration including its name and options.
 */
type CookieType = {
  name: string;
  cookie: Partial<ResponseCookie>;
};

/**
 * Service providing centralized configuration for application cookies.
 * 
 * This class defines the standard settings for authentication tokens,
 * ensuring consistency in security attributes like `httpOnly`, `secure`, and `sameSite`.
 */
export class CookieService {
  /**
   * Configuration for the Refresh Token cookie.
   * Valid for 7 days.
   */
  static REFRESH_TOKEN: CookieType = {
    name: "refreshToken",
    cookie: {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
  };

  /**
   * Configuration for the Access Token cookie.
   * Valid for 15 minutes.
   */
  static ACCESS_TOKEN: CookieType = {
    name: "accessToken",
    cookie: {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60, // 15 min
    },
  };
}
