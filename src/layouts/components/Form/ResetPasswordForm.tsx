"use client";
import { resetPassword } from "@/app/action";
import useResponse from "@/hooks/useResponse";
import InputField from "../InputField";
import LabelField from "../LabelField";
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
        <LabelField label="Password" htmlFor="password" />
        <InputField
          id="password"
          placeholder="Password"
          type="password"
          name="password"
          required
        />
      </div>
      <div className="mb-4 col-12 md:col-6">
        <LabelField label="Current Password" htmlFor="current_password" />
        <InputField
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          name="confirm_password"
          required
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
