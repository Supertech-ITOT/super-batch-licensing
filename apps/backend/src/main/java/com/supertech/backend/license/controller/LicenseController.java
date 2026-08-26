package com.supertech.backend.license.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
import com.supertech.backend.license.dto.LicenseActivationRequest;
import com.supertech.backend.license.dto.LicenseActivationResponse;
import com.supertech.backend.license.dto.LicenseResponse;
import com.supertech.backend.license.dto.TrialLicenseRequest;
import com.supertech.backend.license.dto.TrialLicenseResponse;
import com.supertech.backend.license.dto.UpadteLicenseRequest;
import com.supertech.backend.license.service.LicenseService;
import com.supertech.backend.license.util.PublicKeyGenerator;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/licenses")
@RequiredArgsConstructor
public class LicenseController {
    @Value("${license.private-key}")
    private String licensePrivateKey;
    private final LicenseService licenseService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateLicenseRequest request,
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

    @PostMapping("/trial")
    public ResponseEntity<ApiResponse<TrialLicenseResponse>> activateTrial(
            @Valid @RequestBody TrialLicenseRequest request) {

        TrialLicenseResponse res = licenseService.activateTrial(request);
        return ResponseEntity.ok(ApiResponse.success("Trial License created successfully", res));
    }

    @PostMapping("/activate")
    public ResponseEntity<ApiResponse<LicenseActivationResponse>> activateLicense(
            @Valid @RequestBody LicenseActivationRequest request) {

        LicenseActivationResponse res = licenseService.activateLicense(request);
        return ResponseEntity.ok(ApiResponse.success("License activated successfully", res));
    }

    @GetMapping("/{id}/download-key")
    public ResponseEntity<byte[]> downloadLicenseKey(@PathVariable Long id) {

        byte[] file = licenseService.downloadLicenseKey(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"license-key.txt\"")
                .contentType(MediaType.TEXT_PLAIN)
                .body(file);
    }

    @GetMapping("/{id}/download-file")
    public ResponseEntity<byte[]> downloadLicenseFile(@PathVariable Long id) {

        byte[] file = licenseService.downloadLicenseFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"license.lic\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }

    @PostMapping("/{id}/send-key")
    public ResponseEntity<ApiResponse<Void>> sendLicenseKey(@PathVariable Long id) {
        licenseService.sendLicenseKey(id);
        return ResponseEntity.ok(
                ApiResponse.success("License key email sent successfully", null));
    }

    @PostMapping("/{id}/send-file")
    public ResponseEntity<ApiResponse<Void>> sendLicenseFile(@PathVariable Long id) {
        licenseService.sendLicenseFile(id);
        return ResponseEntity.ok(
                ApiResponse.success("License file email sent successfully", null));
    }

    @GetMapping("/public-key")
    public ResponseEntity<ApiResponse<String>> getPublicKey() throws Exception {
        String publicKey = PublicKeyGenerator.generatePublicKey(licensePrivateKey);
        return ResponseEntity.ok(ApiResponse.success("Public key generated successfully", publicKey));
    }

}