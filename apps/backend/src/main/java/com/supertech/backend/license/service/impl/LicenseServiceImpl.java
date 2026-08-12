package com.supertech.backend.license.service.impl;

import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.customer.service.CustomerService;
import com.supertech.backend.license.dto.CreateLicenseRequest;
import com.supertech.backend.license.dto.LicenseResponse;
import com.supertech.backend.license.dto.TrialLicenseRequest;
import com.supertech.backend.license.dto.TrialLicenseResponse;
import com.supertech.backend.license.dto.UpadteLicenseRequest;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.factory.LicenseFactory;
import com.supertech.backend.license.mapper.LicenseMapper;
import com.supertech.backend.license.repository.LicenseRepository;
import com.supertech.backend.license.service.LicenseFileService;
import com.supertech.backend.license.service.LicenseService;
import com.supertech.backend.license.service.LicenseSigningService;
import com.supertech.backend.license.validation.LicenseValidationService;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.plan.repository.PlanRepository;
import com.supertech.backend.product.entity.Products;
import com.supertech.backend.product.service.ProductService;
import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class LicenseServiceImpl implements LicenseService {

        private final LicenseMapper licenseMapper;
        private final LicenseRepository licenseRepository;
        private final CustomerService customerService;
        private final PlanRepository planRepository;
        private final UserRepository userRepository;
        private final LicenseSigningService licenseSigningService;
        private final LicenseFileService licenseFileService;
        private final ProductService productService;
        private final LicenseValidationService licenseValidationService;
        private final LicenseFactory licenseFactory;

        @Override
        public void create(CreateLicenseRequest request, Long createdById) {
                Customers customer = customerService.getByIdEntity(request.customerId());

                Plans plan = planRepository.findById(request.planId())
                                .orElseThrow(() -> new ResourceNotFoundException("Plan not found"));

                Users createdBy = userRepository.findById(createdById)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                License license = licenseMapper.toEntity(request, customer, createdBy, plan);
                licenseRepository.save(license);
        }

        @Override
        public void update(UpadteLicenseRequest request, Long id) {
                License license = licenseRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("License not found."));

                licenseMapper.updateEntity(request, license);
                licenseRepository.save(license);
        }

        @Override
        public void delete(Long id) {
                License license = licenseRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("License not found"));
                licenseRepository.delete(license);
        }

        @Override
        public List<LicenseResponse> getAll() {
                return licenseRepository.findAll().stream().map(licenseMapper::toResponse).toList();

        }

        @Override
        public LicenseResponse getById(Long id) {
                License license = licenseRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("License not found"));
                return licenseMapper.toResponse(license);
        }

        @Override
        @Transactional
        public TrialLicenseResponse getTrialLicense(TrialLicenseRequest request) {
                Customers customer = customerService.findOrCreate(
                                request.email(),
                                request.name(),
                                request.companyName());

                Set<Products> products = productService.getByIds(request.productIds());

                products.forEach(product -> licenseValidationService.validateTrial(
                                customer,
                                product));
                License license = licenseFactory.createTrialLicense(
                                customer,
                                products,
                                request.machineFingerprint());

                String signature = licenseSigningService.generateSignature(license);

                license.setSignature(signature);

                License savedLicense = licenseRepository.save(license);

                byte[] licenseFile = licenseFileService.generateLicenseFile(savedLicense);
                return licenseMapper.toTrialResponse(
                                savedLicense,
                                licenseFile);

        }

}
