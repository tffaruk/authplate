"use client";

import { useRouter } from "next/navigation";

const Subscription = ({ id }: { id: string }) => {
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
      console.log(res);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={cancelSubscription} className="btn btn-primary mt-8">
      Cancel Subscription
    </button>
  );
};

export default Subscription;
