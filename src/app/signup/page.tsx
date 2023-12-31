import RegisterForm from "@/components/Form/RegistrationForm";
import FormContainer from "@/components/FormContainer";
import Link from "next/link";

const SignUp = async () => {
  // const provider = await getProviders();
  // const authProviders = Object?.values(provider!);
  return (
    <FormContainer>
      <div className="text-center mb-12">
        <h1 className="h2 font-semibold">Sign in to your account</h1>
        <p>
          Already Have An Account?{" "}
          <span className="font-semibold text-primary">
            <Link href="/login">login</Link>
          </span>
        </p>
      </div>
      <RegisterForm />
      {/* <div className="relative w-full h-[1px] bg-[#B3B8C2] mb-4">
        <span className="absolute bg-theme-light z-10 inline-block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2">
          Or Continue With
        </span>
      </div>
      {authProviders.map(
        (provider) =>
          provider.type != "credentials" && (
            <Provider key={provider.id} provider={provider} />
          ),
      )} */}
    </FormContainer>
  );
};

export default SignUp;
