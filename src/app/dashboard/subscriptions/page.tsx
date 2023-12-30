import { authOptions } from "@/lib/auth";
import { fetchUserByEmail } from "@/lib/fetchUser";
import SidebarContainer from "@/partials/SidebarContainer";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubscriptionPlans from "./subscriptionPlans";

const Subscription = async () => {
  const session = await getServerSession(authOptions);
  const user = await fetchUserByEmail();
  const {
    data: { isValid, isActive, stripe_subscription_id },
  } = user;
  if (!session) {
    redirect("/login");
  } else if (isValid === false) {
    redirect("/");
  }
  return (
    <SidebarContainer user={user.data}>
      {isActive ? (
        <SubscriptionPlans user={user.data} />
      ) : (
        <div className="text-center">
          <h1 className="h4">You don't have any subscription</h1>
          <p>
            Click here for buy a{" "}
            <Link href="/#pricing" className="underline font-semibold">
              subscription here
            </Link>
          </p>
        </div>
      )}
    </SidebarContainer>
  );
};

export default Subscription;
