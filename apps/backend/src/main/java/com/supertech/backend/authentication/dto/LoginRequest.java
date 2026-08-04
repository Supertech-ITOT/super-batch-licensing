package com.supertech.backend.authentication.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(

                @NotBlank(message = "Email is Required") @Email(message = "Invalid email") String email,

                @NotBlank(message = "Password is Required") String password) {

}
