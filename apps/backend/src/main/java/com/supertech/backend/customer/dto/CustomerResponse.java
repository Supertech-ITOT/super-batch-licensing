package com.supertech.backend.customer.dto;

import java.time.LocalDateTime;

import lombok.*;

@Builder
public record CustomerResponse(
                Long id,

                String companyName,

                String email,

                LocalDateTime createdAt,

                LocalDateTime updatedAt) {

}
