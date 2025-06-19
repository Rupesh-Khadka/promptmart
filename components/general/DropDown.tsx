import { SignOut } from "@/app/utils/signOut";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import { GrDocumentStore } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import Image from "next/image";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

type Props = {
  user: User;
  isSellerExist: boolean | null;
};

const DropDown = ({ user, isSellerExist }: Props) => {
  return (
    <div>
      <Dropdown className="bg-black text-white">
        <DropdownTrigger>
          <Image
            className="size-[40px] cursor-pointer"
            priority
            height={500}
            width={500}
            src={user.image ?? ""}
            alt={user.name ?? "User"}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Action" variant="flat">
          <DropdownItem key="my-orders" className="w-full h-full m-0 p-0">
            <Link
              href="/my-orders"
              className="flex w-full h-full items-center gap-2 p-1.5 hover:text-white"
            >
              <GrDocumentStore className="size-4" />
              <span className="text-[16px] font-Inter ">My Orders</span>
            </Link>
          </DropdownItem>

          <DropdownItem
            key="new"
            // className={!isSellerExist ? "hidden" : undefined}
            className={`${!isSellerExist && "hidden"} m-0 p-0`}
          >
            <Link
              href="/my-shop"
              className="flex w-full h-full items-center gap-2 p-1.5 hover:text-white"
            >
              <HiOutlineSwitchVertical className="size-4" />
              <span className="text-[16px] font-Inter">
                Switching to Seller
              </span>
            </Link>
          </DropdownItem>

          <DropdownItem
            key="delete"
            className="text-danger m-0 p-0"
            color="danger"
          >
            <form action={SignOut}>
              <button
                type="submit"
                className="bg-transparent text-red-500 w-full text-[16px] font-Inter flex items-center gap-2 p-1.5 rounded-[8px] cursor-pointer"
              >
                <AiOutlineLogout className="size-4" />
                Log out
              </button>
            </form>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropDown;
