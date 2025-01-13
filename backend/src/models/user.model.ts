import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/hashPassword";

interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    compare: (password: string) => Promise<boolean>;

}

const userSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },   
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) { //Hooks to run before saving the document
    if (!this.isModified("password")) { //Only hash password if the current password on document is not modified
        return next();                  //Modified password as in password reset or creating a new account
    }
    this.updatedAt = new Date();
    this.password = await hashPassword(this.password);
    next();
})

userSchema.methods.compare = async function (password: string) { //instance method for comparing password
    return await comparePassword(password, this.password);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel