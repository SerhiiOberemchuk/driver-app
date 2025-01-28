import NextAuth from "next-auth";
// import Google from 'next-auth/providers/google';
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { connectDB } from "./app/lib/mongodb";
import User from "./app/models/User";

const providers: Provider[] = [
  // Google({
  //   clientId: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // }),
  Credentials({
    credentials: {
      email: { label: "Email Address", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(c) {
      if (!c.email) {
        console.log("type credentials");
        return null;
      }

      await connectDB();

      const userFound = await User.findOne({ email: c.email }).select(
        "+password"
      );

      const passwordMatch = await bcryptjs.compare(
        c.password as string,
        userFound.password
      );

      if (!passwordMatch) throw new Error("Wrong credentials");

      return {
        id: userFound._id,
        name: userFound.name || "User",
        email: String(c.email),
      };
    },
  }),
];

// if (!process.env.GOOGLE_CLIENT_ID) {
//   console.warn('Missing environment variable "GOOGLE_CLIENT_ID"');
// }
// if (!process.env.GOOGLE_CLIENT_SECRET) {
//   console.warn('Missing environment variable "GOOGLE_CLIENT_SECRET"');
// }

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,

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

      return false; // Redirect unauthenticated users to login page
    },
  },
});
