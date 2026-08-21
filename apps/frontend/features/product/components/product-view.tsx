import { useState } from "react";
import { useGetAllProducts } from "../hooks/use-product";
import FeedbackState from "@/common/components/feedback-state";
import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import { productColumns } from "./columns";

export type DialogProp = {
  action: "create" | "edit" | "delete" | null;
  id: number | null;
  open: boolean;
};
export default function ProductView() {
  const { data: customers, isLoading, isError } = useGetAllProducts();
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
  if (!customers) {
    return <FeedbackState variant="empty" />;
  }
  return (
    <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
      <DataTable
        columns={productColumns(setDialog)}
        data={customers}
        pageSize={10}
        toolbar={(table) => (
          <div className="flex items-center gap-2">
            <DataTableSearch
              table={table}
              column="companyName"
              placeholder="Search customers..."
            />
            <Button
              className="ml-auto text-white h-8 sm:h-10"
              onClick={() =>
                setDialog({ action: "create", id: null, open: true })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        )}
      />
    </div>
  );
}
