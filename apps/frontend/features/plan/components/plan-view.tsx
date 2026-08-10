"use client";

import { useState } from "react";
import { useGetAllPlans } from "../hooks/use-plan";
import FeedbackState from "@/common/components/feedback-state";
import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import CreatePlanDialog from "./create-plan-dialog";
import UpdatePlanDialog from "./update-plan-dialog";

export type DialogProp = {
  action: "create" | "edit" | "delete" | null;
  id: number | null;
  open: boolean;
};

export default function PlanView() {
  const { data: plans, isLoading, isError } = useGetAllPlans();
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
  if (!plans) {
    return <FeedbackState variant="empty" />;
  }
  return (
    <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
      <DataTable
        columns={columns(setDialog)}
        data={plans}
        pageSize={10}
        toolbar={(table) => (
          <div className="flex items-center gap-2">
            <DataTableSearch
              table={table}
              column="name"
              placeholder="Search plans..."
            />
            <Button
              className="ml-auto text-white h-8 sm:h-10"
              onClick={() =>
                setDialog({ action: "create", id: null, open: true })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </div>
        )}
      />
      {
        <>
          {dialog.action === "create" && (
            <CreatePlanDialog open onClose={closeDialog} />
          )}
          {dialog.action === "edit" && dialog.id != null && (
            <UpdatePlanDialog
              open={dialog.open}
              planId={dialog.id}
              onClose={closeDialog}
            />
          )}
        </>
      }
    </div>
  );
}
