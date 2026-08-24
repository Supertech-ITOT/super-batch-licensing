import { FieldErrors, useForm } from "react-hook-form";
import { useGetProductById, useUpdateProduct } from "../hooks/use-product";
import {
  productDefaultValues,
  ProductSchemaLimit,
  updateProductSchema,
  UpdateProductSchema,
} from "../schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { Boxes, Code2Icon, Feather } from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";

type Props = { open: boolean; onClose: () => void; productId: number };
export default function UpdateProductDialog({
  open,
  onClose,
  productId,
}: Props) {
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();
  const { data: product, isLoading: productIsLoading } =
    useGetProductById(productId);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: productDefaultValues,
  });
  const loading = isSubmitting || isUpdating || productIsLoading;
  useEffect(() => {
    if (!product) return;
    reset({
      name: product.name,
      code: product.code,
      description: product.description,
    });
  }, [product, reset]);
  const onSubmit = async (formData: UpdateProductSchema) => {
    try {
      const res = await updateProduct({ id: productId, data: formData });
      toast.success(res.message ?? "Customer updated successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(productDefaultValues);
    onClose();
  };

  const onInvalid = (errors: FieldErrors<UpdateProductSchema>) => {
    toast.error(showFormError(errors));
  };

  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Update Product"
      description="Update a product."
      footer={
        <FormLoadingButton
          form="update-product-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Update
        </FormLoadingButton>
      }
      icon={Boxes}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        id="update-product-form"
      >
        <div className="space-y-2">
          <div className=" grid grid-cols-2 gap-2">
            <TextInput
              label="Product Name"
              icon={Boxes}
              counter
              maxCharacters={ProductSchemaLimit.name.max}
              placeholder="SuperBatch"
              maxLength={ProductSchemaLimit.name.max}
              disabled={loading}
              value={watch("name")}
              {...register("name")}
            />
            <TextInput
              label="Code"
              icon={Code2Icon}
              counter
              maxCharacters={ProductSchemaLimit.code.max}
              placeholder="SB101"
              maxLength={ProductSchemaLimit.code.max}
              disabled={loading}
              value={watch("code")}
              {...register("code")}
            />
          </div>
          <TextAreaInput
            label="Description"
            counter
            placeholder="Description"
            maxLength={ProductSchemaLimit.description.max}
            maxCharacters={ProductSchemaLimit.description.max}
            disabled={loading}
            icon={Feather}
            value={watch("description")}
            {...register("description")}
          />
        </div>
      </form>
    </FormDialog>
  );
}
