import tryCatch from "../utils/tryCatch";
import { CREATED } from "../constants/https";
import { registerService } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email().min(8),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
    userAgent: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, { //Refine method checks if password is equal to confirm password, if true
    message: "Passwords do not match",                         //schema passes, false would raise error
    path: ["confirmPassword"]
})

export const registerController = tryCatch(async (req, res) => {
    /*Validate Request */
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"]
    });
    console.log(request)
    /*Calls appropriate service */
    const { user, refreshToken, accessToken } = await registerService(request);

    /*Return Response */
    setAuthCookies(res, accessToken, refreshToken).status(CREATED).json(user);
 
})