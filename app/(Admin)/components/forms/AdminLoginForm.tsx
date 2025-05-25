import * as React from "react";
import type { SVGProps } from "react";

import { redirect } from "next/navigation";
import { Button } from "@heroui/button";
// import { auth, signIn } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";

const Google = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 256 262"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    />
  </svg>
);

export async function AdminLoginForm() {
  // const session = await auth();
  // // // console.log(session);
  // if (session?.user && session.user.role == "ADMIN") {
  //   return redirect("/admin/login");
  // }

  return (
    <div className="flex flex-col gap-6 font-Inter">
      <div className="bg-foreground-900/75 p-6 border border-foreground-600 rounded-2xl space-y-2">
        <div className="text-center  ">
          <h1 className="text-2xl font-medium ">Welcome Back!</h1>
          <p className="text-sm text-foreground-400 py-2">
            Admin Login in with your Google
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-4 pt-1">
            <form
              action={async () => {
                "use server";
                // await signIn("google", {
                //   redirectTo: "/admin",
                // });
                // const user = await auth();
                // const user = res?.user;
                // if (user) {
                //   await prisma.user.update({
                //     where: {
                //       email: user.user?.email as string,
                //     },
                //     data: {
                //       isAdmin: true,
                //     },
                //   });
                // }
              }}
            >
              <Button
                type="submit"
                className="w-full bg-transparent border border-foreground-600 text-white rounded-md hover:bg-foreground-800 font-Inter"
              >
                <span>
                  <Google />
                </span>{" "}
                Login with Google
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
