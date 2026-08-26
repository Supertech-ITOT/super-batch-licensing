package com.supertech.backend.common.initializer;

import com.supertech.backend.product.entity.Products;
import com.supertech.backend.product.repository.ProductRepository;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.supertech.backend.plan.entity.Plans;
import com.supertech.backend.plan.repository.PlanRepository;
import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SystemInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PlanRepository planRepository;

    @Override
    public void run(String... args) {
        seedPlan();
        seedUser();
        seedProduct();
    }

    private void seedPlan() {
        if (planRepository.count() == 0) {
            Plans plan = Plans.builder()
                    .name("Trial")
                    .code("TRIAL")
                    .description("Temporaray Plans")
                    .canDelete(false)
                    .durationMonths(12)
                    .maxUsers(5)
                    .price(0)
                    .build();
            planRepository.save(plan);
        }

    }

    private void seedUser() {
        if (userRepository.count() == 0) {
            Users admin = Users.builder()
                    .name("Administrator")
                    .email("itotsoftware@supertech.co.in")
                    .password(passwordEncoder.encode("Super@123"))
                    .systemAccount(true)
                    .build();
            userRepository.save(admin);
        }
    }

    private void seedProduct() {

        if (productRepository.count() == 0) {

            Products superBatch = Products.builder()
                    .name("Super Batch")
                    .code("SUPER_BATCH")
                    .description("Batch management software.")
                    .canDelete(false)
                    .build();

            Products batchPortal = Products.builder()
                    .name("Batch Portal")
                    .code("BATCH_PORTAL")
                    .description("Batch report software.")
                    .canDelete(false)
                    .build();

            productRepository.saveAll(List.of(superBatch, batchPortal));
        }
    }
}