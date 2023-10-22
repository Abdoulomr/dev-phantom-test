import React from "react";

interface ButtonTypeType {
  label: string;
}
export default function ButtonType({ label }: ButtonTypeType) {
  return (
    <button className="bg-[#15A36E] border-none rounded-md text-white text-[12px] py-2 px-6 transition-opacity duration-200 hover:opacity-80">
      {label}
    </button>
  );
}
