"use client";
import { updateForm } from "@/app/action";
import useResponse from "@/hooks/useResponse";
import { Label, Notification, TextInput } from "keep-react";
import SubmitButton from "../SubmitButton";

const UpdateForm = ({ user }: { user: any }) => {
  const { showSubmitted, dispatch, error } = useResponse(updateForm);

  return (
    <div>
      <Notification
        dismiss={!showSubmitted}
        // onDismiss={onDismiss}
        position="top-right"
        className="max-w-[400px] translate-x-4 transition duration-700 ease-in-out"
      >
        Notification
      </Notification>
      <form action={dispatch} className="mx-auto row">
        <div className="col-12">
          <h2 className="mb-2">Update your profile</h2>
        </div>
        <div className="md:col-6 col-12">
          <Label value="First Name" htmlFor="first_name" />
          <TextInput
            id="first_name"
            placeholder="First Name"
            color="gray"
            type="text"
            name="first_name"
            defaultValue={user.first_name}
            required
          />
        </div>
        <div className="md:col-6 col-12">
          <Label value="Last Name" htmlFor="last_name" />
          <TextInput
            id="last_name"
            placeholder="Last Name"
            color="gray"
            type="text"
            name="last_name"
            defaultValue={user.last_name}
            required
          />
        </div>
        <div className="mb-2">
          <small className="text-red-600">{error}</small>
        </div>
        <div className="col-12 mt-4">
          <SubmitButton
            label="Save Update"
            className="inline"
            pending_label="Save Updating..."
          />
        </div>
      </form>
    </div>
  );
};
export default UpdateForm;
