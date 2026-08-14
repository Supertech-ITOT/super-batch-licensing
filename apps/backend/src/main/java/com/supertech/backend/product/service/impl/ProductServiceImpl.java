package com.supertech.backend.product.service.impl;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.product.entity.Products;
import com.supertech.backend.product.repository.ProductRepository;
import com.supertech.backend.product.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Set<Products> getByIds(Set<Long> productIds) {

        return productIds.stream()
                .map(productId -> productRepository.findById(productId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Product not found: " + productId)))
                .collect(Collectors.toSet());
    }

    @Override
    public void create(Products product) {
        productRepository.save(product);
    }
}