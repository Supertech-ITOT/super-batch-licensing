import FormDialog from "@/common/components/form/form-dialog";
import { useGetCustomerById, useUpdateCustomer } from "../hooks/use-customer";
import { FieldErrors, useForm } from "react-hook-form";
import {
  customerDefaultValues,
  CustomerSchemaLimit,
  updateCustomerSchema,
  UpdateCustomerSchema,
} from "../schemas/customer-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { Mail, User, Users } from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; customerId: number };
export default function UpdateCustomerDialog({
  open,
  onClose,
  customerId,
}: Props) {
  const { mutateAsync: updateCustomer, isPending: isUpdating } =
    useUpdateCustomer();
  const { data: customer, isLoading: customerIsLoading } =
    useGetCustomerById(customerId);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateCustomerSchema>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: customerDefaultValues,
  });
  const loading = isSubmitting || isUpdating || customerIsLoading;
  useEffect(() => {
    if (!customer) return;
    reset({
      companyName: customer.companyName,
      email: customer.email,
    });
  }, [customer, reset]);

  const onSubmit = async (formData: UpdateCustomerSchema) => {
    try {
      const res = await updateCustomer({ id: customerId, data: formData });
      toast.success(res.message ?? "Customer updated successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };

  const handleClose = () => {
    reset(customerDefaultValues);
    onClose();
  };

  const onInvalid = (errors: FieldErrors<UpdateCustomerSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Update Customer"
      description="Update a customer."
      footer={
        <FormLoadingButton
          form="update-customer-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Update
        </FormLoadingButton>
      }
      icon={Users}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        id="update-customer-form"
      >
        <div className="space-y-4">
          <TextInput
            label="Company Name"
            icon={User}
            counter
            maxCharacters={CustomerSchemaLimit.companyName.max}
            placeholder="Supertech Instrumentation Pvt Ltd"
            maxLength={CustomerSchemaLimit.companyName.max}
            disabled={loading}
            value={watch("companyName")}
            {...register("companyName")}
          />
          <TextInput
            label="Email"
            icon={Mail}
            counter
            maxCharacters={CustomerSchemaLimit.email.max}
            placeholder="abc@gmail.com"
            maxLength={CustomerSchemaLimit.email.max}
            disabled={loading}
            value={watch("email")}
            {...register("email")}
          />
        </div>
      </form>
    </FormDialog>
  );
}
