"use client";
import SubscriptionCancel from "@/app/dashboard/subscriptions/SubscriptionCancel";
import { Product, SubscriptionData } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SubscriptionCard = ({
  productsData,
  subsCriptionData,
}: {
  productsData: Product[];
  subsCriptionData: SubscriptionData;
}) => {
  const [subscriptionPlan, setSubscriptionPlan] = useState({
    plan_interval: subsCriptionData.subscription_interval,
    pricing_id: subsCriptionData.pricing_id,
    product_id: subsCriptionData.product_id,
  });
  const [interval, setInterval] = useState(
    subsCriptionData.subscription_interval,
  );
  // const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  //   subscriptionPlan,
  //   (state, newMessage) => [...state],
  // );
  const handleChange = (params: string) => {
    setInterval(params);
  };
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const handUpdateSubscription = async (id: string, product_id: string) => {
    setLoading(product_id);
    // Update subscription
    const updateResponse = await fetch("/api/stripe/update-subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionId: subsCriptionData.subscription_id,
        newProductId: id,
        subscriptionPriceId: subsCriptionData.subscription_item_id,
      }),
    });
    setLoading("");
    setSubscriptionPlan({
      plan_interval: interval,
      pricing_id: id,
      product_id: product_id,
    });

    // Handle UI update or redirect as needed
    // router.push("/dashboard");
  };

  const productPlan = productsData.find(
    (item) => item.id === subsCriptionData.product_id,
  );
  const plan = productPlan?.prices.find(
    (data) => data.interval === subscriptionPlan.plan_interval,
  );

  return (
    <div>
      <div className=" rounded-lg p-2 w-60  flex justify-between">
        <button
          className={`text-center w-1/2 btn  ${
            interval === "month" ? "btn-primary" : "border border-border"
          }`}
          onClick={() => handleChange("month")}
        >
          {" "}
          Monthly
        </button>
        <button
          className={`text-center w-1/2 btn  ${
            interval === "year" ? "btn-primary" : "border border-border"
          }`}
          onClick={() => handleChange("year")}
        >
          {" "}
          Yearly
        </button>
      </div>
      {productsData.map((item) => {
        return (
          <div
            key={item.id}
            className="flex border border-border items-center rounded-md px-2 py-1 justify-between mb-2"
          >
            <div>
              <h1 className="text-lg">{item.name}</h1>
              <h2 className="text-lg">
                $
                {item.prices.find((data) => data.interval === interval)
                  ?.amount! / 100}
              </h2>
            </div>
            <div>
              {item.id === subscriptionPlan.product_id &&
              plan?.interval === interval ? (
                <SubscriptionCancel id={subsCriptionData.subscription_id} />
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={loading === item.id}
                  onClick={() =>
                    handUpdateSubscription(
                      item.prices.find((data) => data.interval === interval)
                        ?.id!,
                      item.id,
                    )
                  }
                >
                  {loading === item.id ? "Updating..." : "Update"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionCard;
