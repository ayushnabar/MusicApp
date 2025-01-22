import { Response } from "express";
import { HOSTING_ENV } from "../constants/env";
import { tenMinutesFromNow, oneMonthFromNow } from "./date";

const isDevelopment = () => HOSTING_ENV === "development";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
    return res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isDevelopment() ? false : true,
        sameSite: "strict",
        expires: tenMinutesFromNow()
    }).cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isDevelopment() ? false : true,
        sameSite: "strict",
        expires: oneMonthFromNow(),
        path: "/auth/refresh"
    })
}