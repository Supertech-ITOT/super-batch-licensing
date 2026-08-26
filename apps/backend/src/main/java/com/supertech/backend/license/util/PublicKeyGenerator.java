package com.supertech.backend.license.util;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateCrtKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;

public class PublicKeyGenerator {

    public static String generatePublicKey(String base64PrivateKey) throws Exception {

        // Decode Base64 private key
        byte[] privateKeyBytes = Base64.getDecoder().decode(base64PrivateKey);

        // Convert bytes to PrivateKey
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey privateKey = keyFactory.generatePrivate(new java.security.spec.PKCS8EncodedKeySpec(privateKeyBytes));

        // RSA private key contains public modulus and exponent
        RSAPrivateCrtKey rsaPrivateKey = (RSAPrivateCrtKey) privateKey;
        RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(rsaPrivateKey.getModulus(),
                rsaPrivateKey.getPublicExponent());

        // Generate PublicKey
        PublicKey publicKey = keyFactory.generatePublic(publicKeySpec);

        // Return Base64 encoded public key
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }
}