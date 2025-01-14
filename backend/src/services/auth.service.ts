import { JWT_SECRET, JWT_REFRESH_SECRET } from './../constants/env';
import UserModel from "../models/user.model";
import VerificationModel from "../models/verification.model";
import SessionModel from "../models/session.model";
import { tenMinutesFromNow } from "../utils/date";
import jwt from "jsonwebtoken";


import tryCatch from "../utils/tryCatch";

type RegisterParams = {
    email: string;
    password: string;
    userAgent?: string;
}

export const registerService = async (userData: RegisterParams) => {
    // Verify if user exists or not
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    //Create new user
    const user = await UserModel.create({
        email: userData.email,
        password: userData.password,
    });

    //Send verification email
    const verificationCode = await VerificationModel.create({
        userId: user._id, //id is created by mongoose by default
        type: "verify-email",
        expiresAt: tenMinutesFromNow()
    })

    //Create Session
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: userData.userAgent,
    })

    //Refresh Token
    const refreshToken = jwt.sign({
        sessionId: session._id,
    }, JWT_REFRESH_SECRET, {
        expiresIn: "30d",
        audience: ['user'] //Assigns this refresh token to accounts which are user roles (not admin e.g)
    })

    //Access Token
    const accessToken = jwt.sign({
        userId: user._id,
        sessionId: session._id,
    }, JWT_SECRET, {
        expiresIn: "15m",
        audience: ['user']
    })

    return {
        user,
        accessToken,
        refreshToken,
    };
}
