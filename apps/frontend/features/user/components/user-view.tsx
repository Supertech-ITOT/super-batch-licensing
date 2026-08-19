"use client";

import { useState } from "react";
import { useGetAllUsers } from "../hooks/use-user";
import FeedbackState from "@/common/components/feedback-state";
import { DataTable } from "@/common/components/data-table/data-table";
import { columns } from "./columns";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import CreateUserDialog from "./create-user-dialog";
import UpdateUserDialog from "./update-user-dialog";
import DeleteUserDialog from "./delete-user-dialog";
import ResetPasswordDialog from "./reset-password-user-dialog";

export type DialogProp = {
  action: "create" | "edit" | "delete" | "reset-password" | null;
  id: number | null;
  open: boolean;
};
export default function UserView() {
  const { data: users, isLoading, isError } = useGetAllUsers();
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
  if (!users) {
    return <FeedbackState variant="empty" />;
  }
  return (
    <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
      <DataTable
        columns={columns(setDialog)}
        data={users}
        pageSize={10}
        toolbar={(table) => (
          <div className="flex items-center gap-2">
            <DataTableSearch
              table={table}
              column="name"
              placeholder="Search user..."
            />
            <Button
              className="ml-auto text-white h-8 sm:h-10"
              onClick={() =>
                setDialog({ action: "create", id: null, open: true })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        )}
      />
      {
        <>
          {dialog.action === "create" && (
            <CreateUserDialog open onClose={closeDialog} />
          )}
          {dialog.action === "edit" && dialog.id != null && (
            <UpdateUserDialog
              open={dialog.open}
              userId={dialog.id}
              onClose={closeDialog}
            />
          )}
          {dialog.action === "delete" && dialog.id != null && (
            <DeleteUserDialog
              open={dialog.open}
              userId={dialog.id}
              onClose={closeDialog}
            />
          )}
          {dialog.action === "reset-password" && dialog.id != null && (
            <ResetPasswordDialog
              open={dialog.open}
              userId={dialog.id}
              onClose={closeDialog}
            />
          )}
        </>
      }
    </div>
  );
}
