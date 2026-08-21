import z from "zod";

export const ProductSchemaLimit = {
  name: {
    min: 1,
    max: 100,
  },
  code: {
    min: 1,
    max: 100,
  },
  description: {
    max: 500,
  },
};

export const createProductSchema = z.object({
  name: z
    .string()
    .min(ProductSchemaLimit.name.min, "Product name is required")
    .max(
      ProductSchemaLimit.name.max,
      `Product name must not exceed ${ProductSchemaLimit.name.max} characters`,
    ),

  code: z
    .string()
    .min(ProductSchemaLimit.code.min, "Product code is required")
    .max(
      ProductSchemaLimit.code.max,
      `Product code must not exceed ${ProductSchemaLimit.code.max} characters`,
    ),

  description: z
    .string()
    .max(
      ProductSchemaLimit.description.max,
      `Description must not exceed ${ProductSchemaLimit.description.max} characters`,
    )
    .optional()
    .or(z.literal("")),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export const updateProductSchema = createProductSchema;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export const productDefaultValues: CreateProductSchema = {
  name: "",
  code: "",
  description: "",
};
