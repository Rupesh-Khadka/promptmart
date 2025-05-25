// components/general/shop/ShopSideBar.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GoHome, GoArrowSwitch } from "react-icons/go";
import { BsWallet2 } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const sideBarItems = [
  { icon: <GoHome />, title: "Dashboard", href: "/my-shop" },
  {
    icon: <MdOutlineCreateNewFolder />,
    title: "Upload Prompt",
    href: "/my-shop/create-prompt",
  },
  { icon: <BsWallet2 />, title: "Prompts", href: "/my-shop/prompts" },
  { icon: <TbMoneybag />, title: "Orders", href: "/my-shop/orders" },
  {
    icon: <LiaFileInvoiceDollarSolid />,
    title: "Invoices",
    href: "/my-shop/invoices",
  },
  {
    icon: <BiMoneyWithdraw />,
    title: "Withdraw Earnings",
    href: "/my-shop/withdraw",
  },
  { icon: <GoArrowSwitch />, title: "Switch to user", href: "/" },
];

export function ShopSideBar() {
  const pathname = usePathname();

  return (
    <nav className="w-full mx-5 ">
      <div>
        <Link href="/">
          <h1 className="font-Inter text-3xl mt-12">
            <span className="text-[#64ff4c] ">Prompt</span>Mart
          </h1>
        </Link>
      </div>
      {sideBarItems.map((item, index) => {
        const isActive = pathname === item.href;
        const textColor = isActive ? "text-[#858DFB]" : "text-white";
        return (
          <Link href={item.href} key={index}>
            <div className="flex items-center my-10 cursor-pointer gap-4">
              <div className={`text-3xl ${textColor}`}>{item.icon}</div>
              <span
                className={`text-[16px] font-medium font-Inter ${textColor}`}
              >
                {item.title}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
