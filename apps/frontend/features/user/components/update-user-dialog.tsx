"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { useGetUserById, useUpdateUser } from "../hooks/use-user";
import {
  updateUserSchema,
  UpdateUserSchema,
  userDefaultValues,
  UserSchemaLimit,
} from "../schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerDefaultValues } from "@/features/customer/schemas/customer-schema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { Mail, User, Users } from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";

type Props = { open: boolean; onClose: () => void; userId: number };
export default function UpdateUserDialog({ open, onClose, userId }: Props) {
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();
  const [showPassword, setShowPassword] = useState(false);
  const { data: user, isLoading: userIsLoading } = useGetUserById(userId);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: customerDefaultValues,
  });
  const loading = isSubmitting || isUpdating || userIsLoading;
  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name,
      email: user.email,
    });
  }, [user, reset]);

  const onSubmit = async (formData: UpdateUserSchema) => {
    try {
      const res = await updateUser({ id: userId, data: formData });
      toast.success(res.message ?? "User updated successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(userDefaultValues);
    onClose();
  };
  const onInvalid = (errors: FieldErrors<UpdateUserSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Update User"
      description="Update a  user."
      footer={
        <FormLoadingButton
          form="update-user-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Update
        </FormLoadingButton>
      }
      icon={Users}
    >
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="update-user-form">
        <TextInput
          label="Name"
          icon={User}
          counter
          maxCharacters={UserSchemaLimit.name.max}
          placeholder="John Doe"
          maxLength={UserSchemaLimit.name.max}
          disabled={loading}
          {...register("name")}
        />

        <TextInput
          label="Email"
          icon={Mail}
          counter
          maxCharacters={UserSchemaLimit.email.max}
          placeholder="john@example.com"
          maxLength={UserSchemaLimit.email.max}
          disabled={loading}
          {...register("email")}
        />
      </form>
    </FormDialog>
  );
}
