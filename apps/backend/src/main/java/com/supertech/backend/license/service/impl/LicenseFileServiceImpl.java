package com.supertech.backend.license.service.impl;

import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.license.dto.LicenseFilePayload;
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
                        LicenseFilePayload content = LicenseFilePayload.builder()
                                        .licenseNumber(license.getLicenseNumber())
                                        .customerId(license.getCustomers().getId())
                                        .customerName(license.getCustomers().getName())
                                        .companyName(license.getCustomers().getCompanyName())
                                        .customerEmail(license.getCustomers().getEmail())
                                        .planId(license.getPlans().getId())
                                        .planMaxUsers(license.getPlans().getMaxUsers())
                                        .planName(license.getPlans().getName())
                                        .planDescription(license.getPlans().getDescription())
                                        .licenseKey(license.getLicenseKey())
                                        .type(license.getType())
                                        .status(license.getStatus())
                                        .issueDate(license.getIssueDate())
                                        .activationDate(license.getActivationDate())
                                        .expiryDate(license.getExpiryDate())
                                        .machineFingerprint(license.getMachineFingerprint())
                                        .licenseFileName(license.getLicenseFileName())
                                        .productId(license.getProduct().getId())
                                        .signature(license.getSignature())
                                        .build();
                        return objectMapper
                                        .writerWithDefaultPrettyPrinter()
                                        .writeValueAsString(content)
                                        .getBytes(StandardCharsets.UTF_8);
                } catch (Exception e) {
                        e.printStackTrace();
                        throw new BadRequestException("Failed to generate license file: " + e.getMessage());
                }
        }
}