import { UserRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
    shop?: Shop | null;
    stripeCustomerId?: string | null;
  }

  interface Session {
    user: User;
  }
}
