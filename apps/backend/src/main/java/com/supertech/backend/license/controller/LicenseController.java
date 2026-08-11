package com.supertech.backend.license.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
import com.supertech.backend.license.dto.CreateLicenseRequest;
import com.supertech.backend.license.dto.LicenseResponse;
import com.supertech.backend.license.dto.UpadteLicenseRequest;
import com.supertech.backend.license.service.LicenseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/licenses")
@RequiredArgsConstructor
public class LicenseController {
    private final LicenseService licenseService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Validated @RequestBody CreateLicenseRequest request,
            Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        licenseService.create(request, userId);
        return ResponseEntity.ok(ApiResponse.success("License created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Validated @RequestBody UpadteLicenseRequest request) {
        licenseService.update(request, id);
        return ResponseEntity.ok(ApiResponse.success("License updated successfully", null));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@Validated @PathVariable Long id) {
        licenseService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("License deleted successfully", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LicenseResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("License fetched successfully", licenseService.getById(id)));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<LicenseResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("License fetched successfully", licenseService.getAll()));
    }

}