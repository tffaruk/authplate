"use server";
import ApiError from "@/error/ApiError";
import { authOptions } from "@/lib/auth";
import { fetchUser } from "@/lib/fetchUser";
import { generateRandomBase24 } from "@/lib/generateUrlParams";
import { stripe } from "@/lib/utils/stripe";
import {
  registrationSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  verifyUserSchema,
} from "@/schema/userSchema";
import { dbConnect } from "@/server/db";
import { OtpVerification } from "@/server/model/otp-verification.model";
import { Url_Params } from "@/server/model/urlparams.model";
import { User } from "@/server/model/user.model";
import bcrypt from "bcrypt";
import { MongoServerError } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { optVerificationService, sendVerificationOtp } from "./api/utils";

const hashedPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(process.env.SALT));
};

// user registration
export const registerUser = async (
  permission: boolean,
  prevState: any,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData.entries());
  const { email, first_name, last_name, password, confirm_password } =
    registrationSchema.parse(data);

  await dbConnect();
  let params;
  try {
    if (!permission) {
      throw new ApiError(
        "You are not allowed to register Click on the checkbox",
        400,
        "",
      );
    }
    if (password !== confirm_password) {
      throw Error("Password does not match");
    }
    const user = await User.findOne({ email: email });
    if (user) {
      throw new ApiError("user already exist", 400, "");
    }
    const verify = await optVerificationService.verifyUserService(
      email,
      new Date().toISOString(),
    );
    params = generateRandomBase24(verify.token);
    await optVerificationService.createUrlParams(email, params);
    const createdUser = await User.create({
      email,
      first_name,
      last_name,
      password: await hashedPassword(password),
      isValid: false,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        status: 400,
        message: JSON.stringify(error.issues),
      };
    } else if (error instanceof ApiError) {
      return {
        status: error.statusCode,
        message: error.message,
      };
    } else if (error instanceof Error) {
      return {
        status: 400,
        message: error.message,
      };
    } else if (error instanceof MongoServerError) {
      return {
        status: 400,
        message: error.message,
      };
    }
  } finally {
    if (permission) {
      redirect(`/login/otp?params=${params}`);
    }
  }
};

// update password
export const updatePassword = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData.entries());
  const { current_password, password } = updatePasswordSchema.parse(data);
  const user = await fetchUser(session?.user?.email!);
  await dbConnect();
  const isMatch = await bcrypt.compare(
    current_password as string,
    user.password as string,
  );
  try {
    if (!isMatch) throw Error("current password is not valid");
    await User.updateOne(
      { email: user.email },
      {
        $set: {
          password: await hashedPassword(password),
        },
      },
      { new: true },
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        status: 400,
        message: JSON.stringify(error.issues),
      };
    }
    return {
      status: 400,
      message: error.message,
    };
  }
};

// update user
export const updateForm = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const user = await fetchUser(session?.user?.email!);
  const first_name = formData?.get("first_name");
  const last_name = formData?.get("last_name");
  await dbConnect();
  try {
    await User.findOneAndUpdate(
      { email: user.email },
      { first_name, last_name },
      { new: true },
    );
    revalidatePath("/dashboard/settings");
    return {
      status: 200,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
};

// send otp
export const otpSender = async (
  email: string,
  currentTime: string,
  reset: string | null,
  prevState: any,
  formData: FormData,
) => {
  const otp = formData.get("otp") as string;
  await optVerificationService.verifyOtpService(email, otp, currentTime);
  const params = generateRandomBase24(email + otp);
  if (reset) {
    await optVerificationService.createUrlParams(email, params);
    redirect(`/login/reset-password?params=${params}`);
  } else {
    await Url_Params.findOneAndDelete({ email });
    redirect(`/login`);
  }
};

// Email verification
export const verifyEmail = async (
  currentTime: string,
  reset: boolean,
  prevState: any,
  fromData: FormData,
) => {
  const data = Object.fromEntries(fromData.entries());
  const { email } = verifyUserSchema.parse(data);

  await dbConnect();
  let params;
  try {
    const verifyUser = await optVerificationService.verifyUserService(
      email,
      currentTime,
    );
    params = generateRandomBase24(verifyUser.token);
    await optVerificationService.createUrlParams(email, params);
  } catch (error) {
  } finally {
    if (reset) {
      redirect(`/login/otp?params=${params}&reset=true`);
    } else {
      redirect(`/login/otp?params=${params}`);
    }
  }
};

// resend otp
export const resendOtp = async (currentTime: string, email: string) => {
  await dbConnect();
  if (!email) {
    throw new ApiError("Email is required", 400, "");
  } else {
    await OtpVerification.deleteOne({ user_id: email });
    await sendVerificationOtp(email, currentTime);
  }
};

// reset password
export const resetPassword = async (
  email: string,
  prevState: any,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData.entries());
  const { password, confirm_password } = resetPasswordSchema.parse(data);
  if (password !== confirm_password) {
    throw Error("Password does not match");
  }
  await dbConnect();
  try {
    await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: await hashedPassword(password),
        },
      },
      { new: true },
    );
    await Url_Params.findOneAndDelete({ email });
  } catch (error) {
  } finally {
    redirect("/login");
  }
};

// set password
export const setPassword = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const session = await getServerSession(authOptions);
  const user = await fetchUser(session?.user?.email!);
  const { password, confirm_password } = resetPasswordSchema.parse(data);

  await dbConnect();
  try {
    if (password !== confirm_password) {
      throw new ApiError("Password does not match", 400, "");
    }
    await User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          password: await hashedPassword(password),
        },
      },
      { new: true },
    );
    formData.set("password", "");
    formData.set("confirm_password", "");
    return {
      success: true,
      status: 200,
      message: "Password updated successfully",
    };
  } catch (error: any) {
    return {
      status: error.statusCode,
      message: error.message,
    };
  }
};

// subscription cancel
export const subscriptionCancel = async (subscription_id: string) => {
  await dbConnect();
  try {
    await stripe.subscriptions.cancel(subscription_id);
    revalidatePath("/dashboard/subscriptions");
    return {
      success: true,
      status: 200,
      message: "Subscription canceled successfully",
    };
  } catch (error: any) {
    return {
      status: error.statusCode,
      message: error.message,
    };
  }
};
