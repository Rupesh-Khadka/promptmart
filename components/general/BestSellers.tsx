import React from "react";
import SellerCard from "./SellerCard";

type Sellers = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let hasLoaded = false;

const BestSellers = ({ sellers }: { sellers: Sellers }) => {
  if (!hasLoaded) {
    throw delay(1000).then(() => {
      hasLoaded = true;
    });
  }

  return (
    <div className="mb-10 cursor-pointer w-full">
      <h1 className="text-4xl font-[700] p-2 mb-5 font-Monserrat text-white">
        Top Sellers
      </h1>
      <div className="flex flex-wrap">
        <SellerCard seller={sellers} />
      </div>
    </div>
  );
};

export default BestSellers;
