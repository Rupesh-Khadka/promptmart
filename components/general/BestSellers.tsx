import React from "react";
import SellerCard from "./SellerCard";

type Props = {};

const BestSellers = (props: Props) => {
  return (
    <div className="mb-10 cursor-pointer w-full">
      <h1 className="text-4xl font-[700] p-2 mb-5 font-Monserrat text-white">
        Top Sellers
      </h1>
      <div className="flex flex-wrap">
        {Array.from({ length: 5 }, (currentItem, i) => (
          <SellerCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
