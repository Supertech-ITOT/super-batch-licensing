package com.supertech.backend.plan.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.backend.plan.entity.Plans;

public interface PlanRepository extends JpaRepository<Plans, Long> {
    boolean existsByCode(String code);

    Optional<Plans> findByCode(String code);
}
