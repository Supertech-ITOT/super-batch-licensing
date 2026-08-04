package com.supertech.backend.plan.mapper;

import org.springframework.stereotype.Component;

import com.supertech.backend.plan.dto.CreatePlanRequest;
import com.supertech.backend.plan.dto.PlanResponse;
import com.supertech.backend.plan.dto.UpdatePlanRequest;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.plan.enums.PlanStatus;

@Component
public class PlanMapper {
    public Plans toEntity(CreatePlanRequest requset) {
        return Plans.builder()
                .name(requset.name())
                .code(requset.code())
                .description(requset.description())
                .durationMonths(requset.durationMonths())
                .maxUsers(requset.maxUsers())
                .price(requset.price())
                .status(requset.status() != null ? requset.status() : PlanStatus.ACTIVE)
                .build();
    }

    public void updateEntity(UpdatePlanRequest request, Plans plans) {
        plans.setName(request.name());
        plans.setCode(request.code());
        plans.setDescription(request.description());
        plans.setDurationMonths(request.durationMonths());
        plans.setMaxUsers(request.maxUsers());
        plans.setPrice(request.price());
        plans.setStatus(request.status());
    }

    public PlanResponse toResponse(Plans plans) {
        return PlanResponse.builder()
                .id(plans.getId())
                .name(plans.getName())
                .code(plans.getCode())
                .description(plans.getDescription())
                .durationMonths(plans.getDurationMonths())
                .maxUsers(plans.getMaxUsers())
                .price(plans.getPrice())
                .status(plans.getStatus())
                .createdAt(plans.getCreatedAt())
                .updatedAt(plans.getUpdatedAt())
                .build();

    }

}
