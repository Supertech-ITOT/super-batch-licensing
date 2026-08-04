package com.supertech.backend.user.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.common.exception.DuplicateResourceException;
import com.supertech.backend.common.exception.ResourceNotFoundException;
import com.supertech.backend.user.dto.CreateUserRequest;
import com.supertech.backend.user.dto.UpdateUserRequest;
import com.supertech.backend.user.dto.UserResponse;
import com.supertech.backend.user.entity.Users;
import com.supertech.backend.user.mapper.UserMapper;
import com.supertech.backend.user.repository.UserRepository;
import com.supertech.backend.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public void create(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email already exists");
        }
        Users user = userMapper.toEntity(request);
        userRepository.save(user);
    }

    @Override
    public void update(UpdateUserRequest request, Long id) {
        Users user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!user.getEmail().equals(request.email()) && userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists");
        }
        userMapper.updateEntity(request, user);
        userRepository.save(user);

    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getById(Long id) {
        Users user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAll() {
        return userRepository.findAll().stream().map(userMapper::toResponse).toList();

    }

    @Override
    public void delete(Long id) {
        Users user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }

}
