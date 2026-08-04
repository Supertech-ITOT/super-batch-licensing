package com.supertech.backend.user.service;

import java.util.List;

import com.supertech.backend.user.dto.CreateUserRequest;
import com.supertech.backend.user.dto.UpdateUserRequest;
import com.supertech.backend.user.dto.UserResponse;

public interface UserService {
    void create(CreateUserRequest request);

    void update(UpdateUserRequest request, Long id);

    UserResponse getById(Long id);

    List<UserResponse> getAll();

    void delete(Long id);

}
