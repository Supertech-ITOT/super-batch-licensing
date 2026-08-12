package com.supertech.backend.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.service.LicenseFileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseFileServiceImpl implements LicenseFileService {

        private final ObjectMapper objectMapper;

        @Override
        public byte[] generateLicenseFile(License license) {

                try {

                        LicenseFileContent content = new LicenseFileContent(
                                        license.getLicenseNumber(),
                                        license.getLicenseKey(),
                                        license.getType(),
                                        license.getStatus(),
                                        license.getIssueDate(),
                                        license.getActivationDate(),
                                        license.getExpiryDate(),
                                        license.getMachineFingerprint(),
                                        license.getSignature(),
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
                                                        : List.of());

                        return objectMapper
                                        .writerWithDefaultPrettyPrinter()
                                        .writeValueAsString(content)
                                        .getBytes(StandardCharsets.UTF_8);

                } catch (Exception e) {
                        throw new BadRequestException(
                                        "Failed to generate license file");
                }
        }

        private record LicenseFileContent(
                        String licenseNumber,
                        String licenseKey,
                        Object type,
                        Object status,
                        Object issueDate,
                        Object activationDate,
                        Object expiryDate,
                        String machineFingerprint,
                        String signature,
                        Long customerId,
                        Long planId,
                        List<Long> productIds) {
        }
}