package com.supertech.backend.license.dto;

import java.time.LocalDate;

import com.supertech.backend.license.enums.LicenseStatus;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record UpadteLicenseRequest(
        @NotNull LicenseStatus status,

        @NotNull @Future LocalDate expiryDate,

        String machineFingerprint) {

}
