import { dbConnect } from "@/server/db";
import { User } from "@/server/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
``
const stripe = new Stripe(
  "sk_test_51OLgmKGX3tVq15Ofg9KGf7Ca0n0mhecLLP9NV25kwuy2CuKK6pVogTY2IHuRgRbVaA6dDyhUeV3aPqA2gC1dPLpZ00oruFXQ89",
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2023-10-16",
  },
);

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
  await dbConnect();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      {
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      },
      { status: 400 },
    );
  }
  // getting to the data we want from the event
  const subscription = event.data.object as Stripe.Subscription;
  switch (event.type) {
    case "customer.subscription.created":
      await User.findOneAndUpdate(
        {
          stripe_customer_id: subscription.customer,
        },
        {
          isActive: true,
          subscriptionId: subscription.id,
        },
      );
      break;
    case "customer.subscription.deleted":
      await User.findOneAndUpdate(
        {
          stripe_customer_id: subscription.customer,
        },
        {
          isActive: false,
        },
      );
      break;
    default:
      throw new Error("Unhandled relevant event!");
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ received: true });
};

export { webhookHandler as POST };
