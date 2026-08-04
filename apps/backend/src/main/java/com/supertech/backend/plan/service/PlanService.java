package com.supertech.backend.plan.service;

import java.util.List;

import com.supertech.backend.plan.dto.CreatePlanRequest;
import com.supertech.backend.plan.dto.PlanResponse;
import com.supertech.backend.plan.dto.UpdatePlanRequest;

public interface PlanService {
    void create(CreatePlanRequest requset);

    void update(UpdatePlanRequest requset, Long id);

    void delete(Long id);

    List<PlanResponse> getAll();

    PlanResponse getById(Long id);
}
