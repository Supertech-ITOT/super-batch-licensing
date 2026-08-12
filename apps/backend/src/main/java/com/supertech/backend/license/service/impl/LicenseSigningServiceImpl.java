package com.supertech.backend.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.security.Signature;
import java.util.Base64;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.backend.common.exception.BadRequestException;
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
                                        new LicenseSignaturePayload(
                                                        license.getLicenseNumber(),
                                                        license.getLicenseKey(),
                                                        license.getType(),
                                                        license.getStatus(),
                                                        license.getIssueDate(),
                                                        license.getActivationDate(),
                                                        license.getExpiryDate(),
                                                        license.getMachineFingerprint(),
                                                        license.getCustomers() != null
                                                                        ? license.getCustomers().getId()
                                                                        : null,
                                                        license.getPlans() != null
                                                                        ? license.getPlans().getId()
                                                                        : null,
                                                        license.getProducts() != null
                                                                        ? license.getProducts()
                                                                                        .stream()
                                                                                        .map(product -> product.getId())
                                                                                        .sorted()
                                                                                        .toList()
                                                                        : null));

                        Signature signature = Signature.getInstance("SHA256withRSA");

                        signature.initSign(privateKey);

                        signature.update(
                                        payload.getBytes(StandardCharsets.UTF_8));

                        byte[] signedBytes = signature.sign();

                        return Base64.getEncoder().encodeToString(signedBytes);

                } catch (Exception e) {
                        throw new BadRequestException(
                                        "Failed to generate license signature");
                }

        }

        private record LicenseSignaturePayload(
                        String licenseNumber,
                        String licenseKey,
                        Object type,
                        Object status,
                        Object issueDate,
                        Object activationDate,
                        Object expiryDate,
                        String machineFingerprint,
                        Long customerId,
                        Long planId,
                        java.util.List<Long> productIds) {
        }

}
