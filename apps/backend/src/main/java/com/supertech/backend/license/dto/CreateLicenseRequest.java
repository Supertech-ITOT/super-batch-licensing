package com.supertech.backend.license.dto;

import com.supertech.backend.license.enums.LicenseType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record CreateLicenseRequest(

        @NotNull(message = "Customer is required") Long customerId,
        @NotNull(message = "Product is required") Long productId,
        @NotNull(message = "License plan is required") Long planId,
        @NotNull(message = "License type is required") LicenseType type,
        String machineFingerprint

) {

}
