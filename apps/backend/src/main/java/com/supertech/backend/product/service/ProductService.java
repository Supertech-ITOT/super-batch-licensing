package com.supertech.backend.product.service;

import java.util.List;

import com.supertech.backend.product.dto.CreateProductRequest;
import com.supertech.backend.product.dto.ProductResponse;
import com.supertech.backend.product.dto.UpdateProductRequest;

public interface ProductService {
    void create(CreateProductRequest request);

    void update(UpdateProductRequest request, Long id);

    void delete(Long id);

    ProductResponse getById(Long Id);

    List<ProductResponse> getAll();

}
