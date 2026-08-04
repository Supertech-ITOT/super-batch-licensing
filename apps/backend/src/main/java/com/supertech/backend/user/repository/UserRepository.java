package com.supertech.backend.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.backend.user.entity.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    boolean existsByEmail(String email);
}
