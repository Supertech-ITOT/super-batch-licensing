package com.supertech.backend.authentication.dto;

import lombok.Builder;

@Builder
public record LoginResponse(
                Long userId,
                String name,
                String email,
                Boolean isSystemAccount,
                String accessToken,
                boolean passwordChangeRequired) {

}
