package com.supertech.backend.license.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.customer.repository.CustomerRepository;
import com.supertech.backend.license.dto.CreateLicenseRequest;
import com.supertech.backend.license.dto.LicenseResponse;
import com.supertech.backend.license.dto.UpadteLicenseRequest;
import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.mapper.LicenseMapper;
import com.supertech.backend.license.repository.LicenseRepository;
import com.supertech.backend.license.service.LicenseService;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.plan.repository.PlanRepository;
import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class LicenseServiceImpl implements LicenseService {

    private final LicenseMapper licenseMapper;
    private final LicenseRepository licenseRepository;
    private final CustomerRepository customerRepository;
    private final PlanRepository planRepository;
    private final UserRepository userRepository;

    @Override
    public void create(CreateLicenseRequest request, Long createdById) {
        Customers customer = customerRepository.findById(request.customerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

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

}
