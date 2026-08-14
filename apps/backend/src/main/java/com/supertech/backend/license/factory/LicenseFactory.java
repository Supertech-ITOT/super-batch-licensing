package com.supertech.backend.license.factory;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;
import com.supertech.backend.product.entity.Products;

@Component
public class LicenseFactory {

        public License createTrialLicense(
                        Customers customer,
                        Products product,
                        String machineFingerprint) {

                String licenseNumber = "LIC-" + UUID.randomUUID()
                                .toString()
                                .substring(0, 8)
                                .toUpperCase();

                return License.builder()
                                .licenseNumber(licenseNumber)
                                .licenseKey(UUID.randomUUID().toString())
                                .customers(customer)
                                .product(product)
                                .status(LicenseStatus.ACTIVE)
                                .type(LicenseType.TRIAL)
                                .issueDate(LocalDate.now())
                                .activationDate(LocalDate.now())
                                .expiryDate(LocalDate.now().plusDays(30))
                                .machineFingerprint(machineFingerprint)
                                .licenseFileName(licenseNumber + ".lic")
                                .build();
        }
}