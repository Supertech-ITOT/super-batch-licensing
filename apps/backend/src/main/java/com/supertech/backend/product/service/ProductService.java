package com.supertech.backend.product.service;

import java.util.Set;

import com.supertech.backend.product.entity.Products;

public interface ProductService {
    Set<Products> getByIds(Set<Long> productIds);

}
