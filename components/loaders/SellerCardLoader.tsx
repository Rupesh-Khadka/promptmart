"use client";

import { Card, Skeleton } from "@heroui/react";
import React from "react";

const SellerCardLoader = () => {
  return (
    <Card
      radius="lg"
      className="p-4  bg-[#100d21] m-3 w-full md:w-[31%] 2xl:w-[23%] flex flex-col items-center text-white border border-[#ffffff22]"
    >
      <Skeleton className="rounded-full" style={{ width: 100, height: 100 }} />

      <div className="w-full mt-4">
        <Skeleton className="rounded-xl" style={{ height: 24 }} />
      </div>

      <div className="flex items-center space-x-2 my-4 w-full justify-center">
        <Skeleton className="rounded-xl" style={{ width: 100, height: 20 }} />
        <Skeleton className="rounded-xl" style={{ width: 100, height: 20 }} />
      </div>

      <div className="w-64">
        <Skeleton className="rounded-xl" style={{ height: 20 }} />
      </div>
    </Card>
  );
};

export default SellerCardLoader;
