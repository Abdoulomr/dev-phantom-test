"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { HTMLProps } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Profile = {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
};

const x = {
  userId: 1,
  id: 2,
  title: "quis ut nam facilis et officia qui",
  completed: false,
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

export const columns: ColumnDef<Profile>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllPageRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllPageRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Profile",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src="/profile.png" />
          <Skeleton className="h-12 w-12 bg-slate-100 rounded-full" />
        </Avatar>
      );
    },
  },

  {
    accessorKey: "title",
    header: "Description",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => {
      const completion = row.getValue("completed");
      return completion ? (
        <span className="text-sm line-through opacity-70">completed</span>
      ) : (
        <span className="text-sm">to do !</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
            <DropdownMenuItem
              className="hover:cursor-pointer hover:bg-slate-50"
              onClick={() =>
                navigator.clipboard.writeText(user.userId.toString())
              }
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View description</DropdownMenuItem>
            <DropdownMenuItem>View user details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
