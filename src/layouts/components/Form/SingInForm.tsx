import { getProviders } from "next-auth/react";
import Provider from "../Provider";
import LoginForm from "./LoginForm";

const SingInForm = async () => {
  const provider = await getProviders();
  let authProviders;
  if (provider) {
    authProviders = Object?.values(provider!);
  }
  return (
    <>
      <LoginForm key="credentials" />
      <div className="relative w-full h-[1px] bg-[#B3B8C2] mb-4">
        <span className="absolute bg-theme-light z-10 inline-block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2">
          Or Continue With
        </span>
      </div>
      {authProviders?.map(
        (provider) =>
          provider.type != "credentials" && (
            <Provider key={provider.id} provider={provider} />
          ),
      )}
    </>
  );
};

export default SingInForm;
