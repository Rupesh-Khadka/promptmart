"use client";
 
import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="w-full relative grid md:grid-cols-2 md:py-8">
      <div className="col-span-1 w-full md:w-[60%] md:mt-5 px-5 md:px-[unset]">
        <Chip
          className={`text-[18px] p-5 font-[600] font-Inter rounded-[8px] text-white mb-[30px] h-[37px] bg-[#12211f] border`}
        >
          AI Image
        </Chip>
        <h5 className="text-4xl font-[700] font-Inter text-white mb-5 leading-[50px]">
          Crafting Tomorrow&apos;s Images with Artificial Intelligence
        </h5>
        <p className="text-[18px] font-[400] text-[#b1b0b6] font-Inter pb-5">
          AI image generation tools have emerged as powerful resources in the
          realm of digital art and design. These cutting-edge tools leverage
          advanced.
        </p>

        <Button className="text-[18px] p-5 font-Inter rounded-[8px] text-white bg-[#2551b0] font-[500] h-[45px]">
          Visit Shop
        </Button>
      </div>

      <div className="col-span-1 my-10 md:mt-[unset]">
        <Image
          src={"https://pixner.net/aikeu/assets/images/craft-thumb.png"}
          alt=""
          width={600}
          height={600}
          priority
        />
      </div>
    </div>
  );
};

export default About;
