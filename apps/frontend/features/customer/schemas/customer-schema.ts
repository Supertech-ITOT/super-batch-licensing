import { z } from "zod";

export const CustomerSchemaLimit = {
  name: { min: 2, max: 50 },
  companyName: { min: 2, max: 100 },
  email: { max: 100 },
} as const;

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      CustomerSchemaLimit.name.min,
      ` name must be at least ${CustomerSchemaLimit.name.min} characters`,
    )
    .max(
      CustomerSchemaLimit.name.max,
      ` name cannot exceed ${CustomerSchemaLimit.name.max} characters`,
    ),
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
  name: "",
  companyName: "",
};
