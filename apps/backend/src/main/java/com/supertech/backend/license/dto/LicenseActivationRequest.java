package com.supertech.backend.license.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record LicenseActivationRequest(
        @NotBlank(message = "License key is required") String licenseKey,
        @NotBlank(message = "Machine fingerprint is required") String machineFingerprint,
        @NotNull(message = "Product Id is required") Long productId) {

}
