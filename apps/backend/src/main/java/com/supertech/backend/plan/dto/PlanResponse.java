package com.supertech.backend.plan.dto;

import java.time.LocalDateTime;

import com.supertech.backend.plan.enums.PlanStatus;

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
        PlanStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

}
