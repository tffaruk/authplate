import { dbConnect } from "@/server/db";
import { User } from "@/server/model/user.model";

export const fetchUser = async (email: string) => {
  await dbConnect();
  const user = await User.findOne(
    { email: email },
    {
      email: 1,
      first_name: 1,
      last_name: 1,
      isValid: 1,
      password: 1,
      stripe_customer_id: 1,
      stripe_subscription_id: 1,
      isActive: 1,
    },
  );
  const userData = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    isValid: user?.isValid,
    password: user?.password,
    stripe_customer_id: user?.stripe_customer_id,
    stripe_subscription_id: user?.stripe_subscription_id,
    isActive: user?.isActive,
  };
  return userData;
};
