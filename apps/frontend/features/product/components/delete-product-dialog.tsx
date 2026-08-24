import { toast } from "sonner";
import { useDeleteProduct, useGetProductById } from "../hooks/use-product";
import { showApiError } from "@/common/lib/show-api-error";
import ConfirmDialog from "@/common/components/form/confirm-dialog";
import { Boxes } from "lucide-react";

type Props = { open: boolean; onClose: () => void; productId?: number };
export default function DeleteProductDialog({
  open,
  onClose,
  productId,
}: Props) {
  const { mutateAsync: deleteProduct, isPending: deleteProductIsPending } =
    useDeleteProduct();
  const { data: product, isLoading: productIsLoading } =
    useGetProductById(productId);
  const loading = productIsLoading || deleteProductIsPending;
  const handleDelete = async () => {
    if (!product || !productId) return;
    try {
      const res = await deleteProduct(productId);
      toast.success(res.message ?? `${product.name} deleted successfully.`);
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
      icon={Boxes}
      dialogVariant="destructive"
      title="Delete Product"
      description={`Are you sure you want to delete "${product?.name ?? "-"}"? This action cannot be undone.`}
      confirmText="Delete"
    />
  );
}
