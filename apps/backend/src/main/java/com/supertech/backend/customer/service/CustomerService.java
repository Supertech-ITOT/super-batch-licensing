package com.supertech.backend.customer.service;

import java.util.List;

import com.supertech.backend.customer.dto.CreateCustomerRequest;
import com.supertech.backend.customer.dto.CustomerResponse;
import com.supertech.backend.customer.dto.UpdateCustomerRequest;

public interface CustomerService {
    void create(CreateCustomerRequest request);

    void update(UpdateCustomerRequest request, Long id);

    void delete(Long id);

    List<CustomerResponse> getAll();

    CustomerResponse getById(Long id);
}
