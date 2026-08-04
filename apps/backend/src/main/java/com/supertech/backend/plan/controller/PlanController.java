package com.supertech.backend.plan.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.backend.common.dto.ApiResponse;
import com.supertech.backend.plan.dto.CreatePlanRequest;
import com.supertech.backend.plan.dto.PlanResponse;
import com.supertech.backend.plan.dto.UpdatePlanRequest;
import com.supertech.backend.plan.service.PlanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor

public class PlanController {
    private final PlanService planService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Validated @RequestBody CreatePlanRequest request) {
        planService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Plan created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Validated @RequestBody UpdatePlanRequest request) {
        planService.update(request, id);
        return ResponseEntity.ok(ApiResponse.success("Plan updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        planService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Plan deleted successfully", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlanResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Plan fetched successfully", planService.getById(id)));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<PlanResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Plan fetched successfully", planService.getAll()));
    }

}
