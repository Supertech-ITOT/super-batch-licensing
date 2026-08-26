package com.supertech.backend.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Service;

import com.supertech.backend.common.exception.BadRequestException;
import com.supertech.backend.license.service.MachineFingerprintService;

@Service
public class MachineFingerprintServiceImpl implements MachineFingerprintService {

    @Override
    public String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder result = new StringBuilder();
            for (byte b : hash) {
                result.append(String.format("%02x", b));
            }
            return result.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new BadRequestException("SHA-256 algorithm not available.");
        }
    }
}
