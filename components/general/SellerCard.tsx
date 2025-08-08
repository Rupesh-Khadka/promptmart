"use client";

import { Avatar, Card } from "@heroui/react";
import React from "react";
import Ratings from "./Ratings";

type Seller = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
};

const SellerCard = ({ seller }: { seller: Seller }) => {
  return (
    <Card className="py-4 bg-[#100d21] m-3 w-full md:w-[31%] 2xl:w-[23%] flex flex-col items-center text-white border border-[#ffffff22]">
      <Avatar
        src={seller.avatar}
        alt={`${seller.name} Avatar`}
        className="size-[80px]"
      />
      <span className="text-xl py-2 text-[#b1b0b6] font-Inter font-[500]">
        @{seller.name}
      </span>
      <div className="flex items-center">
        <span className="text-[16px] py-2 text-[#b1b0b6] font-Inter font-[500] pr-2">
          {seller.rating?.toFixed(1)}/5
        </span>
        <Ratings rating={seller.rating} />
      </div>
      <span className="text-[16px] py-2 text-[#b1b0b6] font-Inter font-[500]">
        Total Sales: {seller.totalSales}
      </span>
    </Card>
  );
};

export default SellerCard;
