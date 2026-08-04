package com.supertech.backend.plan.dto;

import com.supertech.backend.plan.enums.PlanStatus;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePlanRequest(
                @NotBlank(message = "Plan name is required") String name,

                @NotBlank(message = "Plan code is required") String code,

                String description,

                @NotNull(message = "Duration is required") @Min(value = 1, message = "Duration must be at least 1 month") Integer durationMonths,

                @NotNull(message = "Maximum users is required") @Min(value = 1, message = "Maximum users must be at least 1") Integer maxUsers,

                @NotNull(message = "Price is required") @Min(value = 0, message = "Price cannot be negative") Integer price,

                PlanStatus status

) {

}
