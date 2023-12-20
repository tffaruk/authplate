import { UserModel, UserType } from "@/server/types/user.type";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserType, UserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    stripe_customer_id: {
      type: String,
    },
    stripe_subscription_id: {
      type: String,
    },
    paddle_customer_id: {
      type: String,
    },
    paddle_subscription_id: {
      type: String,
    },
    isValid: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.user ||
  mongoose.model<UserType, UserModel>("user", userSchema);
