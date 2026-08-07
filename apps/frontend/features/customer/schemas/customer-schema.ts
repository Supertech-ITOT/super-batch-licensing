import { z } from "zod";

export const CustomerSchemaLimit = {
  companyName: { min: 2, max: 100 },
  email: { max: 100 },
} as const;

export const customerSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(
      CustomerSchemaLimit.companyName.min,
      `Company name must be at least ${CustomerSchemaLimit.companyName.min} characters`,
    )
    .max(
      CustomerSchemaLimit.companyName.max,
      `Company name cannot exceed ${CustomerSchemaLimit.companyName.max} characters`,
    ),

  email: z
    .email("Invalid email address")
    .max(
      CustomerSchemaLimit.email.max,
      `Email cannot exceed ${CustomerSchemaLimit.email.max} characters`,
    ),
});

export const createCustomerSchema = customerSchema;

export const updateCustomerSchema = customerSchema;

export type CustomerSchema = z.infer<typeof customerSchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;

export const customerDefaultValues: CustomerSchema = {
  email: "",
  companyName: "",
};
