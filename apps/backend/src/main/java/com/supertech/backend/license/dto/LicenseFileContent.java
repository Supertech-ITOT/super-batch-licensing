package com.supertech.backend.license.dto;

import lombok.Builder;

@Builder
public record LicenseFileContent(
        String licenseNumber,
        String licenseKey,
        Object type,
        Object status,
        Object issueDate,
        Object activationDate,
        Object expiryDate,
        String machineFingerprint,
        String signature,
        Long customerId,
        Long planId,
        Long productId) {
}
