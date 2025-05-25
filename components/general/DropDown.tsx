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
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineSwitchVertical } from "react-icons/hi";

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
          <Avatar
            className="size-[40px] cursor-pointer"
            src={user.image ?? ""}
            alt={user.name ?? "User"}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Action" variant="flat">
          <DropdownItem
            key="new"
            // className={!isSellerExist ? "hidden" : undefined}
            className={`${!isSellerExist && "hidden"}`}
          >
            <Link href="/my-shop" className="flex w-full items-center gap-2">
              <span className="text-[16px] font-Inter pl-2">
                Switching to Seller
              </span>
              <HiOutlineSwitchVertical className="size-4"/>
            </Link>
          </DropdownItem>

          <DropdownItem key="delete" className="text-danger" color="danger">
            <form action={SignOut}>
              <button
                type="submit"
                className="bg-transparent text-red-500 w-full text-[15px] font-Inter flex items-center gap-2 rounded-[8px]"
              >
                <AiOutlineLogout />
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
