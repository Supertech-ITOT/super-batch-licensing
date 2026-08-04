package com.supertech.backend.authentication.service.impl;

import org.springframework.stereotype.Service;

import com.supertech.backend.authentication.dto.LoginRequest;
import com.supertech.backend.authentication.dto.LoginResponse;
import com.supertech.backend.authentication.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Override
    public LoginResponse response(LoginRequest request) {
        return null;
    }

    @Override
    public Void logout() {
        return null;
    }

}
