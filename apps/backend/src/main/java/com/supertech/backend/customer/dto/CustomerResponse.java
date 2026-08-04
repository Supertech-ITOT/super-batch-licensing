package com.supertech.backend.customer.dto;

import java.time.LocalDateTime;

import com.supertech.backend.customer.enums.CustomerStatus;

import lombok.*;

@Builder
public record CustomerResponse(
        Long id,

        String companyName,

        String email,

        CustomerStatus status,

        LocalDateTime createdAt,

        LocalDateTime updatedAt) {

}
