"use client";

import getStripe from "@/lib/utils/getStripe";
import CountUp from "react-countup";
import { BsPinAngleFill } from "react-icons/bs";
import Stripe from "stripe";
type PricingCardType = {
  content: string | undefined;
  services: string[] | undefined;
  featured: boolean | undefined;
  name: string;
  id: string;
  button_label: string;
  currency: string;
  prices: {
    product: string | Stripe.Product | Stripe.DeletedProduct;
    id: string;
    interval: Stripe.Price.Recurring.Interval | undefined;
    amount: number | null;
  }[];
};
const handleClick = async (productId: string) => {
  const res = await fetch("/api/stripe/checkout-session", {
    method: "POST",
    body: JSON.stringify(productId),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const checkoutSession = await res.json().then((value) => {
    return value.session;
  });
  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout({
    sessionId: checkoutSession.id,
  });
};

const PricingCard = ({
  item,
  isCounter,
  start,
  toggle,
}: {
  item: any;
  isCounter: boolean;
  start: boolean;
  toggle: string;
}) => {
  const yearlyPrice = item.prices.find(
    (price: any) => price.interval === "year",
  );
  const monthlyPrice = item.prices.find(
    (price: any) => price.interval === "month",
  );
  // console.log({ monthlyPrice, yearlyPrice });

  return (
    <div className="mt-6 md:col-6 lg:col-4">
      <div className="rounded-2xl  bg-theme-light">
        <div className="p-8">
          <h3 className="h4 mb-1 font-semibold">{item.name}</h3>
          <span className="h3 inline-flex font-bold text-dark">
            {item.currency}

            {toggle === "monthly" ? (
              monthlyPrice?.amount! / 100
            ) : toggle === "yearly" ? (
              yearlyPrice?.amount! / 100
            ) : (
              <span>
                {isCounter ? (
                  <CountUp
                    start={Number(
                      start
                        ? monthlyPrice?.amount! / 100
                        : yearlyPrice?.amount! / 100,
                    )}
                    end={
                      start
                        ? Number(yearlyPrice?.amount! / 100)
                        : Number(monthlyPrice?.amount! / 100)
                    }
                    duration={0.3}
                  />
                ) : (
                  monthlyPrice?.amount! / 100
                )}
              </span>
            )}
          </span>
          <span className="text-monthly inline">
            {toggle === "monthly"
              ? "/Month"
              : toggle === "yearly"
                ? "/Year"
                : start
                  ? "/Year"
                  : "/Month"}
          </span>
          <p className="mb-4 border-b pb-4">{item.content}</p>
          <ul className="mt-4 mb-6">
            {item.services!.map((service: any, i: any) => (
              <li className="mb-2" key={`service-${i}`}>
                <span className="mr-2">
                  <BsPinAngleFill className="mr-1 inline h-[14px] w-[14px] text-primary" />
                </span>
                {service}
              </li>
            ))}
          </ul>
          <button
            className={`btn block text-center ${
              item.featured
                ? "btn-primary"
                : "btn-outline-primary rounded-md text-primary after:bg-primary hover:bg-transparent"
            }`}
            onClick={() =>
              handleClick(!start ? monthlyPrice?.id! : yearlyPrice?.id!)
            }
          >
            {item.button_label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
