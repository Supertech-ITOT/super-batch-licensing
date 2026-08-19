package com.supertech.backend.user.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record UserResponse(
                Long id,
                String name,
                String email,
                LocalDateTime lastLogin,
                LocalDateTime createdAt,
                LocalDateTime updatedAt,
                Boolean systemAccount,
                Boolean passwordChangedRequired

) {

}
