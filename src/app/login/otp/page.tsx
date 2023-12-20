import FormContainer from "@/components/FormContainer";
import OtpVerifyForm from "@/components/OtpVerfyForm";
import { dbConnect } from "@/server/db";
import { Url_Params } from "@/server/model/urlparams.model";
import { redirect } from "next/navigation";

const getParams = async (params: string) => {
  await dbConnect();
  const urlParams = await Url_Params.findOne({ params });
  const data = { email: urlParams?.email };
  return data;
};
const Otp = async ({ searchParams }: { searchParams: { params: string } }) => {
  const geturlParams = await getParams(searchParams.params);
  // if (!(await getParams(searchParams.params))) {
  //   redirect("/404");
  // }
  return (
    <FormContainer>
      <OtpVerifyForm urlParams={geturlParams} />
    </FormContainer>
  );
};

export default Otp;
