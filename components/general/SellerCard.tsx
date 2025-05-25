"use client";

import { Avatar, Card } from "@heroui/react";
import React from "react";
import Ratings from "./Ratings";

type Props = {};

const SellerCard = (props: Props) => {
  return (
    <Card className="py-4 bg-[#100d21] m-3 w-full md:w-[31%] 2xl:w-[23%] flex flex-col items-center text-white border border-[#ffffff22]">
      <Avatar
        src="https://pixner.net/aikeu/assets/images/blog-details/a-one.png"
        alt="Seller Avatar"
        className="size-[80px]   "
      />
      <span className="text-xl py-2 text-[#b1b0b6] font-Inter font-[500]">
        @Shahriar
      </span>
      <div className="flex items-center">
        <span className="text-[16px] py-2 text-[#b1b0b6] font-Inter font-[500] pr-2">
          4.5/5
        </span>
        <Ratings rating={4.5} />
      </div>
      <span className="text-[16px] py-2 text-[#b1b0b6] font-Inter font-[500] ">
        Total Sales: 212
      </span>
    </Card>
  );
};

export default SellerCard;
