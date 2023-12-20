"use client";
import { updatePassword } from "@/app/action";
import useResponse from "@/hooks/useResponse";
import InputField from "../InputField";
import LabelField from "../LabelField";
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
        <LabelField label="Current Password" htmlFor="current_password" />
        <InputField
          id="current_password"
          placeholder="Current Password"
          color="gray"
          type="password"
          name="current_password"
          required
        />
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
