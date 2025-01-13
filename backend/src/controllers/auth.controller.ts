import tryCatch from "../utils/tryCatch";
import {z} from 'zod';

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

    /*Calls appropriate service */
    
    /*Return Response */

})