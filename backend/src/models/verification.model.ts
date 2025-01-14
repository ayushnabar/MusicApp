import mongoose from "mongoose";
// import {verificationType} from "../constants/verificationType";

interface VerificationDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    expiresAt: Date;
    createdAt: Date;
}

const verificationSchema = new mongoose.Schema<VerificationDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", index: true },
    type: { type: String, required: true },
    expiresAt: { type: Date, required: true },
}, {
    timestamps: true
})

const VerificationModel = mongoose.model<VerificationDocument>("Verification", verificationSchema, "verification_codes");

export default VerificationModel