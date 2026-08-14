package com.supertech.backend.license.dto;

import java.time.LocalDate;

import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;

public record TrialLicenseResponse(
                String licenseNumber,
                String licenseKey,
                LicenseType type,
                LicenseStatus status,
                LocalDate issueDate,
                LocalDate activationDate,
                LocalDate expiryDate,
                String machineFingerprint,
                String licenseFileName,
                Long productId,
                byte[] licenseFile) {
}