import config from "@/config/config.json";
import { dbConnect } from "@/server/db";
import { User } from "@/server/model/user.model";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { stripe } from "./utils/stripe";

const { payment } = config.settings;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  // adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt" as any,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any | null> {
        await dbConnect();
        if (!credentials) return null;
        try {
          const user = await User.findOne({ email: credentials.email });
          const userWithPayment = { ...user, payment: credentials.payment };
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password,
            );

            if (isMatch) {
              return userWithPayment;
            } else {
              throw new Error("Incorrect password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: Error | any) {
          console.error("Error during authentication:", err.message);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    session: ({ session, token, user }) => {
      const sessionUser = {
        ...session.user,
        email: (token._doc as { email?: string })?.email,
        stripe_customer_id: (token._doc as { stripe_customer_id?: string })
          ?.stripe_customer_id,
        stripe_subscription_id: (
          token._doc as { stripe_subscription_id?: string }
        )?.stripe_subscription_id,
        isActive: (token._doc as { isActive?: boolean })?.isActive,
      };

      session.user = sessionUser as any;
      return session;
    },
  },

  events: {
    signIn: async ({ user }: { user: any }) => {
      const customerData = await stripe.customers.list({
        email: (user?._doc as { email?: string })?.email,
      });
      if (!customerData.data.length) {
        await stripe.customers
          .create({
            email: user._doc.email!,
            name: user._doc.name!,
          })
          .then(async (customer) => {
            return await User.findOneAndUpdate(
              { email: customer.email },
              { stripe_customer_id: customer.id },
            );
          });
      }
    },
  },
};
