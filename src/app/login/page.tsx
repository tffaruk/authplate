import SingInForm from "@/components/Form/SingInForm";
import FormContainer from "@/components/FormContainer";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"; // Change the type as needed
import { getProviders } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Signin = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  const provider = await getProviders();
  let authProviders = Object?.values(provider!);

  return (
    <>
      <FormContainer>
        <div className="text-center mb-12">
          <h1 className="h2 font-semibold">Sign in to your account</h1>
          <p className="text-center">
            Don't Have An Account?{" "}
            <span className="font-semibold text-primary ">
              <Link href="/signup">sign up</Link>
            </span>
          </p>
        </div>
        <SingInForm authProviders={authProviders} />
      </FormContainer>
    </>
  );
};

export default Signin;
