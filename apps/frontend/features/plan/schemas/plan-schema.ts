import { z } from "zod";

export const PlanSchemaLimit = {
  name: { min: 2, max: 100 },
  code: { min: 2, max: 50 },
  description: { max: 500 },
  durationMonths: { min: 1, max: 120 },
  maxUsers: { min: 1, max: 100000 },
  price: { min: 0, max: 100000000 },
} as const;

export const planSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      PlanSchemaLimit.name.min,
      `Plan name must be at least ${PlanSchemaLimit.name.min} characters`,
    )
    .max(
      PlanSchemaLimit.name.max,
      `Plan name cannot exceed ${PlanSchemaLimit.name.max} characters`,
    ),

  code: z
    .string()
    .trim()
    .min(
      PlanSchemaLimit.code.min,
      `Plan code must be at least ${PlanSchemaLimit.code.min} characters`,
    )
    .max(
      PlanSchemaLimit.code.max,
      `Plan code cannot exceed ${PlanSchemaLimit.code.max} characters`,
    ),

  description: z
    .string()
    .trim()
    .max(
      PlanSchemaLimit.description.max,
      `Description cannot exceed ${PlanSchemaLimit.description.max} characters`,
    )
    .optional(),

  durationMonths: z
    .number()
    .int("Duration must be a whole number")
    .min(
      PlanSchemaLimit.durationMonths.min,
      `Duration must be at least ${PlanSchemaLimit.durationMonths.min} month`,
    )
    .max(
      PlanSchemaLimit.durationMonths.max,
      `Duration cannot exceed ${PlanSchemaLimit.durationMonths.max} months`,
    ),

  maxUsers: z
    .number()
    .int("Maximum users must be a whole number")
    .min(
      PlanSchemaLimit.maxUsers.min,
      `Maximum users must be at least ${PlanSchemaLimit.maxUsers.min}`,
    )
    .max(
      PlanSchemaLimit.maxUsers.max,
      `Maximum users cannot exceed ${PlanSchemaLimit.maxUsers.max}`,
    ),

  price: z
    .number()
    .min(
      PlanSchemaLimit.price.min,
      `Price cannot be less than ${PlanSchemaLimit.price.min}`,
    )
    .max(
      PlanSchemaLimit.price.max,
      `Price cannot exceed ${PlanSchemaLimit.price.max}`,
    ),
});

export const createPlanSchema = planSchema;

export const updatePlanSchema = planSchema;

export type PlanSchema = z.infer<typeof planSchema>;

export type CreatePlanSchema = z.infer<typeof createPlanSchema>;

export type UpdatePlanSchema = z.infer<typeof updatePlanSchema>;

export const planDefaultValues: PlanSchema = {
  name: "",
  code: "",
  description: "",
  durationMonths: 1,
  maxUsers: 1,
  price: 0,
};
