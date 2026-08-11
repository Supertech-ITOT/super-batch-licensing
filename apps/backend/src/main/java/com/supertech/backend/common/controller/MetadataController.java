package com.supertech.backend.common.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.backend.common.dto.ApiResponse;
import com.supertech.backend.common.dto.OptionDto;
import com.supertech.backend.common.util.EnumUtil;
import com.supertech.backend.license.enums.LicenseType;

@RestController
@RequestMapping("/api/metadata")
@CrossOrigin
public class MetadataController {
    @GetMapping("/license-types")
    public ResponseEntity<ApiResponse<List<OptionDto>>> getLicenseTypes() {
        List<OptionDto> data = Arrays.stream(LicenseType.values()).map(type -> new OptionDto(
                EnumUtil.formatLabel(type.name()),
                type.name()))
                .toList();
        return ResponseEntity.ok(ApiResponse.success("License types fetched successfully", data));

    }

}
