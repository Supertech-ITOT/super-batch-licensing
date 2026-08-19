package com.supertech.backend.user.service;

import java.util.List;

import com.supertech.backend.user.dto.ChangePasswordRequest;
import com.supertech.backend.user.dto.CreateUserRequest;
import com.supertech.backend.user.dto.ResetFirstPasswordRequest;
import com.supertech.backend.user.dto.ResetPasswordRequest;
import com.supertech.backend.user.dto.UpdateUserRequest;
import com.supertech.backend.user.dto.UserResponse;

public interface UserService {
    void create(CreateUserRequest request);

    void update(UpdateUserRequest request, Long id);

    UserResponse getById(Long id);

    UserResponse getCurrentUser(Long currentUserId);

    List<UserResponse> getAll();

    void delete(Long id);

    void changePassword(ChangePasswordRequest request, Long currentUserId);

    void resetFirstPassword(ResetFirstPasswordRequest request, Long currentUserId);

    void resetPassword(ResetPasswordRequest request, Long currentUserId);

}
