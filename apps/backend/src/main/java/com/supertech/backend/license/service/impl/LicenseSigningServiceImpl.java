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
                                                        .customerId(
                                                                        license.getCustomers() != null
                                                                                        ? license.getCustomers().getId()
                                                                                        : null)
                                                        .planId(
                                                                        license.getPlans() != null
                                                                                        ? license.getPlans().getId()
                                                                                        : null)
                                                        .productIds(
                                                                        license.getProduct() != null
                                                                                        ? license.getProduct().getId()
                                                                                        : null)
                                                        .build());

                        Signature signature = Signature.getInstance("SHA256withRSA");
                        signature.initSign(privateKey);
                        signature.update(payload.getBytes(StandardCharsets.UTF_8));
                        byte[] signedBytes = signature.sign();
                        return Base64.getEncoder().encodeToString(signedBytes);
                } catch (Exception e) {
                        throw new BadRequestException("Failed to generate license signature");
                }

        }

}
