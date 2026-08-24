import { FieldErrors, useForm } from "react-hook-form";
import { useCreateProduct } from "../hooks/use-product";
import {
  createProductSchema,
  CreateProductSchema,
  productDefaultValues,
  ProductSchemaLimit,
} from "../schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { Boxes, Code2Icon, Feather } from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";

type Props = { open: boolean; onClose: () => void };
export default function CreateProductDialog({ open, onClose }: Props) {
  const { mutateAsync: createCustomer, isPending: isCreating } =
    useCreateProduct();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: productDefaultValues,
  });
  const loading = isSubmitting || isCreating;
  const onSubmit = async (formData: CreateProductSchema) => {
    try {
      const res = await createCustomer(formData);
      toast.success(res.message ?? "Product created successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(productDefaultValues);
    onClose();
  };

  const onInvalid = (errors: FieldErrors<CreateProductSchema>) => {
    toast.error(showFormError(errors));
  };

  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Create Product"
      description="Create a new product."
      footer={
        <FormLoadingButton
          form="create-product-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Create
        </FormLoadingButton>
      }
      icon={Boxes}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        id="create-product-form"
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
