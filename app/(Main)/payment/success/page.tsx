"use client";
// import { requireUser } from "@/app/utils/requireUser";
import { Button, Card } from "@heroui/react";

import Link from "next/link";
import { BiCheck } from "react-icons/bi";

export default function PaymentSuccess() {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex items-center justify-center ">
            <BiCheck className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Successfull</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              Congrats your payment was successfull. Your order for prompt has
              placed.
            </p>
            <Button className="w-full mt-5 ">
              <Link href="/">Go back to Home Page</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
