package com.supertech.backend.license.dto;

import java.time.LocalDate;

import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;

import lombok.Builder;

@Builder
public record LicenseActivationResponse(
                String licenseNumber,
                String customerName,
                String companyName,
                Long planId,
                Integer planMaxUser,
                String planName,
                String planDescription,
                String licenseKey,
                String customerEmail,
                LicenseType type,
                LicenseStatus status,
                LocalDate issueDate,
                LocalDate activationDate,
                LocalDate expiryDate,
                String machineFingerprint,
                String licenseFileName,
                Long productId,
                String signature,
                byte[] licenseFile

) {

}
