import { z } from "zod";
import { UserStatus } from "../types/user.enums";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  status: z.enum(UserStatus),
});

export const createUserSchema = userSchema.omit({
  status: true,
});

export const updateUserSchema = userSchema.omit({
  password: true,
});

export type UserSchema = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
