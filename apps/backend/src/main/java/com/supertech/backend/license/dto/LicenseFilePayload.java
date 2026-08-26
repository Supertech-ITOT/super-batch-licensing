package com.supertech.backend.license.dto;

import java.time.LocalDate;

import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;

import lombok.Builder;

@Builder
public record LicenseFilePayload(
                String licenseNumber,
                Long customerId,
                String customerName,
                String customerEmail,
                String companyName,
                Long planId,
                Integer planMaxUsers,
                String planName,
                String planDescription,
                String licenseKey,
                LicenseType type,
                LicenseStatus status,
                LocalDate issueDate,
                LocalDate activationDate,
                LocalDate expiryDate,
                String machineFingerprint,
                String licenseFileName,
                Long productId,
                String signature) {

}