import ButtonType from "@/components/inputs/ButtonType";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getData(param: string): Promise<Todo[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${param}`
  );
  const data = await res.json();
  return data;
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: { authorId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData(params.authorId);
  return (
    <div className="flex flex-col items-start box-border overflow-hidden mb-3 bg-[#FFFFFE] max-w-7xl mx-auto rounded-md p-4 w-full shadow-md gap-6">
      {data.length > 0 ? (
        <div className="flex items-start flex-col gap-4 justify-between w-full">
          <div className="flex  items-start justify-between w-full">
            <div className="flex items-start gap-1 justify-center w-fit h-full">
              <Image
                src="/profile.png"
                alt="user profile image"
                width={60}
                height={60}
              />
              <div className="h-full text-xs w-fit flex flex-col gap-1">
                <span className=" font-bold">Jean David {params.authorId}</span>
                <span className="text-[#818181]">
                  @jeandavid{params.authorId}
                </span>
                <span className="text-[#1D8DF4]">vérifié</span>
              </div>
            </div>
            <button className="bg-[#15A36E] text-white text-xs px-7 rounded-lg !py-2 hover:opacity-80">
              Inviver
            </button>
          </div>
          <div className="flex justify-around md:justify-between gap-10 flex-wrap md:flex-nowrap w-full">
            <div className="flex flex-col w-full justify-between gap-3 items-start">
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Genre</small>
                <span className="text-xs">Homme</span>
              </div>
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Location</small>
                <span className="text-xs">Ile-de-france</span>
              </div>
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Pays</small>
                <span className="text-xs">France</span>
              </div>
            </div>
            <div className="flex flex-col flex-wrap w-full justify-around gap-3 items-start">
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Note</small>
                <span className="text-xs">15 &#11044;</span>
              </div>
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Catégorie</small>
                <span className="text-xs">Ile-de-france</span>
              </div>
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Taux de conversion</small>
                <span className="text-xs">France</span>
              </div>
            </div>
            <div className="flex flex-col w-full justify-around gap-3 items-start">
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Note</small>
                <span className="text-xs">15 &#11044;</span>
              </div>
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Catégorie</small>
                <span className="text-xs">Ile-de-france</span>
              </div>
              <div className="flex items-center w-full justify-between">
                <small className="text-[#818181]">Taux de conversion</small>
                <span className="text-xs">France</span>
              </div>
            </div>
            <div className="flex flex-col w-full justify-end gap-1 items-end">
              <div className="flex gap-1 items-center ">
                <span className="text-[#12130f] font-extrabold text-5xl">
                  7%
                </span>
                <span className="text-[8px] font-bold bg-[#DAFFDE] px-[3px] py-[4px] rounded-sm text-[#3EDA44]">
                  12%
                </span>
              </div>
              <p className="text-xs ">Taux d’engagement</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between flex-wrap gap-3 w-full">
          Failed to get User
        </div>
      )}
    </div>
  );
}
