package com.supertech.backend.license.service;

import java.util.List;

import com.supertech.backend.license.dto.CreateLicenseRequest;
import com.supertech.backend.license.dto.LicenseActivationRequest;
import com.supertech.backend.license.dto.LicenseActivationResponse;
import com.supertech.backend.license.dto.LicenseResponse;
import com.supertech.backend.license.dto.TrialLicenseRequest;
import com.supertech.backend.license.dto.TrialLicenseResponse;
import com.supertech.backend.license.dto.UpadteLicenseRequest;

public interface LicenseService {
    void create(CreateLicenseRequest request, Long createdById);

    void update(UpadteLicenseRequest request, Long id);

    void delete(Long id);

    List<LicenseResponse> getAll();

    LicenseResponse getById(Long id);

    TrialLicenseResponse activateTrial(TrialLicenseRequest request);

    LicenseActivationResponse activateLicense(LicenseActivationRequest request);

    byte[] downloadLicenseKey(Long licenseId);

    byte[] downloadLicenseFile(Long licenseId);

    void sendLicenseKey(Long licenseId);

    void sendLicenseFile(Long licenseId);
};
