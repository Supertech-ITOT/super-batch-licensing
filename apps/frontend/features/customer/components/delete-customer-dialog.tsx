import { toast } from "sonner";
import { useDeleteCustomer, useGetCustomerById } from "../hooks/use-customer";
import { showApiError } from "@/common/lib/show-api-error";
import ConfirmDialog from "@/common/components/form/confirm-dialog";
import { Users } from "lucide-react";

type Props = { open: boolean; onClose: () => void; customerId?: number };
export default function DeleteCustomerDialog({
  open,
  onClose,
  customerId,
}: Props) {
  const { mutateAsync: deleteCustomer, isPending: deleteCustomerIsPending } =
    useDeleteCustomer();
  const { data: customer, isLoading: customerIsLoading } =
    useGetCustomerById(customerId);
  const loading = customerIsLoading || deleteCustomerIsPending;
  const handleDelete = async () => {
    if (!customer || !customerId) return;
    try {
      const res = await deleteCustomer({ id: customerId });
      toast.success(
        res.message ?? `${customer.companyName} deleted successfully.`,
      );
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
      description={`Are you sure you want to delete "${customer?.companyName ?? "-"}"? This action cannot be undone.`}
      confirmText="Delete"
    />
  );
}
