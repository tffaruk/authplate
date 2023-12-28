"use client";
import { Pricing, Product } from "@/types/index.js";
import { useState } from "react";
import PricingCard from "./PricingCard";

const Pricing = ({
  pricing,
  products,
  active_payment,
}: {
  pricing: Pricing;
  products: Product[];
  active_payment: boolean;
}) => {
  const [isCounter, setIsCounter] = useState(false);
  const [start, setStart] = useState(false);
  const handleChange = (params: boolean) => {
    setIsCounter(true);
    setStart(params);
  };
  const mergeProductPrice = products.map((item) => {
    const productPrice = pricing.pricing_card.find(
      (price) => price.name === item.name,
    );
    return {
      ...item,
      content: productPrice?.content,
      services: productPrice?.services,
      featured: productPrice?.featured,
      button_label: productPrice?.button_label,
      currency: productPrice?.currency,
    };
  });

  return (
    <section className="section bg-theme-light/30" id="pricing">
      <div className="container">
        <div className="row">
          <div className="mb-12 text-center md:col-12">
            <h2 className="mb-6">{pricing.title}</h2>

            <div className="border-2 border-border rounded-lg p-2 w-60 mx-auto flex justify-between">
              <button
                className={`text-center w-1/2 btn  ${!start && "btn-primary"}`}
                onClick={() => handleChange(false)}
              >
                {" "}
                Monthly
              </button>
              <button
                className={`text-center w-1/2 btn  ${start && "btn-primary"}`}
                onClick={() => handleChange(true)}
              >
                {" "}
                Yearly
              </button>
            </div>
            {/* <span className="rounded-xl py-2 px-4 text-primary">
              {pricing.offer}
            </span> */}
          </div>
        </div>
        {/* pricing  */}

        <div className="row xl:justify-center">
          <div className="xl:col-10">
            <div className="row">
              {mergeProductPrice.map((item, i) => (
                <PricingCard
                  active_payment={active_payment}
                  item={item}
                  key={i}
                  start={start}
                  isCounter={isCounter}
                  toggle={pricing.monthly_yearly_toggle}
                />
              ))}
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </section>
  );
};

export default Pricing;
