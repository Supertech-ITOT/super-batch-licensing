"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { useCreateUser } from "../hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  CreateUserSchema,
  userDefaultValues,
  UserSchemaLimit,
} from "../schemas/user-schema";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { Eye, EyeOff, Lock, Mail, User, Users } from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import { useState } from "react";
import { Button } from "@/common/components/ui/button";

type Props = { open: boolean; onClose: () => void };
export default function CreateUserDialog({ open, onClose }: Props) {
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: userDefaultValues,
  });
  const loading = isSubmitting || isCreating;
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (formData: CreateUserSchema) => {
    try {
      const res = await createUser(formData);
      toast.success(res.message ?? "User created successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(userDefaultValues);
    onClose();
  };
  const onInvalid = (errors: FieldErrors<CreateUserSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Create User"
      description="Create a new user."
      footer={
        <FormLoadingButton
          form="create-user-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Create
        </FormLoadingButton>
      }
      icon={Users}
    >
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="create-user-form">
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

        <div className="relative">
          <TextInput
            label="Password"
            icon={Lock}
            type={showPassword ? "text" : "password"}
            maxLength={UserSchemaLimit.password.max}
            placeholder="Enter password"
            disabled={loading}
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-7"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </FormDialog>
  );
}
