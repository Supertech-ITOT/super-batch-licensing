package com.supertech.backend.license.dto;

import jakarta.validation.constraints.NotBlank;

public record ChangeMachineRequest(
        @NotBlank String machineFingerprint) {

}
