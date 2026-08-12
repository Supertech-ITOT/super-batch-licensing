package com.supertech.backend.customer.mapper;

import org.springframework.stereotype.Component;

import com.supertech.backend.customer.dto.CreateCustomerRequest;
import com.supertech.backend.customer.dto.CustomerResponse;
import com.supertech.backend.customer.dto.UpdateCustomerRequest;
import com.supertech.backend.customer.entity.Customers;

@Component
public class CustomerMapper {
    public Customers toEntity(CreateCustomerRequest request) {
        return Customers.builder()
                .companyName(request.companyName())
                .email(request.email())
                .build();
    }

    public void updateEntity(UpdateCustomerRequest request, Customers customer) {
        customer.setCompanyName(request.companyName());
        customer.setEmail(request.email());
    }

    public CustomerResponse toResponse(Customers customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getCompanyName(),
                customer.getEmail(),
                customer.getCreatedAt(),
                customer.getUpdatedAt());
    }

}
