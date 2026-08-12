package com.supertech.backend.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.backend.license.entity.License;
import com.supertech.backend.license.enums.LicenseType;

public interface LicenseRepository extends JpaRepository<License, Long> {
    boolean existsByCustomers_IdAndTypeAndProducts_Id(
            Long customerId,
            LicenseType type,
            Long productId);

    boolean existsByLicenseNumber(String licenseNumber);
}
