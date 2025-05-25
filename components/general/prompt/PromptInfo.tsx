"use client";
import { styles } from "@/utils/styles";

import React from "react";
import ReviewCard from "./ReviewCard";
import { Avatar, Divider, Tab, Tabs } from "@heroui/react";

type Props = {
  promptData: {
    description: string;
    reviews: any[];
    seller: {
      Shop: {
        avatar: string;
        name: string;
        allProduct: number;
        rating: number;
      } | null;
    };
  };
};

let tabs = [
  {
    title: "Description",
  },
  {
    title: "Reviews",
  },
  {
    title: "Author",
  },
];

const PromptInformation = ({ promptData }: Props) => {
  return (
    <div className="flex w-full flex-col bg-slate-900 p-3 rounded-md">
      <Tabs items={tabs} color="primary" variant="light">
        {(item) => (
          <Tab key={item.title} title={item.title} className="text-[16px]">
            <Divider className="bg-[#ffffff18]" />
            <div className="py-2">
              {item.title === "Description" && (
                <p
                  className={`text-[16px] font-[400] text-[#b1b0b6] font-Inter whitespace-pre-line w-full overflow-hidden`}
                >
                  {promptData?.description ?? "No description"}
                </p>
              )}
              {item.title === "Author" && (
                <>
                  <div className="flex w-full my-2 ">
                    <Avatar
                      size="lg"
                      className="bg-black"
                      src={promptData?.seller.Shop?.avatar}
                    />
                    <div>
                      <span
                        className={`text-[16px] font-Inter font-[500] pl-3 !text-xl text-white`}
                      >
                        @{promptData?.seller.Shop?.name}
                      </span>
                      <br />
                      <span
                        className={`text-[14px] text-[#b1b0b6] font-Inter font-[500] pl-3`}
                      >
                        Prompts: {promptData?.seller.Shop?.allProduct}
                      </span>
                      <br />
                      <span
                        className={`text-[14px] text-[#b1b0b6] font-Inter font-[500] pl-3`}
                      >
                        Reviews: {promptData?.seller.Shop?.rating} / 5
                      </span>
                    </div>
                  </div>
                </>
              )}

              {item.title === "Reviews" && (
                <div className="">
                  {promptData &&
                    promptData.reviews.map((item: any, index: number) => (
                      <ReviewCard item={item} key={index} />
                    ))}

                  {promptData?.reviews?.length === 0 && (
                    <h5 className={`${styles.paragraph} text-center py-5`}>
                      No Reviews have to show!
                    </h5>
                  )}
                </div>
              )}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default PromptInformation;
