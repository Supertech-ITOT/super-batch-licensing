package com.supertech.backend.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateProductRequest(
                @NotBlank(message = "Product name is required") @Size(max = 100, message = "Product name must not exceed 100 characters") String name,

                @NotBlank(message = "Product code is required") @Size(max = 50, message = "Product code must not exceed 50 characters") String code,

                @Size(max = 500, message = "Description must not exceed 500 characters") String description) {

}
