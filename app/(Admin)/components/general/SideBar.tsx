"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./sidebar/AdminSideBar";
import { usePathname } from "next/navigation";

type Props = {
  activeItem: string;
  data: {
    image?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
};

export default function Sidebar({ activeItem, data }: Props) {
  const pathname = usePathname();
  const [selected, setSelected] = useState(activeItem);

  useEffect(() => {
    if (pathname.includes("/admin/users")) setSelected("Users");
    else if (pathname.includes("/admin/shops")) setSelected("Shops");
    else if (pathname.includes("/admin/invoices")) setSelected("Invoices");
    else if (pathname.includes("/admin/prompts")) setSelected("All Prompts");
    else if (pathname.includes("/admin/withdraw-requests"))
      setSelected("Withdraw requests");
    else if (pathname === "/admin") setSelected("Dashboard");
    else setSelected("");
  }, [pathname]);

  return (
    <div>
      <AdminSidebar selected={selected} setSelected={setSelected} user={data} />
    </div>
  );
}
