import { Poppins } from "next/font/google";
import { Profile, columns } from "./columns";
import { DataTable } from "./data-table";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });

async function getData(): Promise<Profile[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();

  return data;
}

export default async function page() {
  const data = await getData();
  return (
    <>
      <h2 className={`${poppins.className} mb-1 w-full max-w-7xl mx-auto`}>
        Influenceurs
      </h2>
      <DataTable columns={columns} data={data} />
    </>
  );
}
