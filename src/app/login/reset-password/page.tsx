import ResetPasswordForm from "@/components/Form/ResetPasswordForm";
import FormContainer from "@/components/FormContainer";
import { dbConnect } from "@/server/db";
import { Url_Params } from "@/server/model/urlparams.model";
import { redirect } from "next/navigation";

const getParams = async (params: string) => {
  await dbConnect();
  const urlParams = await Url_Params.findOne({ params });
  return urlParams;
};
const Otp = async ({ searchParams }: { searchParams: { params: string } }) => {
  const geturlParams = await getParams(searchParams.params);
  if (!geturlParams) {
    redirect("/404");
  }
  return (
    <div>
      <FormContainer>
        <ResetPasswordForm email={geturlParams.email} />
      </FormContainer>
    </div>
  );
};

export default Otp;
