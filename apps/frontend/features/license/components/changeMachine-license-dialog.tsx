import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useChangeMachine } from "../hooks/use-license";
import {
  changeMachineDefaultValues,
  changeMachineSchema,
  ChangeMachineSchema,
} from "../schemas/license-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import { Fingerprint, MonitorCog } from "lucide-react";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { TextInput } from "@/common/components/form/text-input";

type Props = { open: boolean; onClose: () => void; licenseId: number };
export default function ChangeMachineLicenseDialog({
  open,
  onClose,
  licenseId,
}: Props) {
  const { mutateAsync: changeMachine, isPending: isChanging } =
    useChangeMachine();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ChangeMachineSchema>({
    resolver: zodResolver(changeMachineSchema),
    defaultValues: changeMachineDefaultValues,
  });
  const loading = isSubmitting || isChanging;
  const handleClose = () => {
    reset(changeMachineDefaultValues);
    onClose();
  };
  const onSubmit = async (formData: ChangeMachineSchema) => {
    try {
      const res = await changeMachine({
        id: licenseId,
        data: formData,
      });

      toast.success(res.message ?? "Machine updated successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const onInvalid = (errors: FieldErrors<ChangeMachineSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Change Machine"
      description="Enter the fingerprint of the new machine."
      icon={MonitorCog}
      footer={
        <FormLoadingButton
          form="change-machine-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Change Machine
        </FormLoadingButton>
      }
    >
      <form
        id="change-machine-form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <TextInput
          label="Machine Fingerprint"
          icon={Fingerprint}
          placeholder="Fingerprint"
          disabled={loading}
          {...register("machineFingerprint")}
        />
      </form>
    </FormDialog>
  );
}
