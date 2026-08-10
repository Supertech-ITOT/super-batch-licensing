import { ColumnDef } from "@tanstack/react-table";
import { PlanResponse } from "../types/plan.types";
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
import { DialogProp } from "./plan-view";

export const columns = (
  setDialog: React.Dispatch<React.SetStateAction<DialogProp>>,
): ColumnDef<PlanResponse>[] => [
  {
    id: "srNo",
    header: "Sr.No",
    cell: ({ row }) => row.index + 1,
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "code",
    header: "Code",
    meta: {
      align: "center",
    },
    cell: ({ row }) => row.original.code,
  },
  {
    accessorKey: "description",
    header: "Description",
    meta: {
      align: "center",
    },
    cell: ({ row }) => row.original.description || "-",
  },
  {
    accessorKey: "durationMonths",
    header: "Duration",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const months = row.original.durationMonths;
      return (
        <>
          {months} {months === 1 ? "Month" : "Months"}
        </>
      );
    },
  },
  {
    accessorKey: "maxUsers",
    header: "Max Users",
    meta: {
      align: "center",
    },
    cell: ({ row }) => row.original.maxUsers,
  },
  {
    accessorKey: "price",
    header: "Price",
    meta: {
      align: "center",
    },
    cell: ({ row }) => row.original.price.toLocaleString("en-IN"),
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
      const customer = row.original;
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
                setDialog({ action: "edit", id: customer.id, open: true });
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                setDialog({ action: "delete", id: customer.id, open: true });
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
