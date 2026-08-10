import ConfirmDialog from "@/common/components/form/confirm-dialog";
import { useDeleteUser, useGetUserById } from "../hooks/use-user";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Users } from "lucide-react";

type Props = { open: boolean; onClose: () => void; userId?: number };
export default function DeleteUserDialog({ open, onClose, userId }: Props) {
  const { mutateAsync: deleteUser, isPending: deleteUserIsPending } =
    useDeleteUser();
  const { data: user, isLoading: userIsLoading } = useGetUserById(userId);
  const loading = userIsLoading || deleteUserIsPending;
  const handleDelete = async () => {
    if (!user || !userId) return;
    try {
      const res = await deleteUser({ id: userId });
      toast.success(res.message ?? `${user.name} deleted successfully.`);
      onClose();
    } catch (error) {
      showApiError(error);
    }
  };
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={handleDelete}
      loading={loading}
      icon={Users}
      dialogVariant="destructive"
      title="Delete User"
      description={`Are you sure you want to delete "${user?.name ?? "-"}"? This action cannot be undone.`}
      confirmText="Delete"
    />
  );
}
