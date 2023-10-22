import React from "react";

interface InputTypeTextProps {
  label: string;
}

export default function InputTypeText({ label }: InputTypeTextProps) {
  return (
    <input
      className=" w-full outline-none px-2 py-2 items-center gap-2 text-[#818181] border-[1px] border-[#A6A6A6]  rounded-lg  text-xs "
      type="text"
      placeholder={label}
    />
  );
}
