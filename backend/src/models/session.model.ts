import mongoose from "mongoose";
import { oneMonthFromNow } from "../utils/date";

interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent: string;
    createdAt: Date;
    expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", index: true },
    userAgent: { type: String },
    expiresAt: { type: Date, default: oneMonthFromNow() },
}, {
    timestamps: true
})

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel