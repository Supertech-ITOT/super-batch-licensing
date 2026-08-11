import { z } from "zod";
import { LicenseStatus, LicenseType } from "../types/license.enums";

export const licenseSchema = z.object({
  customerId: z
    .number({
      error: "Customer is required",
    })
    .positive("Customer is required"),

  planId: z
    .number({
      error: "Plan is required",
    })
    .positive("Plan is required"),

  type: z
    .string({ error: "License Type is required." })
    .min(1, "License Type is required")
    .trim(),

  status: z
    .string({ error: "License Status is required." })
    .min(1, "License Status is required")
    .trim(),

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

export const licenseDefaultValues: CreateLicenseSchema = {
  customerId: 0,
  planId: 0,
  type: "",
  expiryDate: "",
  machineFingerprint: "",
};
