import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "USER") {
    redirect("/unauthorized");
  }

  return session.user;
}

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return session.user;
}
