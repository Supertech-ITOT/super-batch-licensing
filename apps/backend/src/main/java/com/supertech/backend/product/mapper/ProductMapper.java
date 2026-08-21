package com.supertech.backend.product.mapper;

import org.springframework.stereotype.Component;

import com.supertech.backend.product.dto.CreateProductRequest;
import com.supertech.backend.product.dto.ProductResponse;
import com.supertech.backend.product.dto.UpdateProductRequest;
import com.supertech.backend.product.entity.Products;

@Component
public class ProductMapper {

    public Products toEntity(CreateProductRequest request) {
        return Products.builder()
                .name(request.name())
                .code(request.code())
                .description(request.description())
                .build();
    }

    public void updateEntity(UpdateProductRequest request, Products products) {
        products.setName(request.name());
        products.setCode(request.code());
        products.setDescription(request.description());

    }

    public ProductResponse toResponse(Products products) {
        return ProductResponse.builder()
                .id(products.getId())
                .name(products.getName())
                .code(products.getCode())
                .description(products.getDescription())
                .createdAt(products.getCreatedAt())
                .updatedAt(products.getUpdatedAt())
                .build();
    }

}
