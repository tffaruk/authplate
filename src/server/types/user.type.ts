import { Model } from "mongoose";

export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image: string;
  isValid: boolean;
  isActive: boolean;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  paddle_customer_id: string;
  paddle_subscription_id: string;
};
export type UserModel = Model<UserType, object>;
