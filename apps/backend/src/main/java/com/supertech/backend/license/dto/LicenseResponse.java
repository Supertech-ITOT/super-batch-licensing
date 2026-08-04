package com.supertech.backend.license.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;

import lombok.Builder;

@Builder
public record LicenseResponse(
        Long id,
        String licenseNumber,
        String licenseKey,

        Long customerId,
        String customerName,

        Long planId,
        String planName,

        LicenseType type,
        LicenseStatus status,

        LocalDate issueDate,
        LocalDate activationDate,
        LocalDate expiryDate,

        String machineFingerprint,
        String licenseFileName,

        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

}
