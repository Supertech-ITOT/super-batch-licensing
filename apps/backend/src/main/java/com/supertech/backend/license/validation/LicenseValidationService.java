package com.supertech.backend.license.validation;

import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.product.entity.Products;

public interface LicenseValidationService {
    void validateTrial(Customers customer, Products product);

}
