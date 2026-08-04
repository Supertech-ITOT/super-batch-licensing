package com.supertech.backend.plan.service.impl;

import java.util.List;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.plan.dto.CreatePlanRequest;
import com.supertech.backend.plan.dto.PlanResponse;
import com.supertech.backend.plan.dto.UpdatePlanRequest;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.plan.mapper.PlanMapper;
import com.supertech.backend.plan.repository.PlanRepository;
import com.supertech.backend.plan.service.PlanService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PlanServiceImpl implements PlanService {

    private final PlanMapper planMapper;
    private final PlanRepository planRepository;

    @Override
    public void create(CreatePlanRequest requset) {
        if (planRepository.existsByCode(requset.code())) {
            throw new DuplicateKeyException("Plan already exists");
        }
        Plans plan = planMapper.toEntity(requset);
        planRepository.save(plan);
    }

    @Override
    public void update(UpdatePlanRequest requset, Long id) {
        Plans plans = planRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Plan not found"));
        if (!plans.getCode().equals(requset.code()) && planRepository.existsByCode(requset.code())) {
            throw new BadRequestException("Email already exists");
        }

        planMapper.updateEntity(requset, plans);
        planRepository.save(plans);
    }

    @Override
    public void delete(Long id) {
        Plans plans = planRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Plan not found"));
        planRepository.delete(plans);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlanResponse> getAll() {
        return planRepository.findAll().stream().map(planMapper::toResponse).toList();

    }

    @Override
    @Transactional(readOnly = true)
    public PlanResponse getById(Long id) {
        Plans plans = planRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Plan not found"));
        return planMapper.toResponse(plans);
    }

}
