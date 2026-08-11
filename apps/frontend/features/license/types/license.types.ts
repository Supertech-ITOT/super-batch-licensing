import { LicenseStatus, LicenseType } from "./license.enums";

export interface LicenseResponse {
  id: number;
  licenseNumber: string;
  licenseKey: string;

  customerId: number;
  customerName: string;

  planId: number;
  planName: string;

  type: LicenseType;
  status: LicenseStatus;

  issueDate: string;
  activationDate: string | null;
  expiryDate: string;

  machineFingerprint?: string;
  licenseFileName?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateLicenseRequest {
  customerId: number;
  planId: number;
  type: string;
  expiryDate: string;
  machineFingerprint?: string;
}

export interface UpdateLicenseRequest {
  status: string;
  expiryDate: string;
  machineFingerprint?: string;
}
