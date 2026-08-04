package com.supertech.backend.plan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.backend.plan.entity.Plans;

public interface PlanRepository extends JpaRepository<Plans, Long> {
    boolean existsByCode(String code);
}
