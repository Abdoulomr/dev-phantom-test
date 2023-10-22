import React from "react";

interface TableButtonProps {
  numberValue: number;
  label: string;
}

export default function TableButton({ numberValue, label }: TableButtonProps) {
  return (
    <button className="flex justify-center items-center gap-1 bg-[#15A36E] border-none rounded-lg text-white text-[12px] py-2 px-3 transition-opacity duration-200 hover:opacity-80">
      <span>({numberValue})</span>
      <span>{label}</span>
    </button>
  );
}
