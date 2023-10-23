"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import InputTypeSelect from "@/components/inputs/InputTypeSelect";
import InputTypeSearch from "@/components/inputs/InputTypeSearch";
import ButtonType from "@/components/inputs/ButtonType";
import { nunito, poppins, roboto } from "@/utils/module";
import { useEffect, useState } from "react";
import InputTypeText from "@/components/inputs/InputTypeText";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.getColumn("title")?.setFilterValue(event.target.value);
  };

  useEffect(() => {}, []);

  return (
    <>
      {/* Search box start  */}
      <div className="flex flex-col items-start mb-5 bg-[#FFFFFE] rounded-md p-4 w-full max-w-7xl mx-auto shadow-md gap-6">
        <div className="flex items-start justify-between w-full">
          <h2 className="text-[#12130F] text-[16px]">Recherche des tâches</h2>
          <ButtonType label="Rechercher" />
        </div>
        <div className="flex items-start justify-between flex-wrap gap-3 w-full">
          <InputTypeSearch
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            changeHandler={handleOnChange}
          />
          <InputTypeSelect label="Nombre de followers" />
          <InputTypeSelect label="Nombre de vue" />
          <InputTypeSelect label="Catégorie" />
          <InputTypeSelect label="Audience age" />
          <InputTypeSelect label="Note" />
        </div>
      </div>
      {/* Search box end  */}
      {/* Table box Start  */}
      <div className="flex items-start flex-col w-full max-w-7xl mx-auto bg-[#FFFFFE] gap-4 p-4 rounded-md ">
        <div className="w-full flex justify-between  items-start">
          <h2 className="text-[#12130F] text-md text-[16px]">
            Liste des influenceurs
            <span className="ml-1 text-[#818181] text-xs">1250</span>
          </h2>
          <Dialog>
            <DialogTrigger className="rounded-lg bg-[#15A36E]  p-3 text-xs text-white hover:opacity-80">
              ({table.getFilteredSelectedRowModel().rows.length}) Sélécionné(s)
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader className="mb-10">
                <DialogTitle className={`${poppins.className} `}>
                  Choix de la campagne
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="flex items-start mt-10 flex-col gap-5">
                <label
                  className={`${nunito.className} flex flex-col gap-1 w-full text-xs text-[#818181]`}
                >
                  Nom de la campagne
                  <InputTypeSelect label="Automne hiver 2022 -20%" />
                </label>
                <label
                  className={`${nunito.className} flex flex-col gap-1 w-full text-xs text-[#818181]`}
                >
                  Budget par influenceurs
                  <InputTypeText label="20" />
                </label>
                <label
                  className={`${nunito.className} flex flex-col gap-1 w-full text-xs text-[#818181]`}
                >
                  Coût par actions
                  <InputTypeText label="20" />
                </label>
                <ButtonType label="Envoyer l'invitation" />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full rounded-md border">
          <Table>
            <TableHeader className={`${roboto.className} bg-[#F8F8F8]`}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="text-[#A6A6A6] text-sm"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className={`${nunito.className} hover:bg-[#F8F8F8] text-[#12130F] hover:cursor-pointer`}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        onClick={() => {
                          const itemId: any = cell.row.getValue("userId");

                          !cell.id.includes("_select") &&
                            !cell.id.includes("_actions") &&
                            router.push(`/author/${itemId}`);
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="w-full flex items-center justify-between mt-2">
          <Dialog>
            <DialogTrigger className="rounded-lg bg-[#15A36E]  p-3 text-xs text-white hover:opacity-80">
              ({table.getFilteredSelectedRowModel().rows.length}) Sélécionné(s)
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className={`${poppins.className} my-3`}>
                  Choix de la campagne
                </DialogTitle>
                <DialogDescription className="flex items-start mt-10 flex-col gap-5">
                  <label
                    className={`${nunito.className} flex flex-col gap-1 w-full text-xs text-[#818181]`}
                  >
                    Nom de la campagne
                    <InputTypeSelect label="Automne hiver 2022 -20%" />
                  </label>
                  <label
                    className={`${nunito.className} flex flex-col gap-1 w-full text-xs text-[#818181]`}
                  >
                    Budget par influenceurs
                    <InputTypeText label="20" />
                  </label>
                  <label
                    className={`${nunito.className} flex flex-col gap-1 w-full text-xs text-[#818181]`}
                  >
                    Coût par actions
                    <InputTypeText label="20" />
                  </label>
                  <ButtonType label="Envoyer l'invitation" />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-[#15A36E]"
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-[#15A36E]"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
