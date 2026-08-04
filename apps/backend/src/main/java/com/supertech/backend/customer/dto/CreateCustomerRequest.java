package com.supertech.backend.customer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Builder

public record CreateCustomerRequest(
        @NotBlank(message = "Company name is required") String companyName,

        @NotBlank(message = "Email is required") @Email(message = "Invalid email address") String email

) {

}
