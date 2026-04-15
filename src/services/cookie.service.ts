
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export enum AuthProviderCookieType {
    GOOGLE = "google",
}

type CookieType = {
    name: string;
    cookie: Partial<ResponseCookie>;
};

export class CookieService {
    static REFRESH_TOKEN: CookieType = {
        name: "refreshToken",
        cookie: {
            httpOnly: false,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        },
    };

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