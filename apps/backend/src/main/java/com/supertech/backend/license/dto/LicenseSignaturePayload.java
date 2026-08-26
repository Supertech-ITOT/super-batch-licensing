package com.supertech.backend.license.dto;

import java.time.LocalDate;

import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;

import lombok.Builder;

@Builder
public record LicenseSignaturePayload(
        String licenseNumber,
        String licenseKey,
        LicenseType type,
        LicenseStatus status,
        LocalDate issueDate,
        LocalDate activationDate,
        LocalDate expiryDate,
        String machineFingerprint,
        Long customerId,
        String customerName,
        String customerEmail,
        String companyName,
        Long planId,
        String planName,
        String planDescription,
        Integer planMaxUsers,
        Long productId

) {
}