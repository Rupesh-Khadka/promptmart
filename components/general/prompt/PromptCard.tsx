"use client";

import { Avatar, Button, Card, Divider } from "@heroui/react";
import Image from "next/image";
import React from "react";
import Ratings from "../Ratings";
import Link from "next/link";

interface Prompt {
  prompt: {
    id: string;
    name: string;
    price: number;
    category: string;
    seller: {
      name: string | null;
      image: string | null;
    };
    rating: number;
    orders: any[];
    reviews: any[];
    promptImageUrl: string[];
    promptFileUrl: string;
    tags: string;
  };
}

const PromptCard = ({ prompt }: Prompt) => {
  return (
    <Card
      radius="lg"
      className="w-full md:w-[31%] 2xl:w-[23%] max-h-[410px] p-4 bg-[#130f23] m-3"
    >
      <div className="relative">
        <Image
          src={prompt?.promptImageUrl[0]}
          alt="Prompt Image"
          className="w-full !max-h-[200px] object-cover rounded-xl"
          width={300}
          height={300}
        />
        <div className="absolute bottom-2 left-2">
          <div className="w-max bg-black hover:bg-[#16252] duration-300 transition-opacity hover:text-black text-white p-[10px] items-center flex rounded-xl">
            {prompt?.category === "Chatgpt" ? (
              <Image
                src="https://pixner.net/aikeu/assets/images/category/chat.png"
                width={20}
                height={20}
                alt="ChatGpt Icon"
              />
            ) : (
              <p className="">
                {prompt?.category === "Dalle" ? (
                  "⛵"
                ) : (
                  <>
                    {prompt?.category === "Midjourney" ? (
                      "🎨"
                    ) : (
                      <>{prompt?.category === "Bard" ? "🐥" : null}</>
                    )}
                  </>
                )}
              </p>
            )}
            <span
              className={`text-[14px] font-Inter font-[400] pl-2 text-white`}
            >
              {prompt?.category}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between py-2">
        <h3 className={`font-Inter font-[500] text-[18px] text-white`}>
          {prompt?.name}
        </h3>
        <p className={`text-[18px] font-[400] text-[#b1b0b6] font-Inter`}>
          ${prompt?.price}
        </p>
      </div>
      <Divider className="bg-[#ffffff18] my-2" />
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Avatar src={prompt?.seller?.image || "N/A"} />
          <span
            className={`text-[16px] text-[#b1b0b6] font-Inter font-[500] pl-3`}
          >
            @{prompt?.seller?.name}
          </span>
        </div>
        <Ratings rating={prompt?.rating} />
      </div>
      <br />
      <Link href={`/prompt/${prompt.id}`} className="w-full">
        <div
          className={`text-[18px] p-5 font-Inter rounded-[8px] !py-2 !px-3 text-center mb-3 w-full text-white bg-transparent border border-[#16c252] hover:bg-[#16c252] hover:text-black duration-300 transition-opacity font-Inter font-[600]`}
        >
          Get Prompts
        </div>
      </Link>
    </Card>
  );
};

export default PromptCard;
