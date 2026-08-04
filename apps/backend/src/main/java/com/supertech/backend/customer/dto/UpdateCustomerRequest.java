package com.supertech.backend.customer.dto;

import com.supertech.backend.customer.enums.CustomerStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder

public record UpdateCustomerRequest(

        @NotBlank(message = "Company name is required") String companyName,

        @NotBlank(message = "Email is required") @Email(message = "Invalid email address") String email,

        @NotNull(message = "Status is required") CustomerStatus status

) {

}
