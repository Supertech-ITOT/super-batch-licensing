package com.supertech.backend.user.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.supertech.backend.common.dto.ApiResponse;
import com.supertech.backend.user.dto.CreateUserRequest;
import com.supertech.backend.user.dto.UpdateUserRequest;
import com.supertech.backend.user.dto.UserResponse;
import com.supertech.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/user")
@RestController

public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Validated @RequestBody CreateUserRequest request) {
        userService.create(request);
        return ResponseEntity.ok(ApiResponse.success("User created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Validated @RequestBody UpdateUserRequest request) {
        userService.update(request, id);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully", userService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully", userService.getAll()));
    }

}
