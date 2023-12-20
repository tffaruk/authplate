"use client";
// import { Label } from "keep-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import InputField from "../InputField";
import LabelField from "../LabelField";

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        payment: "paddle",
      });

      if (res!.status === 200) {
        sessionStorage.setItem("remember", JSON.stringify(true));
        router.push("/");
        formRef!.current!.reset();
        setError("");
      }
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };
  useEffect(() => {
    if (remember) {
      localStorage.setItem("remember", JSON.stringify(remember));
    } else {
      localStorage.removeItem("remember");
    }
  }, [remember]);
  return (
    <form
      className="mx-auto max-w-md mb-10"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <LabelField label="Email" htmlFor="email" />
        <InputField
          id="email"
          placeholder="Email"
          color="gray"
          type="email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
      </div>
      <div className="mb-4">
        <LabelField label="Password" htmlFor="password" />
        <InputField
          id="password"
          placeholder="Password"
          color="gray"
          type="password"
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
          required
        />
      </div>
      <div className="mb-2">
        <small className="text-red-600">{error}</small>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          {" "}
          <input
            type="checkbox"
            id="checkbox"
            className="focus:ring-0 focus:outline-none rounded-sm focus:shadow-none focus:ring-transparent "
            onChange={handleChange}
          />
          <label htmlFor="checkbox" className="ml-2 text-dark font-normal">
            Remember me
          </label>
        </div>

        <p>
          <span className="text-primary underline font-normal">
            <Link href={`/login/forgot`}> Forgot Password?</Link>
          </span>
        </p>
      </div>
      <button
        type="submit"
        className=" focus:shadow-outline block w-full mt-10 rounded bg-primary py-2 px-4 font-bold text-white hover:bg-primary/70 focus:outline-none"
      >
        Login
      </button>
    </form>
  );
};
export default LoginForm;
