package com.supertech.backend.license.validation.impl;

import org.springframework.stereotype.Service;

import com.supertech.backend.common.exception.DuplicateResourceException;
import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.license.enums.LicenseType;
import com.supertech.backend.license.repository.LicenseRepository;
import com.supertech.backend.license.validation.LicenseValidationService;
import com.supertech.backend.product.entity.Products;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseValidationServiceImpl
                implements LicenseValidationService {

        private final LicenseRepository licenseRepository;

        @Override
        public void validateTrial(
                        Customers customer,
                        Products product) {

                boolean trialExists = licenseRepository
                                .existsByCustomers_IdAndTypeAndProductId(
                                                customer.getId(),
                                                LicenseType.TRIAL,
                                                product.getId());

                if (trialExists) {
                        throw new DuplicateResourceException(
                                        "Trial already exists for product: "
                                                        + product.getName());
                }
        }
}