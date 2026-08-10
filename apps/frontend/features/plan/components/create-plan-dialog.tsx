import { FieldErrors, useForm } from "react-hook-form";
import { useCreatePlan } from "../hooks/use-plan";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPlanSchema,
  CreatePlanSchema,
  planDefaultValues,
  PlanSchemaLimit,
} from "../schemas/plan-schema";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import {
  Calendar,
  Feather,
  Hash,
  IndianRupee,
  Layers,
  Users,
} from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";

type Props = { open: boolean; onClose: () => void };
export default function CreatePlanDialog({ open, onClose }: Props) {
  const { mutateAsync: createPlan, isPending: isCreating } = useCreatePlan();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<CreatePlanSchema>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: planDefaultValues,
  });
  const loading = isSubmitting || isCreating;
  const onSubmit = async (formData: CreatePlanSchema) => {
    try {
      const res = await createPlan(formData);
      toast.success(res.message ?? "Plan created successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(planDefaultValues);
    onClose();
  };

  const onInvalid = (errors: FieldErrors<CreatePlanSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Create Plan"
      description="Create a new plan."
      footer={
        <FormLoadingButton
          form="create-plan-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Create
        </FormLoadingButton>
      }
      icon={Layers}
    >
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="create-plan-form">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              label="Plan Name"
              icon={Layers}
              counter
              maxCharacters={PlanSchemaLimit.name.max}
              placeholder="Professional Plan"
              maxLength={PlanSchemaLimit.name.max}
              disabled={loading}
              {...register("name")}
            />

            <TextInput
              label="Plan Code"
              icon={Hash}
              counter
              maxCharacters={PlanSchemaLimit.code.max}
              placeholder="PRO"
              maxLength={PlanSchemaLimit.code.max}
              disabled={loading}
              {...register("code")}
            />
          </div>

          <TextAreaInput
            label="Description"
            placeholder="Professional subscription plan"
            maxLength={PlanSchemaLimit.description.max}
            disabled={loading}
            icon={Feather}
            {...register("description")}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              label="Duration (Months)"
              icon={Calendar}
              type="number"
              disabled={loading}
              {...register("durationMonths", { valueAsNumber: true })}
            />

            <TextInput
              label="Maximum Users"
              icon={Users}
              type="number"
              disabled={loading}
              {...register("maxUsers", { valueAsNumber: true })}
            />
          </div>
          <TextInput
            label="Price"
            icon={IndianRupee}
            type="number"
            disabled={loading}
            {...register("price", { valueAsNumber: true })}
          />
        </div>
      </form>
    </FormDialog>
  );
}
