import { FieldErrors, useForm } from "react-hook-form";
import { useGetPlanById, useUpdatePlan } from "../hooks/use-plan";
import {
  planDefaultValues,
  PlanSchemaLimit,
  updatePlanSchema,
  UpdatePlanSchema,
} from "../schemas/plan-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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

type Props = { open: boolean; onClose: () => void; planId: number };
export default function UpdatePlanDialog({ open, onClose, planId }: Props) {
  const { mutateAsync: updatePlan, isPending: isUpdating } = useUpdatePlan();
  const { data: plan, isLoading: planIsLoading } = useGetPlanById(planId);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdatePlanSchema>({
    resolver: zodResolver(updatePlanSchema),
    defaultValues: planDefaultValues,
  });
  const loading = isSubmitting || isUpdating || planIsLoading;
  useEffect(() => {
    if (!plan) return;
    reset({
      name: plan.name,
      code: plan.code,
      description: plan.description,
      durationMonths: plan.durationMonths,
      maxUsers: plan.maxUsers,
      price: plan.price,
    });
  }, [plan, reset]);

  const onSubmit = async (formData: UpdatePlanSchema) => {
    try {
      const res = await updatePlan({ id: planId, data: formData });
      toast.success(res.message ?? "Plan updated successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };

  const handleClose = () => {
    reset(planDefaultValues);
    onClose();
  };

  const onInvalid = (errors: FieldErrors<UpdatePlanSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Update Plan"
      description="Update a plan."
      footer={
        <FormLoadingButton
          form="update-plan-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Update
        </FormLoadingButton>
      }
      icon={Layers}
    >
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="update-plan-form">
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
