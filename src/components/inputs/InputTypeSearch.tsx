import Image from "next/image";
import React from "react";

interface InputTypeSearchProps {
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputTypeSearch({
  value,
  changeHandler,
}: InputTypeSearchProps) {
  return (
    <div className="flex items-center gap-2 border-[1px] border-[#A6A6A6] px-2 rounded-lg  w-fit">
      <Image
        src="assets/search-icon.svg"
        alt="Search Icon"
        width={16}
        height={15}
      />
      <input
        className="text-xs h-full py-2 md:w-[300px] outline-none"
        value={value}
        onChange={changeHandler}
        type="search"
        placeholder="Mot clé"
      />
    </div>
  );
}
