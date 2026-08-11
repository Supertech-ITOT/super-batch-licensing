package com.supertech.backend.common.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.count() == 0) {

            Users admin = Users.builder()
                    .name("Administrator")
                    .email("itotsoftware@supertech.co.in")
                    .password(passwordEncoder.encode("Super@123"))
                    .systemAccount(true)
                    .build();

            userRepository.save(admin);

            System.out.println("Default admin user created.");
        }
    }
}