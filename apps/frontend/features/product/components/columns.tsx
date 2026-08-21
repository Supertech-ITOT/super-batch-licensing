"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductResponse } from "../types/product.types";
import { DialogProp } from "./product-view";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { Button } from "@/common/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const productColumns = (
  setDialog: React.Dispatch<React.SetStateAction<DialogProp>>,
): ColumnDef<ProductResponse>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "code",
    header: "Product Code",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "-",
  },
  {
    id: "lastModified",
    header: "Last Modified",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const value = row.original.updatedAt || row.original.createdAt;

      if (!value || new Date(value).getTime() === 0) {
        return "-";
      }

      return format(new Date(value), "dd MMM yyyy hh:mm a");
    },
  },
  {
    id: "action",
    header: "Action",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setDialog({ action: "edit", id: product.id, open: true });
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                setDialog({ action: "delete", id: product.id, open: true });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
