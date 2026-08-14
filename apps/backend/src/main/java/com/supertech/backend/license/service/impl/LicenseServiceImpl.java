package com.supertech.backend.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.customer.repository.CustomerRepository;
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
import com.supertech.backend.product.repository.ProductRepository;
import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LicenseServiceImpl implements LicenseService {

        private final LicenseMapper licenseMapper;
        private final LicenseRepository licenseRepository;
        private final CustomerRepository customerRepository;
        private final PlanRepository planRepository;
        private final UserRepository userRepository;
        private final LicenseSigningService licenseSigningService;
        private final LicenseFileService licenseFileService;
        private final LicenseValidationService licenseValidationService;
        private final LicenseFactory licenseFactory;
        private final ProductRepository productRepository;
        private final CustomerService customerService;
        private final JavaMailSender mailSender;

        @Override
        @Transactional
        public void create(CreateLicenseRequest request, Long createdById) {
                Customers customer = customerRepository.findById(request.customerId())
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
                Products products = productRepository.findById(request.productId())
                                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
                Plans plan = planRepository.findById(request.planId())
                                .orElseThrow(() -> new ResourceNotFoundException("Plan not found"));
                Users createdBy = userRepository.findById(createdById)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                License license = licenseMapper.toEntity(request, customer, products, createdBy, plan);
                String signature = licenseSigningService.generateSignature(license);
                license.setSignature(signature);
                licenseRepository.save(license);
        }

        @Override
        @Transactional
        public void update(UpadteLicenseRequest request, Long id) {
                License license = licenseRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("License not found."));

                licenseMapper.updateEntity(request, license);
                licenseRepository.save(license);
        }

        @Override
        @Transactional
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

                Products product = productRepository.findById(request.productId())
                                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

                licenseValidationService.validateTrial(customer, product);

                License license = licenseFactory.createTrialLicense(
                                customer,
                                product,
                                request.machineFingerprint());

                String signature = licenseSigningService.generateSignature(license);

                license.setSignature(signature);

                License savedLicense = licenseRepository.save(license);

                byte[] licenseFile = licenseFileService.generateLicenseFile(savedLicense);
                return licenseMapper.toTrialResponse(savedLicense, licenseFile);

        }

        @Override
        public byte[] downloadLicenseKey(Long licenseId) {

                License license = licenseRepository.findById(licenseId)
                                .orElseThrow(() -> new ResourceNotFoundException("License Not Found"));

                if (license.getLicenseKey() == null || license.getLicenseKey().isBlank()) {
                        throw new BadRequestException("License key not available");
                }
                String content = "License Key: " + license.getLicenseKey();
                return content.getBytes(StandardCharsets.UTF_8);
        }

        @Override
        public byte[] downloadLicenseFile(Long licenseId) {

                License license = licenseRepository.findById(licenseId)
                                .orElseThrow(() -> new ResourceNotFoundException("License Not Found"));

                return licenseFileService.generateLicenseFile(license);
        }

        @Override
        public void sendLicenseKey(Long licenseId) {
                License license = licenseRepository.findById(licenseId)
                                .orElseThrow(() -> new ResourceNotFoundException("License Not Found"));
                Customers customers = license.getCustomers();

                if (customers == null || customers.getEmail() == null || customers.getEmail().isBlank()) {
                        throw new BadRequestException("Customer email not available");
                }

                if (license.getLicenseKey() == null || license.getLicenseKey().isBlank()) {
                        throw new BadRequestException("License key not available");
                }

                SimpleMailMessage message = new SimpleMailMessage();

                message.setTo(customers.getEmail());
                message.setSubject("Your Superbatch License Key");
                message.setText("""
                                Hello %s,

                                Your SuperBatch license has been created successfully.

                                License Number: %s
                                License Key: %s

                                Please use this license key to activate your SuperBatch software.

                                Regards,
                                SuperBatch Licensing Team
                                """.formatted(
                                customers.getName(),
                                license.getLicenseNumber(),
                                license.getLicenseKey()));
                mailSender.send(message);
        }

        @Override
        public void sendLicenseFile(Long licenseId) {

                License license = licenseRepository.findById(licenseId)
                                .orElseThrow(() -> new ResourceNotFoundException("License Not Found"));

                Customers customer = license.getCustomers();

                if (customer == null || customer.getEmail() == null || customer.getEmail().isBlank()) {
                        throw new BadRequestException("Customer email not available");
                }

                byte[] licenseFile = licenseFileService.generateLicenseFile(license);

                String fileName = license.getLicenseFileName();

                if (fileName == null || fileName.isBlank()) {
                        fileName = "superbatch-license.lic";
                }

                try {
                        MimeMessage mimeMessage = mailSender.createMimeMessage();

                        MimeMessageHelper helper = new MimeMessageHelper(
                                        mimeMessage,
                                        true,
                                        StandardCharsets.UTF_8.name());

                        helper.setTo(customer.getEmail());
                        helper.setSubject("Your SuperBatch License File");

                        helper.setText("""
                                        Hello %s,

                                        Your SuperBatch license has been created successfully.

                                        License Number: %s

                                        Please find your license file attached to this email.

                                        Regards,
                                        SuperBatch Licensing Team
                                        """.formatted(
                                        customer.getName(),
                                        license.getLicenseNumber()));

                        helper.addAttachment(
                                        fileName,
                                        new ByteArrayResource(licenseFile));

                        mailSender.send(mimeMessage);

                } catch (MessagingException e) {
                        throw new IllegalStateException(
                                        "Failed to send license file email", e);
                }
        }
}
