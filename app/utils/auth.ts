import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER", 
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: {
          Shop: true,
          role: true,
          stripeCustomerId: true,
        },
      });
      // stripeCustomerId
      if (session.user) {
        session.user.role = dbUser?.role || "USER";
        session.user.shop = dbUser?.Shop || null;
        session.user.stripeCustomerId = dbUser?.stripeCustomerId || null;
      }
      return session;
    },
    async signIn({ user }) {
      // Check if user already has a role set
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (dbUser && !dbUser.role) {
        const userCount = await prisma.user.count();
        const role = userCount === 1 ? "ADMIN" : "USER"; // first user (including current) gets ADMIN
        await prisma.user.update({
          where: { email: user.email! },
          data: { role },
        });
      }

      return true;
    },
  },
});
