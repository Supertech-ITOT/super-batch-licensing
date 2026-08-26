package com.supertech.backend.product.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.supertech.backend.product.entity.Products;

public interface ProductRepository extends JpaRepository<Products, Long> {
    Optional<Products> findByCode(String code);

}
