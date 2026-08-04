package com.supertech.backend.common.exception;

import org.springframework.http.HttpStatus;

public class DuplicateResourceException
        extends ApplicationException {

    public DuplicateResourceException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}