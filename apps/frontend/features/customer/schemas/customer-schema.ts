import { z } from "zod";

export const customerSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name cannot exceed 100 characters"),

  email: z
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),

  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const createCustomerSchema = customerSchema.omit({
  status: true,
});

export const updateCustomerSchema = customerSchema;

export type CustomerSchema = z.infer<typeof customerSchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;
