package com.supertech.backend.common.security.impl;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.supertech.backend.common.security.UserContextService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserContextServiceImpl implements UserContextService {

    @Override
    public Long getCurrentUserId() {
        return (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }
}