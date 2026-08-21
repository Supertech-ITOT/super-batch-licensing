package com.supertech.backend.product.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record ProductResponse(
        Long id,
        String name,
        String code,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

}
