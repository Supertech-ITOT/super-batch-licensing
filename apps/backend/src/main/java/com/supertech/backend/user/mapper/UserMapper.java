package com.supertech.backend.user.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.supertech.backend.user.dto.CreateUserRequest;
import com.supertech.backend.user.dto.UpdateUserRequest;
import com.supertech.backend.user.dto.UserResponse;
import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.enums.UserStatus;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final PasswordEncoder passwordEncoder;

    public Users toEntity(CreateUserRequest request) {
        return Users.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .status(UserStatus.ACTIVE)
                .build();
    }

    public void updateEntity(UpdateUserRequest request, Users user) {

        user.setName(request.name());
        user.setEmail(request.email());
        user.setStatus(request.status());
    }

    public UserResponse toResponse(Users user) {

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .status(user.getStatus())
                .lastLogin(user.getLastLogin())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

}
