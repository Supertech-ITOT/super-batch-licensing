package com.supertech.backend.authentication.service;

import com.supertech.backend.authentication.dto.LoginRequest;
import com.supertech.backend.authentication.dto.LoginResponse;

public interface AuthService {
    LoginResponse response(LoginRequest request);

    Void logout();

}
