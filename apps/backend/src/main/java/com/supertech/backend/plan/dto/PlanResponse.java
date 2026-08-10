package com.supertech.backend.plan.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record PlanResponse(
                Long id,
                String name,
                String code,
                String description,
                Integer durationMonths,
                Integer maxUsers,
                Integer price,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {

}
