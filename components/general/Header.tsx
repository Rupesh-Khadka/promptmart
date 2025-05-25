"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import DropDown from "./DropDown";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type Props = {
  activeItem: number;
  user?: User;
  isSellerExist: boolean | null;
};

const Header = ({ activeItem, user, isSellerExist }: Props) => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id == "screen") {
      setOpen(!open);
    }
  };

  return (
    <div
      className={`w-full p-5 border-b min-h-[60px] border-b-[#ffffff32]  transition-opacity ${
        active && "fixed top-0 left-0 bg-[#000] z-[999]"
      }`}
    >
      <div className="hidden md:w-[90%] mx-auto md:flex items-center justify-between ">
        <div>
          <Link href="/">
            <h1 className="font-Inter text-3xl ">
              <span className="text-[#64ff4c] ">Prompt</span>Mart
            </h1>
          </Link>
        </div>

        <div className="flex ">
          <Navigation activeItem={activeItem} />
        </div>

        <div className="flex items-center ml-10">
          <AiOutlineSearch className="text-[25px] mr-5 cursor-pointer" />

          {/* Auth */}

          {user ? (
            <div className="">
              {/* <Avatar src={user.image || undefined} /> */}
              <DropDown user={user} isSellerExist={isSellerExist} />
            </div>
          ) : (
            <Link href="/login">
              <CgProfile className="text-[25px]" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="w-full md:hidden flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="font-Inter text-3xl ">
              <span className="text-[#64ff4c] ">Prompt</span>Mart
            </h1>
          </Link>
        </div>
        <div>
          <FaBars
            className="text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        {open && (
          <div
            id="screen"
            onClick={handleClose}
            className="fixed md:hidden w-full h-screen top-0 left-0 z-[9999] bg-[unset]"
          >
            <div className="fixed bg-black h-screen top-0 right-0 w-[60%] z-[999]">
              <div className="mt-20 p-5">
                {user ? (
                  <div className="">
                    {/* <Avatar src={user.image || undefined} /> */}
                    <DropDown user={user} isSellerExist={isSellerExist} />
                  </div>
                ) : (
                  <Link href="/login">
                    <CgProfile className="text-[25px]" />
                  </Link>
                )}
                <Navigation activeItem={activeItem} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
