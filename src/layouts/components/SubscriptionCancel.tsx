"use client";

import { useRouter } from "next/navigation";

const SubscriptionCancel = ({ id }: { id: string }) => {
  const router = useRouter();

  const cancelSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/subscription-cancel", {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        router.push("/dashboard/subscriptions");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={cancelSubscription}
      className="btn btn-primary bg-red-800 border-red-800"
    >
      Cancel
    </button>
  );
};

export default SubscriptionCancel;
