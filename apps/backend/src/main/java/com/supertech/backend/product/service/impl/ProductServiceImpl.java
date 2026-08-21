package com.supertech.backend.product.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.product.dto.CreateProductRequest;
import com.supertech.backend.product.dto.ProductResponse;
import com.supertech.backend.product.dto.UpdateProductRequest;
import com.supertech.backend.product.entity.Products;
import com.supertech.backend.product.mapper.ProductMapper;
import com.supertech.backend.product.repository.ProductRepository;
import com.supertech.backend.product.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public void create(CreateProductRequest request) {
        Products products = productMapper.toEntity(request);
        productRepository.save(products);
    }

    @Override
    public void update(UpdateProductRequest request, Long id) {
        Products products = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        productMapper.updateEntity(request, products);
        productRepository.save(products);
    }

    @Override
    public void delete(Long id) {
        Products products = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        productRepository.delete(products);
    }

    @Override
    public ProductResponse getById(Long Id) {
        Products products = productRepository.findById(Id)
                .orElseThrow(() -> new ResourceNotFoundException("Products not found"));
        return productMapper.toResponse(products);

    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.findAll().stream().map(productMapper::toResponse).toList();

    }
}