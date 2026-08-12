package com.supertech.backend.license.service;

import com.supertech.backend.license.entity.License;

public interface LicenseFileService {
    byte[] generateLicenseFile(License license);
}
