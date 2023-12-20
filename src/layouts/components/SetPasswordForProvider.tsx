"use client";
import { setPassword } from "@/app/action";
import { Label, Notification, TextInput } from "keep-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

const SetPasswordForProvider = () => {
  const [state, dispatch] = useFormState(setPassword, null);
  const [error, setError] = useState("");
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (state?.status === 200) {
      setShowSubmitted(true);
      setSuccessMessage(state.message);
      setTimeout(() => {
        setShowSubmitted(false);
      }, 3000);
    } else if (state?.status === 400) {
      setError(state.message);
    }
  }, [state]);

  return (
    <div className="rounded-md">
      <Notification
        dismiss={!showSubmitted}
        // onDismiss={onDismiss}
        position="top-right"
        className="max-w-[400px] translate-x-4 transition duration-700 ease-in-out"
      >
        Notification
      </Notification>
      <form className="mx-auto row" action={dispatch}>
        <div className="col-12">
          <h2 className="mb-2">Set Password</h2>
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

        <p className="mb-2 text-red-600">{error}</p>
        <div className="col-12">
          <SubmitButton
            label="Set Password"
            className="inline"
            pending_label="Setting Password"
          />
        </div>
      </form>
    </div>
  );
};

export default SetPasswordForProvider;
