package com.supertech.backend.license.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;

import lombok.Builder;

@Builder
public record TrialLicenseResponse(
        String licenseNumber,
        String customerName,
        String companyName,
        Long planId,
        Integer planMaxUser,
        String planName,
        String planDescription,
        String licenseKey,
        LicenseType type,
        LicenseStatus status,
        LocalDate issueDate,
        LocalDateTime activationDate,
        LocalDate expiryDate,
        String machineFingerprint,
        String licenseFileName,
        Long productId,
        byte[] licenseFile) {
}