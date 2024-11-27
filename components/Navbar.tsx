"use client";
import React, { useEffect } from "react";
import LogoComponent from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwicher from "./ThemeSwicher";
import { UserButton } from "@clerk/nextjs";

const NavbarComponent = () => {
  const NavigationRoot = [
    { name: "Dashboard", link: "/" },
    { name: "Transaction", link: "/transaction" },
    { name: "Manage", link: "/manage" },
  ];

  const pathName = usePathname();
  const [activePath, setActivePath] = React.useState("");

  //useEffect hook to get the current path name
  useEffect(() => {
    setActivePath(pathName);
  }, [pathName]);

  console.log(pathName);
  return (
    <div className="flex h-20 px-8 justify-between outline outline-1 outline-gray-300">
      <div className="flex items-center gap-3">
        <LogoComponent />
        {NavigationRoot.map((nav, i) => {
          return (
            <div className="flex flex-col" key={i}>
              <Link
                href={nav.link}
                className="text-gray-800 hover:bg-gray-200 rounded-xl px-3 py-2 text-xl font-bold"
              >
                {nav.name}
              </Link>
              {activePath === nav.link ? (
                <div className="w-full h-[2px] bg-black relative -bottom-5 " />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3">
        <ThemeSwicher />
        <UserButton />
      </div>
    </div>
  );
};

export default NavbarComponent;
