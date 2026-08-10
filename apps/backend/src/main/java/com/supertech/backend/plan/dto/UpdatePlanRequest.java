package com.supertech.backend.plan.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdatePlanRequest(
        @NotBlank(message = "Plan name is required") String name,

        @NotBlank(message = "Plan code is required") String code,

        String description,

        @NotNull(message = "Duration is required") @Min(1) Integer durationMonths,

        @NotNull(message = "Maximum users is required") @Min(1) Integer maxUsers,

        @NotNull(message = "Price is required") @Min(0) Integer price

) {

}
