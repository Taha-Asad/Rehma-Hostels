import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },

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

    authorized({ auth, request }) {
      // not logged in
      if (!auth?.user) return false;

      // admin route check
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

      if (isAdminRoute && auth.user.role !== "ADMIN") {
        return false;
      }

      return true;
    },
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
          select: { id: true, email: true, password: true, role: true },
        });

        if (!user) throw new Error("User not found");

        if (!user || !user.password)
          throw new Error("User or password not found");

        const match = await bcrypt.compare(
          String(credentials.password), // password from input
          String(user.password) // ensure it's string
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
});
