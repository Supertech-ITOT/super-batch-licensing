package com.supertech.backend.common.security;

import com.supertech.backend.user.entity.Users;

public interface JwtService {
    String generateToken(Users user);

    Long extractUserId(String token);

    String extractRole(String token);

    boolean validateToken(String token);
}
