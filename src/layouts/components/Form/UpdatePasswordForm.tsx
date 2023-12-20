"use client";
import { updatePassword } from "@/app/action";
import useResponse from "@/hooks/useResponse";
import { Label, TextInput } from "keep-react";
import SubmitButton from "../SubmitButton";
const UpdatePasswordForm = () => {
  // const [state, dispatch] = useFormState(updatePassword, null);
  const { dispatch } = useResponse(updatePassword);
  return (
    <form action={dispatch} className="mx-auto row">
      <div className="col-12">
        <h2 className="mb-2">Update your password</h2>
      </div>
      <div className="mb-4 col-12 md:col-6">
        <Label value="Password" htmlFor="current_password" />
        <TextInput
          id="password"
          color="gray"
          name="current_password"
          type="password"
          placeholder="Enter your current password"
          required
        />
      </div>
      <div className="mb-4 col-12 md:col-6">
        <Label value="New Password" htmlFor="new_password" />
        <TextInput
          id="new_password"
          placeholder="New Password"
          color="gray"
          type="password"
          name="password"
          required
        />
      </div>
      <div className="col-12 mt-4">
        <SubmitButton
          label="Save Update"
          className="inline"
          pending_label="Save Updating..."
        />
      </div>
    </form>
  );
};
export default UpdatePasswordForm;
