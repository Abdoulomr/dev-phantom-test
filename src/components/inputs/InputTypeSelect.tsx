import React from "react";

interface InputTypeSearchProps {
  label: string;
}

export default function InputTypeSelect({ label }: InputTypeSearchProps) {
  return (
    <div className="px-2 py-2 items-center gap-2 text-[#818181] border-[1px] border-[#A6A6A6]  rounded-lg  text-xs ">
      <select className="border-none outline-none focus:outline-none w-full h-full">
        <option className="outline-none rounded-none text-xs" value="">
          {label}
        </option>
      </select>
    </div>
  );
}
