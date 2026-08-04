package com.supertech.backend.customer.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.supertech.backend.common.dto.ApiResponse;
import com.supertech.backend.customer.dto.CreateCustomerRequest;
import com.supertech.backend.customer.dto.CustomerResponse;
import com.supertech.backend.customer.dto.UpdateCustomerRequest;
import com.supertech.backend.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Validated @RequestBody CreateCustomerRequest request) {
        customerService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Customer Created Successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@Validated @RequestBody @PathVariable Long id,
            UpdateCustomerRequest request) {
        customerService.update(request, id);
        return ResponseEntity.ok(ApiResponse.success("Customer Updated Successfully", null));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        customerService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Customer Deleted Successfully", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Customer fetched successfully", customerService.getById(id)));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<CustomerResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Customers fetched successfully", customerService.getAll()));
    }

}
