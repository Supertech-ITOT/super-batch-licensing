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
import com.supertech.backend.common.security.UserContextService;
import com.supertech.backend.user.dto.ChangePasswordRequest;
import com.supertech.backend.user.dto.CreateUserRequest;
import com.supertech.backend.user.dto.ResetFirstPasswordRequest;
import com.supertech.backend.user.dto.ResetPasswordRequest;
import com.supertech.backend.user.dto.UpdateUserRequest;
import com.supertech.backend.user.dto.UserResponse;
import com.supertech.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/user")
@RestController

public class UserController {
    private final UserService userService;
    private final UserContextService userContextService;

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

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser() {
        Long id = userContextService.getCurrentUserId();
        return ResponseEntity
                .ok(ApiResponse.success("User fetched successfully", userService.getCurrentUser(id)));
    }

    @PutMapping("/me/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Validated @RequestBody ChangePasswordRequest request) {
        Long currentUserId = userContextService.getCurrentUserId();
        userService.changePassword(request, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully.", null));
    }

    @PutMapping("/me/reset-first-password")
    public ResponseEntity<ApiResponse<Void>> resetFirstPassword(
            @Validated @RequestBody ResetFirstPasswordRequest request) {
        Long currentUserId = userContextService.getCurrentUserId();
        userService.resetFirstPassword(request, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Password reset successfully.", null));
    }

    @PutMapping("/{id}/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @PathVariable Long id,
            @Validated @RequestBody ResetPasswordRequest request) {

        userService.resetPassword(request, id);
        return ResponseEntity.ok(ApiResponse.success("Password reset successfully.", null));
    }

}
