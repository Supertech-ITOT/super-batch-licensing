package com.supertech.backend.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.backend.license.entity.License;

public interface LicenseRepository extends JpaRepository<License, Long> {

}
