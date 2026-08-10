import { z } from "zod";

export const UserSchemaLimit = {
  name: { min: 2, max: 100 },
  email: { max: 100 },
  password: { min: 8, max: 100 },
} as const;

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      UserSchemaLimit.name.min,
      `Name must be at least ${UserSchemaLimit.name.min} characters`,
    )
    .max(
      UserSchemaLimit.name.max,
      `Name cannot exceed ${UserSchemaLimit.name.max} characters`,
    ),

  email: z
    .email("Invalid email address")
    .max(
      UserSchemaLimit.email.max,
      `Email cannot exceed ${UserSchemaLimit.email.max} characters`,
    ),
});

export const createUserSchema = userSchema.extend({
  password: z
    .string()
    .min(
      UserSchemaLimit.password.min,
      `Password must be at least ${UserSchemaLimit.password.min} characters`,
    )
    .max(
      UserSchemaLimit.password.max,
      `Password cannot exceed ${UserSchemaLimit.password.max} characters`,
    ),
});

export const updateUserSchema = userSchema;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),

  newPassword: z
    .string()
    .min(
      UserSchemaLimit.password.min,
      `New password must be at least ${UserSchemaLimit.password.min} characters`,
    )
    .max(
      UserSchemaLimit.password.max,
      `New password cannot exceed ${UserSchemaLimit.password.max} characters`,
    ),
});

export const resetFirstPasswordSchema = z.object({
  password: z
    .string()
    .min(
      UserSchemaLimit.password.min,
      `Password must be at least ${UserSchemaLimit.password.min} characters`,
    )
    .max(
      UserSchemaLimit.password.max,
      `Password cannot exceed ${UserSchemaLimit.password.max} characters`,
    ),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(
      UserSchemaLimit.password.min,
      `Password must be at least ${UserSchemaLimit.password.min} characters`,
    )
    .max(
      UserSchemaLimit.password.max,
      `Password cannot exceed ${UserSchemaLimit.password.max} characters`,
    ),
});

export type UserSchema = z.infer<typeof userSchema>;

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export type ResetFirstPasswordSchema = z.infer<typeof resetFirstPasswordSchema>;

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const userDefaultValues: CreateUserSchema = {
  name: "",
  email: "",
  password: "",
};

export const updateUserDefaultValues: UpdateUserSchema = {
  name: "",
  email: "",
};

export const changePasswordDefaultValues: ChangePasswordSchema = {
  currentPassword: "",
  newPassword: "",
};

export const resetFirstPasswordDefaultValues: ResetFirstPasswordSchema = {
  password: "",
};

export const resetPasswordDefaultValues: ResetPasswordSchema = {
  password: "",
};
