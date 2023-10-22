import React from "react";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="sticky top-0 left-0w-full flex justify-end px-4 items-center h-[70px] bg-[#FFFFFE] text-[#191F36] shadow-md">
      <div className="flex justify-center items-center gap-2 w-fit">
        <span>Jean David</span>
        <Image alt="Profile Photo" src="/profile.png" width={40} height={40} />
      </div>
    </header>
  );
}
