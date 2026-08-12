package com.supertech.backend.customer.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.common.exception.DuplicateResourceException;
import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.customer.dto.CreateCustomerRequest;
import com.supertech.backend.customer.dto.CustomerResponse;
import com.supertech.backend.customer.dto.UpdateCustomerRequest;
import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.customer.mapper.CustomerMapper;
import com.supertech.backend.customer.repository.CustomerRepository;
import com.supertech.backend.customer.service.CustomerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    public void create(CreateCustomerRequest request) {
        if (customerRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Customer email already exists");
        }

        Customers customer = customerMapper.toEntity(request);
        customerRepository.save(customer);
    }

    @Override
    public void update(UpdateCustomerRequest request, Long id) {
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        if (!customer.getEmail().equals(request.email()) && customerRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Customer email already exists");
        }

        customerMapper.updateEntity(request, customer);
        customerRepository.save(customer);

    }

    @Override
    public void delete(Long id) {
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        customerRepository.delete(customer);
    }

    @Override
    public List<CustomerResponse> getAll() {
        return customerRepository.findAll().stream().map(customerMapper::toResponse).toList();
    }

    @Override
    public CustomerResponse getById(Long id) {
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        return customerMapper.toResponse(customer);
    }

    @Override
    public Customers findOrCreate(String email, String name, String companyName) {
        return customerRepository.findByEmail(email)
                .orElseGet(() -> customerRepository.save(
                        Customers.builder()
                                .companyName(companyName)
                                .email(email)
                                .name(name)
                                .build()));
    }

    @Override
    public Customers getByIdEntity(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
    }

}
