"use client";
import { registerUser } from "@/app/action";
import useResponse from "@/hooks/useResponse";
import { useState } from "react";
import InputField from "../InputField";
import LabelField from "../LabelField";
import SubmitButton from "../SubmitButton";

const RegisterForm = () => {
  const [permission, setPermission] = useState(false);
  const registerWithPermission = registerUser.bind(null, permission);
  const { dispatch, error } = useResponse(registerWithPermission);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermission(e.target.checked);
  };

  return (
    <form className="mx-auto mb-10 row" action={dispatch}>
      <div className="mb-4 col-12 md:col-6">
        <LabelField label="First Name" htmlFor="first_name" />
        <InputField
          id="first_name"
          placeholder="First Name"
          color="gray"
          type="text"
          name="first_name"
          required
        />
      </div>
      <div className="mb-4 col-12 md:col-6">
        <LabelField label="Last Name" htmlFor="first_name" />
        <InputField
          id="last_name"
          placeholder="Last Name"
          color="gray"
          type="text"
          name="last_name"
          required
        />
      </div>
      <div className="mb-4">
        <LabelField label="Email" htmlFor="email" />
        <InputField
          id="email"
          placeholder="Email"
          color="gray"
          type="email"
          name="email"
          required
        />
      </div>
      <div className="mb-4 col-12 md:col-6">
        <LabelField label="Password" htmlFor="password" />
        <InputField
          id="password"
          placeholder="Password"
          color="gray"
          type="password"
          name="password"
          required
        />
      </div>
      <div className="mb-4 col-12 md:col-6">
        <LabelField label="Confirm Password" htmlFor="confirm_password" />
        <InputField
          id="confirm_password"
          placeholder="Confirm Password"
          color="gray"
          type="password"
          name="confirm_password"
          required
        />
      </div>
      <div className="mb-2">
        <small className="text-red-600">{error}</small>
      </div>

      <div className="flex items-center mb-10">
        {" "}
        <input
          type="checkbox"
          id="checkbox"
          className="focus:ring-0 cursor-pointer focus:outline-none rounded-sm focus:shadow-none focus:ring-transparent "
          onChange={handleChange}
        />
        <label htmlFor="checkbox" className="ml-2 text-dark font-normal">
          I accept the terms & conditions & privacy policy of software, Inc.
        </label>
      </div>

      <div className="col-12">
        <SubmitButton
          label="submit"
          className="w-full"
          pending_label="submitting..."
        />
      </div>
    </form>
  );
};

export default RegisterForm;
