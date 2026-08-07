import { ColumnDef } from "@tanstack/react-table";
import { CustomerResponse } from "../types/customer.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../common/components/ui/dropdown-menu";
import { Button } from "../../../common/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<CustomerResponse>[] = [
  { id: "srNo", header: "Sr.No", cell: ({ row }) => row.index + 1 },
  { accessorKey: "companyName", header: "Company Name" },
  { id: "email", header: "Email" },
  {
    id: "action",
    header: "Action",
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

            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
