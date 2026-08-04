package com.supertech.backend.authentication.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,
        String userName) {

}
