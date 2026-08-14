package com.supertech.backend.license.service.impl;

import java.nio.charset.StandardCharsets;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.license.dto.LicenseFileContent;
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
                        LicenseFileContent content = LicenseFileContent.builder()
                                        .licenseNumber(license.getLicenseNumber())
                                        .licenseKey(license.getLicenseKey())
                                        .type(license.getType())
                                        .status(license.getStatus())
                                        .issueDate(license.getIssueDate())
                                        .activationDate(license.getActivationDate())
                                        .expiryDate(license.getExpiryDate())
                                        .machineFingerprint(license.getMachineFingerprint())
                                        .signature(license.getSignature())
                                        .customerId(license.getCustomers() != null
                                                        ? license.getCustomers().getId()
                                                        : null)
                                        .planId(license.getPlans() != null
                                                        ? license.getPlans().getId()
                                                        : null)
                                        .productId(license.getProduct() != null ? license.getProduct().getId() : null)
                                        .build();

                        return objectMapper
                                        .writerWithDefaultPrettyPrinter()
                                        .writeValueAsString(content)
                                        .getBytes(StandardCharsets.UTF_8);

                } catch (Exception e) {
                        throw new BadRequestException("Failed to generate license file");
                }
        }

}