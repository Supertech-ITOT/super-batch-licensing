package com.supertech.backend.license.dto;

import lombok.Builder;

@Builder
public record LicenseSignaturePayload(
        String licenseNumber,
        String licenseKey,
        Object type,
        Object status,
        Object issueDate,
        Object activationDate,
        Object expiryDate,
        String machineFingerprint,
        Long customerId,
        Long planId,
        Long productIds) {
}
