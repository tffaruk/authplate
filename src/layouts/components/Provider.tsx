"use client";
import { signIn, useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
interface AuthProvider {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
}

const providers = [
  {
    id: "google",
    icon: <FcGoogle className="text-h4" />,
  },
  {
    id: "github",
    icon: <BsGithub className="text-h4" />,
  },
  {
    id: "facebook",
    icon: <FaFacebookSquare className="text-h4" />,
  },
];
const Provider = ({ provider }: { provider: AuthProvider }) => {
  const session = useSession();
  return (
    providers.find((item) => item.id === provider.id) && (
      <div
        key={provider.id}
        className="mx-auto mt-4 flex justify-center text-center"
      >
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center font-semibold text-dark py-3 border-border border rounded-md w-full"
        >
          <span className="mr-2">
            {providers.find((item) => item.id === provider.id)?.icon}
          </span>{" "}
          Sign in with {provider.name}
        </button>
      </div>
    )
  );
};

export default Provider;
