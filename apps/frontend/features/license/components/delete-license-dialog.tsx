import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteLicense, useGetLicenseById } from "../hooks/use-license";
import { toast } from "sonner";
import ConfirmDialog from "@/common/components/form/confirm-dialog";
import { KeyRound } from "lucide-react";

type Props = { open: boolean; onClose: () => void; licenseId?: number };
export default function DeleteLicenseDialog({
  open,
  onClose,
  licenseId,
}: Props) {
  const { mutateAsync: deleteLicense, isPending: deleteLicenseIsPending } =
    useDeleteLicense();
  const { data: license, isLoading: customerIsLoading } =
    useGetLicenseById(licenseId);

  const loading = customerIsLoading || deleteLicenseIsPending;
  const handleDelete = async () => {
    if (!license || !licenseId) return;
    try {
      const res = await deleteLicense({ id: licenseId });
      toast.success(
        res.message ?? `${license.licenseNumber} deleted successfully.`,
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
      icon={KeyRound}
      dialogVariant="destructive"
      title="Delete License"
      description={`Are you sure you want to delete "${license?.licenseNumber ?? "-"}"? This action cannot be undone.`}
      confirmText="Delete"
    />
  );
}
