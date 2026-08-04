package com.supertech.backend.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.backend.customer.entity.Customers;

public interface CustomerRepository extends JpaRepository<Customers, Long> {
    boolean existsByEmail(String email);
}
