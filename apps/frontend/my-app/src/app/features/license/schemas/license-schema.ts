import { z } from "zod";
import { LicenseStatus, LicenseType } from "../types/license.enums";

export const licenseSchema = z.object({
  customerId: z
    .number({
      error: "Customer is required",
    })
    .positive(),

  planId: z
    .number({
      error: "Plan is required",
    })
    .positive(),

  type: z.enum(LicenseType),

  status: z.enum(LicenseStatus),

  expiryDate: z.string().min(1, "Expiry date is required"),

  machineFingerprint: z.string().optional(),
});

export const createLicenseSchema = licenseSchema.omit({
  status: true,
});

export const updateLicenseSchema = licenseSchema.omit({
  customerId: true,
  planId: true,
  type: true,
});

export type LicenseSchema = z.infer<typeof licenseSchema>;

export type CreateLicenseSchema = z.infer<typeof createLicenseSchema>;

export type UpdateLicenseSchema = z.infer<typeof updateLicenseSchema>;
