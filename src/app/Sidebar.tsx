"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nunito } from "@/utils/module";

interface SidebarProps {
  sideBarVisible: boolean;
  setSideBarVisible: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  sideBarVisible,
  setSideBarVisible,
}: SidebarProps) {
  const navItems = [
    {
      id: 1,
      label: "Tableau de bord",
      link: "/dashboard",
      icon: "/dashboard.svg",
    },
    { id: 2, label: "Campagnes", link: "/campains", icon: "/campains.svg" },
    {
      id: 3,
      label: "Influenceurs",
      link: "/influencers",
      icon: "/influencers.svg",
    },
    { id: 4, label: "Activités", link: "/activities", icon: "/activities.svg" },
    {
      id: 5,
      label: "Conversations",
      link: "/conversations",
      icon: "/conversations.svg",
    },
  ];

  const pathName = usePathname();

  const displayLinks = navItems.map((item) => {
    return (
      <li
        key={item.id}
        className={`${
          pathName === item.link &&
          "!bg-[#F1FFFA] !text-[#15A36E] border-l-4 border-[#15A36E] "
        } ${
          nunito.className
        } ml-0 !w-full  flex flex-row justify-b items-center gap-[10px] pl-[30px] py-2 border-l-4 border-[#F1FFFA]`}
      >
        <Image
          className={`${pathName === item.link && " !fill-[#15A36E]"}  `}
          priority
          alt="Link icon"
          width={25}
          height={25}
          src={`/assets${item.icon}`}
        />
        <Link
          className={`${
            pathName === item.link && "!text-[#15A36E]"
          } text-[#818181]`}
          href={item.link}
        >
          {item.label}
        </Link>
      </li>
    );
  });
  return (
    <section
      className={`fixed flex z-50 flex-col items-center !px-0 top-0 transition-all duration-300 ease-in-out left-[-100%] md:left-0 w-[250px] h-full  bg-[#FFFFFE] ${
        sideBarVisible ? "!left-0" : "!left-[-250px]"
      }`}
    >
      <div
        onClick={() => setSideBarVisible(!sideBarVisible)}
        className={`absolute  !bg-[#F1FFFA] shadow-lg rounded-full p-3  top-20 hover:cursor-pointer hover:shadow-xl ${
          sideBarVisible ? "right-1" : "right-[-50px] rotate-180"
        }`}
      >
        <Image
          className="rotate-90 w-auto h-auto font-bold"
          src="/arrow.svg"
          alt="arrow menu toggler icon"
          width={20}
          height={20}
        />
      </div>
      <Link className="p-[35px]" href="/">
        <Image alt="DevPhantom logo" width={100} height={116} src="/logo.svg" />
      </Link>
      <nav className="!w-full flex px-0 m-0 flex-col justify-between h-full ">
        <ul className="!w-full flex flex-col items-start p-0 box-border">
          {displayLinks}
        </ul>

        <div className={`${nunito.className} w-full`}>
          <div className=" !w-full box-border flex justify-start items-center gap-[10px] px-[30px] py-2 text-[#818181] hover:cursor-pointer border-l-4 border-[#F1FFFA]">
            <Image
              priority
              alt="Link icon"
              width={25}
              height={25}
              src="/assets/params.svg"
            />
            <span>Paramètres</span>
          </div>
          <div className=" !w-full box-border flex justify-start items-center gap-[10px] px-[30px] py-3 text-[#818181] hover:cursor-pointer border-l-4 border-[#F1FFFA]">
            <Image
              priority
              alt="Link icon"
              width={25}
              height={25}
              src="/assets/disconnect.svg"
            />
            <span>Déconnexion</span>
          </div>
        </div>
      </nav>
    </section>
  );
}
