import { dbConnect } from "@/server/db";
import { User } from "@/server/model/user.model";
import { revalidatePath } from "next/cache";

export const fetchUser = async (session: any) => {
  dbConnect();
  const user = await User.findOne(
    { email: session?.user?.email },
    {
      email: 1,
      first_name: 1,
      last_name: 1,
      isValid: 1,
      password: 1,
      stripe_customer_id: 1,
    },
  );
  revalidatePath("/");
  const userData = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    isValid: user?.isValid,
    password: user?.password,
    stripe_customer_id: user?.stripe_customer_id,
  };
  return userData;
};
