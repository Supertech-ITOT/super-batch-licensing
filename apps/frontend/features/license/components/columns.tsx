import { ColumnDef } from "@tanstack/react-table";
import { LicenseResponse } from "../types/license.types";
import { DialogProp } from "./license-view";
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

export const columns = (
  setDialog: React.Dispatch<React.SetStateAction<DialogProp>>,
): ColumnDef<LicenseResponse>[] => [
  {
    id: "srNo",
    header: "Sr.No",
    cell: ({ row }) => row.index + 1,
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "licenseNumber",
    header: "License Number",
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "customerName",
    header: "Customer",
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "planName",
    header: "Plan",
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "type",
    header: "Type",
    meta: {
      align: "center",
    },
    cell: ({ row }) => row.original.type,
  },

  {
    accessorKey: "status",
    header: "Status",
    meta: {
      align: "center",
    },
    cell: ({ row }) => row.original.status,
  },

  {
    accessorKey: "issueDate",
    header: "Issue Date",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const value = row.original.issueDate;

      if (!value || new Date(value).getTime() === 0) {
        return "-";
      }

      return format(new Date(value), "dd MMM yyyy");
    },
  },

  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const value = row.original.expiryDate;

      if (!value || new Date(value).getTime() === 0) {
        return "-";
      }

      return format(new Date(value), "dd MMM yyyy");
    },
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
