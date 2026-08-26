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
                .name(request.name())
                .email(request.email().toLowerCase())
                .build();
    }

    public void updateEntity(UpdateCustomerRequest request, Customers customer) {
        customer.setCompanyName(request.companyName());
        customer.setName(request.name());
        customer.setEmail(request.email().toLowerCase());
    }

    public CustomerResponse toResponse(Customers customer) {

        return CustomerResponse.builder()
                .id(customer.getId())
                .name(customer.getName())
                .companyName(customer.getCompanyName())
                .email(customer.getEmail())
                .createdAt(customer.getCreatedAt())
                .updatedAt(customer.getUpdatedAt())
                .build();
    }

}
