import UpdateForm from "@/components/Form/UpdateForm";
import Subscription from "@/components/Subscription";
import { authOptions } from "@/lib/auth";
import { fetchUser } from "@/lib/fetchUser";
import { stripe } from "@/lib/utils/stripe";
import SidebarContainer from "@/partials/SidebarContainer";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = await fetchUser(session);


  if (!session) {
    redirect("/login");
  } else if (user.isValid === false) {
    redirect("/");
  }
  const stripeCustomer = await stripe.subscriptions.list({
    customer: user.stripe_customer_id,
  });

  return (
    <SidebarContainer user={user}>
      <div className="bg-white rounded-lg px-8 py-12">
        <div className="mb-12">
          <UpdateForm user={user} />
        </div>
      </div>
      <Subscription id={stripeCustomer?.data[0]?.id} />
    </SidebarContainer>
  );
};

export default Dashboard;
