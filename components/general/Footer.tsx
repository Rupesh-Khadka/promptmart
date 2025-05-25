import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="mt-8">
      <div className="w-full mb-5 flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <h1 className="font-Inter text-3xl cursor-pointer">
              <span className="text-[#64ff4c]">Prompt</span>Mart
            </h1>
          </Link>
        </div>
        <div>
          <ul className="flex items-center flex-wrap">
            <li>
              <Link
                href="/"
                className={`text-[16px] text-[#b1b0b6] font-Inter font-[500] hover:text-[#64ff4b] duration-200 transition px-4`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/marketplace"
                className={`text-[16px] text-[#b1b0b6] font-Inter font-[500] hover:text-[#64ff4b] duration-200 transition px-4`}
              >
                MarketPlace
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={`text-[16px] text-[#b1b0b6] font-Inter font-[500] hover:text-[#64ff4b] duration-200 transition px-4`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p
        className={` text-[18px] font-[400] text-[#b1b0b6] font-Inter text-center`}
      >
        Copyright © {new Date().getFullYear()} PromptMart . All Rights Reserved
      </p>
      <br />
      <br />
    </div>
  );
};

export default Footer;
