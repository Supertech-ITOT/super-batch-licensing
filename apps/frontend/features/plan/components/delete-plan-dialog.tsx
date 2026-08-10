import { showApiError } from "@/common/lib/show-api-error";
import { useDeletePlan, useGetPlanById } from "../hooks/use-plan";
import { toast } from "sonner";
import ConfirmDialog from "@/common/components/form/confirm-dialog";
import { Layers, Package } from "lucide-react";

type Props = { open: boolean; onClose: () => void; planId?: number };
export default function DeletePlanDialog({ open, onClose, planId }: Props) {
  const { mutateAsync: deletePlan, isPending: deletePlanIsPending } =
    useDeletePlan();
  const { data: plan, isLoading: planIsLoading } = useGetPlanById(planId);
  const loading = planIsLoading || deletePlanIsPending;
  const handleDelete = async () => {
    if (!plan || !planId) return;
    try {
      const res = await deletePlan({ id: planId });
      toast.success(res.message ?? `${plan.name} deleted successfully.`);
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
      icon={Layers}
      dialogVariant="destructive"
      title="Delete User"
      description={`Are you sure you want to delete "${plan?.name ?? "-"}"? This action cannot be undone.`}
      confirmText="Delete"
    />
  );
}
