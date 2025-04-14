// lib/models/Razorpay.model.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IRzp extends Document {
    userId: mongoose.Types.ObjectId; // Link credentials to a user (optional but good idea)
    keyId: string;
    encryptedKeySecret: string;
    createdAt: Date;
}

const RzpSchema = new Schema<IRzp>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Optional: link to User collection
    keyId: { type: String, required: true },
    encryptedKeySecret: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite issues in Next.js (hot reload problem)
const RzpModel = models.Rzp || model<IRzp>('Rzp', RzpSchema);

export default RzpModel;
