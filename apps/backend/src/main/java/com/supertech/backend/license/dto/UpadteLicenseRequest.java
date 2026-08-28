package com.supertech.backend.license.dto;

import com.supertech.backend.license.enums.LicenseStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record UpadteLicenseRequest(
                @NotNull LicenseStatus status) {

}
