"use client";
import { verifyEmail } from "@/app/action";
import useResponse from "@/hooks/useResponse";
import { Notification } from "keep-react";
import { useFormStatus } from "react-dom";
import InputField from "../InputField";
import LabelField from "../LabelField";
import SubmitButton from "../SubmitButton";

const EmailVerificationForm = () => {
  const veriFyEmail = verifyEmail.bind(null, new Date().toISOString(), false);
  const { dispatch, showSubmitted, error, successMessage } =
    useResponse(veriFyEmail);

  return (
    <>
      <Notification

        dismiss={!showSubmitted}
        // onDismiss={onDismiss}
        position="top-right"
        className="max-w-[400px] translate-x-4 transition duration-700 ease-in-out"

      >

        Notification
      </Notification>
      <form className="mx-auto max-w-md" action={dispatch}>
        <div className="mb-4">
          <LabelField label="Email" />
          <InputField
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            required
          />
        </div>
        <div className="mb-2">
          <small className="text-red-600">{error}</small>
        </div>

        <SubmitButton label="Submit" className="w-full" pending_label="Submitting" />
      </form>
    </>
  );
};

export default EmailVerificationForm;


