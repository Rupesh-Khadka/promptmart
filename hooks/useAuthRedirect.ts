import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuthRedirect = (requiredRole: "USER" | "ADMIN") => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
    } else if (session.user.role !== requiredRole) {
      router.push("/unauthorized");
    }
  }, [status, session, router, requiredRole]);

  return { session, status };
};
