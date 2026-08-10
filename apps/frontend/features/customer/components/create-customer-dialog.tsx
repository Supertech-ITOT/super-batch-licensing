import { FieldErrors, useForm } from "react-hook-form";
import { useCreateCustomer } from "../hooks/use-customer";
import {
  createCustomerSchema,
  CreateCustomerSchema,
  customerDefaultValues,
  CustomerSchemaLimit,
} from "../schemas/customer-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "../../../common/lib/show-api-error";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { Mail, User, Users } from "lucide-react";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void };
export default function CreateCustomerDialog({ open, onClose }: Props) {
  const { mutateAsync: createCustomer, isPending: isCreating } =
    useCreateCustomer();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: customerDefaultValues,
  });
  const loading = isSubmitting || isCreating;
  const onSubmit = async (formData: CreateCustomerSchema) => {
    try {
      const res = await createCustomer(formData);
      toast.success(res.message ?? "Customer created successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(customerDefaultValues);
    onClose();
  };

  const onInvalid = (errors: FieldErrors<CreateCustomerSchema>) => {
    toast.error(showFormError(errors));
  };

  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Create Customer"
      description="Create a new customer."
      footer={
        <FormLoadingButton
          form="create-customer-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Create
        </FormLoadingButton>
      }
      icon={Users}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        id="create-customer-form"
      >
        <div className="space-y-4">
          <TextInput
            label="Name"
            icon={User}
            counter
            maxCharacters={CustomerSchemaLimit.companyName.max}
            placeholder="Jhon Joe"
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
