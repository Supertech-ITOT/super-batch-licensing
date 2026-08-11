package com.supertech.backend.authentication.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.supertech.backend.authentication.dto.LoginRequest;
import com.supertech.backend.authentication.dto.LoginResponse;
import com.supertech.backend.authentication.service.AuthService;
import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.common.security.JwtService;
import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public LoginResponse response(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        Users user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResourceNotFoundException(
                    "Invalid email or password");
        }
        userRepository.save(user);
        user.setLastLogin(LocalDateTime.now());
        String token = jwtService.generateToken(user);

        LoginResponse loginResponse = LoginResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .isSystemAccount(user.isSystemAccount())
                .accessToken(token)
                .passwordChangeRequired(user.isPasswordChangeRequired())
                .build();
        return loginResponse;
    }

    @Override
    public Void logout() {
        return null;
    }

}
