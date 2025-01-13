import UserModel from "../models/user.model";
import tryCatch from "../utils/tryCatch";

type RegisterParams = {
    email: string;
    password: string;
    userAgent: string;
}

export const registerService = async (userData: RegisterParams) => {
    // Verify if user exists or not
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const user = await UserModel.create({
        email: userData.email,
        password: userData.password,
    });
    return user;
}
