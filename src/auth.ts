import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

console.log("auth.ts LOADED");

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing Credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        });

        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(
          String(credentials.password),
          user.password
        );
        if (!match) throw new Error("Wrong password");

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
