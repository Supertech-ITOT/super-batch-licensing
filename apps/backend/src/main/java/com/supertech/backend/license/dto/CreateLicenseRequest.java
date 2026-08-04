package com.supertech.backend.license.dto;

import java.time.LocalDate;

import com.supertech.backend.license.enums.LicenseType;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record CreateLicenseRequest(

        @NotNull(message = "Customer is required") Long customerId,

        @NotNull(message = "License plan is required") Long planId,

        @NotNull(message = "License type is required") LicenseType type,

        @NotNull(message = "Expiry date is required") @Future(message = "Expiry date must be in the future") LocalDate expiryDate,

        String machineFingerprint

) {

}
