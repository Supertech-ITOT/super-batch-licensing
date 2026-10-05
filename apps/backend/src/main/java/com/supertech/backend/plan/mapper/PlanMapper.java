package com.supertech.backend.plan.mapper;

import org.springframework.stereotype.Component;

import com.supertech.backend.plan.dto.CreatePlanRequest;
import com.supertech.backend.plan.dto.PlanResponse;
import com.supertech.backend.plan.dto.UpdatePlanRequest;
import com.supertech.backend.plan.entity.Plans;

@Component
public class PlanMapper {
    public Plans toEntity(CreatePlanRequest requset) {
        return Plans.builder()
                .name(requset.name())
                .code(requset.code())
                .description(requset.description())
                .durationMonths(requset.durationMonths())
                .maxUnits(requset.maxUnits())
                .price(requset.price())
                .build();
    }

    public void updateEntity(UpdatePlanRequest request, Plans plans) {
        plans.setName(request.name());
        plans.setCode(request.code());
        plans.setDescription(request.description());
        plans.setDurationMonths(request.durationMonths());
        plans.setMaxUnits(request.maxUnits());
        plans.setPrice(request.price());
    }

    public PlanResponse toResponse(Plans plans) {
        return PlanResponse.builder()
                .id(plans.getId())
                .name(plans.getName())
                .code(plans.getCode())
                .description(plans.getDescription())
                .durationMonths(plans.getDurationMonths())
                .maxUnits(plans.getMaxUnits())
                .price(plans.getPrice())
                .createdAt(plans.getCreatedAt())
                .updatedAt(plans.getUpdatedAt())
                .build();

    }

}
