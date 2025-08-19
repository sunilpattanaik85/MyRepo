package com.example.fleet.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AvgByLabel {
    private String label;
    private double average;
}
