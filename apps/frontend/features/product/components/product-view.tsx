"use client";

import { useState } from "react";
import { useGetAllProducts } from "../hooks/use-product";
import FeedbackState from "@/common/components/feedback-state";
import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import { productColumns } from "./columns";
import CreateProductDialog from "./create-product-dialog";
import UpdateProductDialog from "./update-product-dialog";
import DeleteProductDialog from "./delete-product-dialog";

export type DialogProp = {
  action: "create" | "edit" | "delete" | null;
  id: number | null;
  open: boolean;
};
export default function ProductView() {
  const { data: products, isLoading, isError } = useGetAllProducts();
  const [dialog, setDialog] = useState<DialogProp>({
    action: null,
    id: null,
    open: false,
  });
  const closeDialog = () => setDialog({ open: false, action: null, id: null });
  const loading = isLoading;
  if (loading) {
    return;
  }
  if (isError) {
    return <FeedbackState variant="error" />;
  }
  if (!products) {
    return <FeedbackState variant="empty" />;
  }
  return (
    <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
      <DataTable
        columns={productColumns(setDialog)}
        data={products}
        pageSize={15}
        toolbar={(table) => (
          <div className="flex items-center gap-2">
            <DataTableSearch
              table={table}
              column="name"
              placeholder="Search products..."
            />
            <Button
              className="ml-auto text-white h-8 sm:h-10"
              onClick={() =>
                setDialog({ action: "create", id: null, open: true })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        )}
      />
      {
        <>
          {dialog.action === "create" && (
            <CreateProductDialog open onClose={closeDialog} />
          )}
          {dialog.action === "edit" && dialog.id != null && (
            <UpdateProductDialog
              open={dialog.open}
              productId={dialog.id}
              onClose={closeDialog}
            />
          )}
          {dialog.action === "delete" && dialog.id != null && (
            <DeleteProductDialog
              open={dialog.open}
              productId={dialog.id}
              onClose={closeDialog}
            />
          )}
        </>
      }
    </div>
  );
}
