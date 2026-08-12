package com.supertech.backend.license.config;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LicenseKeyConfig {

    @Value("${license.private-key}")
    private String privateKeyValue;

    @Bean
    public PrivateKey privateKey() throws Exception {

        byte[] keyBytes = Base64.getDecoder().decode(privateKeyValue);

        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        return keyFactory.generatePrivate(keySpec);
    }
}