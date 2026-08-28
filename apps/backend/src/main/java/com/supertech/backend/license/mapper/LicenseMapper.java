package com.supertech.backend.license.mapper;

import java.time.LocalDate;
import java.util.UUID;
import org.springframework.stereotype.Component;
import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.license.dto.CreateLicenseRequest;
import com.supertech.backend.license.dto.LicenseActivationResponse;
import com.supertech.backend.license.dto.LicenseResponse;
import com.supertech.backend.license.dto.TrialLicenseResponse;
import com.supertech.backend.license.dto.UpadteLicenseRequest;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;
import com.supertech.backend.license.service.MachineFingerprintService;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.product.entity.Products;
import com.supertech.backend.user.entity.Users;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LicenseMapper {
        private final MachineFingerprintService machineFingerprintService;

        public License toEntity(CreateLicenseRequest request, Customers customer, Products products, Users createdBy,
                        Plans plan) {
                String licenseNumber = generateLicenseNumber();
                LocalDate issueDate = LocalDate.now();
                LocalDate activationDate = LocalDate.now();
                LocalDate expiryDate = issueDate.plusMonths(plan.getDurationMonths());
                String machineFingerprint = machineFingerprintService.sha256(request.machineFingerprint());

                return License.builder()
                                .licenseNumber(licenseNumber)
                                .licenseKey(UUID.randomUUID().toString())
                                .product(products)
                                .customers(customer)
                                .plans(plan)
                                .type(request.type())
                                .status(request.type() == LicenseType.OFFLINE ? LicenseStatus.ACTIVE
                                                : LicenseStatus.INACTIVE)
                                .activationDate(activationDate)
                                .issueDate(issueDate)
                                .expiryDate(expiryDate)
                                .machineFingerprint(machineFingerprint)
                                .licenseFileName(licenseNumber + ".lic")
                                .createdBy(createdBy)
                                .build();

        }

        public void updateEntity(UpadteLicenseRequest request, License license) {
                license.setStatus(request.status());

        }

        public LicenseResponse toResponse(License license) {

                return LicenseResponse.builder()
                                .id(license.getId())
                                .licenseNumber(license.getLicenseNumber())
                                .licenseKey(license.getLicenseKey())
                                .customerId(license.getCustomers().getId())
                                .customerName(license.getCustomers().getCompanyName())
                                .productId(license.getProduct().getId())
                                .productName(license.getProduct().getName())
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
                return "LIC-" + UUID.randomUUID()
                                .toString()
                                .substring(0, 8)
                                .toUpperCase();
        }

        public TrialLicenseResponse toTrialResponse(License license, byte[] licenseFile) {
                return TrialLicenseResponse.builder()
                                .licenseNumber(license.getLicenseNumber())
                                .customerName(license.getCustomers().getName())
                                .companyName(license.getCustomers().getCompanyName())
                                .planId(license.getPlans().getId())
                                .planMaxUser(license.getPlans().getMaxUsers())
                                .planName(license.getPlans().getName())
                                .planDescription(license.getPlans().getDescription())
                                .licenseKey(license.getLicenseKey())
                                .customerEmail(license.getCustomers().getEmail())
                                .type(license.getType())
                                .status(license.getStatus())
                                .issueDate(license.getIssueDate())
                                .activationDate(license.getActivationDate())
                                .expiryDate(license.getExpiryDate())
                                .machineFingerprint(license.getMachineFingerprint())
                                .licenseFileName(license.getLicenseFileName())
                                .productId(license.getProduct().getId())
                                .signature(license.getSignature())
                                .licenseFile(licenseFile)
                                .build();
        }

        public LicenseActivationResponse toLicenseActivationResponse(License license, byte[] licenseFile) {
                return LicenseActivationResponse.builder()
                                .licenseNumber(license.getLicenseNumber())
                                .customerName(license.getCustomers().getName())
                                .companyName(license.getCustomers().getCompanyName())
                                .planId(license.getPlans().getId())
                                .planMaxUser(license.getPlans().getMaxUsers())
                                .planName(license.getPlans().getName())
                                .planDescription(license.getPlans().getDescription())
                                .licenseKey(license.getLicenseKey())
                                .customerEmail(license.getCustomers().getEmail())
                                .type(license.getType())
                                .status(license.getStatus())
                                .issueDate(license.getIssueDate())
                                .activationDate(license.getActivationDate())
                                .expiryDate(license.getExpiryDate())
                                .machineFingerprint(license.getMachineFingerprint())
                                .licenseFileName(license.getLicenseFileName())
                                .productId(license.getProduct().getId())
                                .signature(license.getSignature())
                                .licenseFile(licenseFile)
                                .build();
        }

        public License createTrialLicense(
                        Customers customer,
                        Products product,
                        Plans plan,
                        String machineFingerprint) {

                String licenseNumber = generateLicenseNumber();
                LocalDate issueDate = LocalDate.now();
                LocalDate expiryDate = issueDate.plusMonths(plan.getDurationMonths());
                LocalDate activationDate = LocalDate.now();

                return License.builder()
                                .licenseNumber(licenseNumber)
                                .licenseKey(UUID.randomUUID().toString())
                                .customers(customer)
                                .product(product)
                                .status(LicenseStatus.ACTIVE)
                                .type(LicenseType.TRIAL)
                                .issueDate(issueDate)
                                .activationDate(activationDate)
                                .expiryDate(expiryDate)
                                .machineFingerprint(machineFingerprint)
                                .licenseFileName(licenseNumber + ".lic")
                                .plans(plan)
                                .build();
        }

}
