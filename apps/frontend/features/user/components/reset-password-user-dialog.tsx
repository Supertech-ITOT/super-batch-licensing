import FormDialog from "@/common/components/form/form-dialog";
import { PasswordInput } from "@/common/components/form/password-input";
import { Users } from "lucide-react";
import { useResetPassword } from "../hooks/use-user";
import { FieldErrors, useForm } from "react-hook-form";
import {
  resetPasswordDefaultValues,
  resetPasswordSchema,
  ResetPasswordSchema,
} from "../schemas/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormLoadingButton from "@/common/components/form/form-loading-button";

type Props = { open: boolean; onClose: () => void; userId: number };
export default function ResetPasswordDialog({ open, onClose, userId }: Props) {
  const { mutateAsync: resetPassword, isPending: isReseting } =
    useResetPassword();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });
  const loading = isReseting || isSubmitting;
  const onSubmit = async (formData: ResetPasswordSchema) => {
    try {
      const res = await resetPassword({
        id: userId,
        data: { password: formData.password },
      });
      toast.success(res.message ?? "Password reset successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(resetPasswordDefaultValues);
    onClose();
  };
  const onInvalid = (errors: FieldErrors<ResetPasswordSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Reset Password"
      description="Reset a password."
      footer={
        <FormLoadingButton
          form="reset-password-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Reset
        </FormLoadingButton>
      }
      submitDisabled={!isDirty}
      submitLabel="Reset"
      icon={Users}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        id="reset-password-form"
      >
        <div className="space-y-2">
          <PasswordInput
            label="New Password"
            placeholder="New Password"
            disabled={loading}
            value={watch("password")}
            {...register("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            disabled={loading}
            value={watch("confirmPassword")}
            {...register("confirmPassword")}
          />
        </div>
      </form>
    </FormDialog>
  );
}
