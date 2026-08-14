package com.supertech.backend.license.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.supertech.backend.customer.entity.Customers;
import com.supertech.backend.license.enums.LicenseStatus;
import com.supertech.backend.license.enums.LicenseType;
import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.product.entity.Products;
import com.supertech.backend.user.entity.Users;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String licenseNumber;
    private String licenseKey;

    @ManyToOne(fetch = FetchType.LAZY)
    private Customers customers;

    @ManyToOne(fetch = FetchType.LAZY)
    private Plans plans;

    @ManyToOne(fetch = FetchType.LAZY)
    private Products product;

    @Enumerated(EnumType.STRING)
    private LicenseType type;

    @Enumerated(EnumType.STRING)
    private LicenseStatus status;

    private LocalDate issueDate;
    private LocalDate activationDate;
    private LocalDate expiryDate;
    private String machineFingerprint;

    @Lob
    private String signature;

    private String licenseFileName;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users createdBy;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
