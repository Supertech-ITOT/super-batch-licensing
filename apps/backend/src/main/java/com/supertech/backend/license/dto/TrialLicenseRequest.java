package com.supertech.backend.license.dto;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record TrialLicenseRequest(
        @NotNull(message = "Email is required") String email,
        @NotNull(message = "Company Name is required") String companyName,
        @NotNull(message = "Name is required") String name,
        @NotEmpty(message = "At least one product is required") Set<@Positive(message = "Product ID must be positive") Long> productIds,
        @NotBlank(message = "Machine fingerprint is required") String machineFingerprint

) {

}
