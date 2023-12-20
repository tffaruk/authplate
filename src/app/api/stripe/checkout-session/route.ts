import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/utils/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "You are not signed in.",
        },
      },
      { status: 401 },
    );
  }
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer:
      (session?.user as { stripe_customer_id?: string })?.stripe_customer_id! ||
      null,
    line_items: [
      {
        price: body,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000" + `?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000",
    subscription_data: {
      metadata: {
        payingUserId: session.user.email,
      },
      trial_period_days: 14,
    },
  } as Stripe.Checkout.SessionCreateParams);

  if (!checkoutSession.url) {
    return NextResponse.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not create checkout session",
        },
      },
      { status: 500 },
    );
  }
  return NextResponse.json({ session: checkoutSession }, { status: 200 });
}
