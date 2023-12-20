import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export type ErrorMessage = {
  message: string;
  path: string;
};
export type ErrorResponse = {
  errormessage: ErrorMessage[];
  statusCode: number;
  message: string;
};
type NextFunction = () => void;
export type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction
) => void;

export type OtpVerificationType = {
  user_id: string;
  token: string;
  expires: string;
};


