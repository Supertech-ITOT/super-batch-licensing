package com.supertech.backend.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.security.Signature;
import java.util.Base64;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.license.dto.LicenseSignaturePayload;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.service.LicenseSigningService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseSigningServiceImpl implements LicenseSigningService {
        private final ObjectMapper objectMapper;
        private final PrivateKey privateKey;

        @Override
        public String generateSignature(License license) {
                try {
                        String payload = objectMapper.writeValueAsString(
                                        LicenseSignaturePayload.builder()
                                                        .licenseNumber(license.getLicenseNumber())
                                                        .licenseKey(license.getLicenseKey())
                                                        .type(license.getType())
                                                        .status(license.getStatus())
                                                        .issueDate(license.getIssueDate())
                                                        .activationDate(license.getActivationDate())
                                                        .expiryDate(license.getExpiryDate())
                                                        .machineFingerprint(license.getMachineFingerprint())
                                                        .customerId(license.getCustomers().getId())
                                                        .customerName(license.getCustomers().getName())
                                                        .customerEmail(license.getCustomers().getEmail())
                                                        .companyName(license.getCustomers().getCompanyName())
                                                        .planId(license.getPlans().getId())
                                                        .planName(license.getPlans().getName())
                                                        .planDescription(license.getPlans().getDescription())
                                                        .planMaxUsers(license.getPlans().getMaxUsers())
                                                        .productId(license.getProduct().getId())
                                                        .build());

                        Signature signature = Signature.getInstance("SHA256withRSA");
                        signature.initSign(privateKey);
                        signature.update(payload.getBytes(StandardCharsets.UTF_8));
                        byte[] signedBytes = signature.sign();
                        return Base64.getEncoder().encodeToString(signedBytes);
                } catch (Exception e) {
                        e.printStackTrace();
                        throw new BadRequestException(
                                        "Failed to generate license file: " + e.getMessage());
                }

        }

}
