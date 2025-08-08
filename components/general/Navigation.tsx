import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Marketplace", href: "/marketplace" },
  { title: "Contact Us", href: "/contact" },
  { title: "Policy", href: "/policy" },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="block md:flex cursor-pointer">
      {NavItems.map((item, index) => (
        <div key={index}>
          <Link href={item.href} key={item.href}>
            <h5
              className={`inline-block md:px-4 xl:px-8 py-5 md:py-0 text-[18px] font-[500] font-Inter ${
                pathname === item.href ? "text-[#6dff4b]" : ""
              }`}
            >
              {item.title}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
