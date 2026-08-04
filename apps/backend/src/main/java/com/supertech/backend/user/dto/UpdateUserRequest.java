package com.supertech.backend.user.dto;

import com.supertech.backend.user.enums.UserStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRequest(
        @NotBlank(message = "Name is required") String name,

        @NotBlank(message = "Email is required") @Email(message = "Invalid email address") String email,

        @NotNull(message = "Status is required") UserStatus status

) {

}
