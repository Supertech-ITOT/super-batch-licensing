package com.supertech.backend.license.mapper;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.license.dto.CreateLicenseRequest;
import com.supertech.backend.license.dto.LicenseResponse;
import com.supertech.backend.license.dto.UpadteLicenseRequest;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.user.entity.Users;

@Component
public class LicenseMapper {
    public License toEntity(CreateLicenseRequest request, Customers customer, Users createdBy, Plans plan) {
        return License.builder()
                .licenseNumber(generateLicenseNumber())
                .licenseKey(UUID.randomUUID().toString())

                .customers(customer)
                .plans(plan)

                .type(request.type())
                .status(LicenseStatus.ACTIVE)

                .issueDate(LocalDate.now())
                .expiryDate(request.expiryDate())
                .machineFingerprint(request.machineFingerprint())

                .createdBy(createdBy)
                .build();

    }

    public void updateEntity(UpadteLicenseRequest request, License license) {

        license.setStatus(request.status());
        license.setExpiryDate(request.expiryDate());
        license.setMachineFingerprint(request.machineFingerprint());
    }

    public LicenseResponse toResponse(License license) {

        return LicenseResponse.builder()
                .id(license.getId())

                .licenseNumber(license.getLicenseNumber())
                .licenseKey(license.getLicenseKey())

                .customerId(license.getCustomers().getId())
                .customerName(license.getCustomers().getCompanyName())

                .planId(license.getPlans().getId())
                .planName(license.getPlans().getName())

                .type(license.getType())
                .status(license.getStatus())

                .issueDate(license.getIssueDate())
                .activationDate(license.getActivationDate())
                .expiryDate(license.getExpiryDate())

                .machineFingerprint(license.getMachineFingerprint())
                .licenseFileName(license.getLicenseFileName())

                .createdAt(license.getCreatedAt())
                .updatedAt(license.getUpdatedAt())
                .build();
    }

    private String generateLicenseNumber() {
        return "LIC-" + System.currentTimeMillis();
    }

}
