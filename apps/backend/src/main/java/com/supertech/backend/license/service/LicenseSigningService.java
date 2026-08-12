package com.supertech.backend.license.service;

import com.supertech.backend.license.entity.License;

public interface LicenseSigningService {
    String generateSignature(License license);

}
