"use client";

import Image from "next/image";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import Ratings from "../Ratings";
import { Button, Chip } from "@heroui/react";
import { stripePaymentIntegration } from "@/app/action";
import { TbLoaderQuarter } from "react-icons/tb";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PromptDetailsCard = ({ promptData }: { promptData: any }) => {
  const [activeImage, setactiveImage] = useState(promptData?.promptImageUrl[0]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const tags = promptData?.tags;
  const tagsList = tags.split(",").map((tag: string) => tag.trim());

  const percentageDifference =
    ((promptData?.estimatedPrice - promptData?.price) /
      promptData?.estimatedPrice) *
    100;

  const promptDiscount = percentageDifference?.toFixed(0);

  const handleBuyNow = async () => {
    try {
      setLoading(true);
      await stripePaymentIntegration(promptData.id);
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("You cannot purchase your own product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1211023] p-3 w-full min-h-[50vh] shadow rounded-xl mt-8">
      <div className="w-full flex flex-wrap">
        <div className="md:w-[48%] w-full m-2">
          <div>
            <Image
              src={activeImage}
              width={500}
              height={500}
              className="rounded-xl w-full object-contain"
              alt=""
            />
          </div>
          <br />
          <div className="w-full flex">
            <Marquee>
              {promptData.promptImageUrl.map((image: string) => (
                <Image
                  src={image}
                  key={image}
                  onClick={() => setactiveImage(image)}
                  width={250}
                  height={250}
                  alt="Prompt Image "
                  className="m-2 cursor-pointer rounded-md"
                />
              ))}
            </Marquee>
          </div>
        </div>
        <div className="md:w-[48%] w-full m-2 p-2">
          <h1
            className={`text-[16px] text-[#b1b0b6] font-Inter font-[500] !text-2xl font-Monserrat`}
          >
            {promptData?.name}
          </h1>
          <br />
          <Chip className="bg-[#1f2d2b] rounded-md p-3 h-[35px]">
            <span
              className={`text-[16px]  font-Inter font-[500]!text-2xl !text-[#64ff4b] font-Monserrat`}
            >
              {promptDiscount}%
            </span>
          </Chip>
          <span
            className={`text-[16px] font-Inter font-[500] !text-2xl pl-2 text-white font-Monserat`}
          >
            Off
          </span>
          <div className="w-full flex items-center my-2 justify-between">
            <div>
              <span
                className={`text-[16px] text-[#b1b0b6] font-Inter font-[500]inline-block pt-4 !text-xl line-through`}
              >
                ${promptData?.estimatedPrice}
              </span>
              <span
                className={`text-[16px] font-Inter font-[500] inline-block pt-4 !text-xl text-white pl-3`}
              >
                ${promptData?.price}
              </span>
            </div>
            <Ratings rating={promptData?.rating} />
          </div>
          <br />
          <p className={`text-[16px] font-[400] text-[#b1b0b6] font-Inter`}>
            {promptData?.shortDescription}
          </p>
          <br />
          <div className="w-full">
            <span
              className={`text-[16px]  font-Inter font-[500] !text-2xl pl-2 text-white font-Monserrat`}
            >
              Tags
            </span>
            <br />
            <div className="w-full flex items-center flex-wrap my-2">
              {tagsList.map((tag: string) => (
                <Chip
                  className="bg-[#1e1c2f] rounded-full h-[35px] mr-2 my-2 2xl:mr-4 cursor-pointer"
                  key={tag}
                >
                  <span
                    className={`text-[16px] font-Inter font-[500] !text-xl text-white font-Monserrat`}
                  >
                    {tag}
                  </span>
                </Chip>
              ))}
            </div>
            <br />

            <Button
              onClick={handleBuyNow}
              disabled={loading} // 🔹 Disable during loading
              radius="full"
              className={`th-[45px] font-[400] bg-[#64ff4b] !text-indigo-900 md:ml-2 ext-[18px] p-5  font-Inter rounded-[8px]  ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <TbLoaderQuarter className="w-4 h-4 animate-spin " />
                  <span>Buying</span>
                </>
              ) : (
                `Buy now $${promptData?.price}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailsCard;
