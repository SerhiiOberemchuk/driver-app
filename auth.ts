import NextAuth from "next-auth";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

import { db as prisma } from "./app/lib/db";
// import { PrismaAdapter } from "@auth/prisma-adapter";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email Address", type: "email" },
      password: { label: "Password", type: "password" },
    },

    async authorize(c) {
      console.log("start authorize");

      if (!c.email || !c.password) {
        console.log("Missing credentials");
        throw new Error("Email and password are required");
      }

      const userFound = await prisma.user.findUnique({
        where: {
          email: c.email as string,
        },
      });

      if (!userFound || !userFound.password) {
        throw new Error("Invalid credentials");
      }

      const passwordMatch = await bcryptjs.compare(
        c.password as string,
        userFound.password
      );

      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      return {
        id: userFound.id,
        name: userFound.name || "User",
        email: userFound.email,
      };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  // adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith("/auth");

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false;
    },
  },
});
