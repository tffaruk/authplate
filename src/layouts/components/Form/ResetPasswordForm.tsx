"use client";
import { resetPassword } from "@/app/action";
import useResponse from "@/hooks/useResponse";
import { Label, TextInput } from "keep-react";
import SubmitButton from "../SubmitButton";

const ResetPasswordForm = ({ email }: { email: string }) => {
  const reset = resetPassword.bind(null, email);
  const { dispatch, error } = useResponse(reset);

  return (
    <form className="mx-auto row" action={dispatch}>
      <div className="col-12">
        <h2 className="mb-2">Reset Password</h2>
      </div>
      <div className="mb-4 col-12 md:col-6">
        <Label value="Password" htmlFor="password" />
        <TextInput
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          color="gray"
        />
      </div>
      <div className="mb-4 col-12 md:col-6">
        <Label value="Confirm Password" htmlFor="confirm-password" />
        <TextInput
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          name="confirm_password"
          required
          color="gray"
        />
      </div>
      <div className="mb-2">
        <small className="text-red-600">{error}</small>
      </div>
      <div className="col-12">
        <SubmitButton
          className="w-full"
          label="Reset Password"
          pending_label="Reset Password..."
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
