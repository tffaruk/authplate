import ApiError from "@/error/ApiError";
import { authOptions } from "@/lib/auth";
import { generateRandomBase24 } from "@/lib/generateUrlParams";
import { dbConnect } from "@/server/db";
import { User } from "@/server/model/user.model";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { optVerificationService } from "../utils";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  await dbConnect();
  const hashedPassword = await bcrypt.hash(body.password, 5);
  const verify = await optVerificationService.verifyUserService(
    body.email,
    new Date().toISOString(),
  );
  const params = generateRandomBase24(verify.token);
  await optVerificationService.createUrlParams(body.email, params);
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw new ApiError("user already exist", 400, "");
    }
    const userCreated = await User.create({
      ...body,
      password: hashedPassword,
      isValid: false,
    });
    return NextResponse.json({
      status: 200,
      params: params,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  await dbConnect();
  try {
    const data = await User.findOne({ email: session?.user?.email });
    return NextResponse.json({
      data,
      status: 200,
      params: "",
    });
  } catch (error: any) {
    return NextResponse.json({
      data: error.message,
      status: 500,
      params: "",
    });
  }
};
