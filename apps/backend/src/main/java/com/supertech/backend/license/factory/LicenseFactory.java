package com.supertech.backend.license.factory;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.product.entity.Products;

@Component
public class LicenseFactory {

        public License createTrialLicense(
                        Customers customer,
                        Products product,
                        Plans plan,
                        String machineFingerprint) {

                String licenseNumber = "LIC-" + UUID.randomUUID()
                                .toString()
                                .substring(0, 8)
                                .toUpperCase();

                LocalDate issueDate = LocalDate.now();

                LocalDate expiryDate = issueDate.plusMonths(
                                plan.getDurationMonths());

                return License.builder()
                                .licenseNumber(licenseNumber)
                                .licenseKey(UUID.randomUUID().toString())
                                .customers(customer)
                                .product(product)
                                .status(LicenseStatus.ACTIVE)
                                .type(LicenseType.TRIAL)
                                .issueDate(issueDate)
                                .activationDate(LocalDateTime.now())
                                .expiryDate(expiryDate)
                                .machineFingerprint(machineFingerprint)
                                .licenseFileName(licenseNumber + ".lic")
                                .plans(plan)
                                .build();
        }
}