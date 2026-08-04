package com.supertech.backend.user.dto;

import java.time.LocalDateTime;

import com.supertech.backend.user.enums.UserStatus;

import lombok.Builder;

@Builder
public record UserResponse(
        Long id,
        String name,
        String email,
        UserStatus status,
        LocalDateTime lastLogin,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

}
