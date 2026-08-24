import { ColumnDef } from "@tanstack/react-table";
import { LicenseResponse } from "../types/license.types";
import { DialogProp } from "./license-view";
import { format } from "date-fns";
import LicenseActions from "./license-actions";
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
    accessorKey: "productName",
    header: "Product",
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
    cell: ({ row }) => (
      <LicenseActions license={row.original} setDialog={setDialog} />
    ),
  },
];
