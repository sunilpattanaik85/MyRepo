package com.example.fleet.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CountByLabel {
    private String label;
    private long count;
}
