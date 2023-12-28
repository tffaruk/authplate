import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      stripe_customer_id: string;
      isActive: boolean;
      stripe_subscription_id: string;
    } & DefaultSession["user"];
  }
}
