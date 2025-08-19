package com.example.fleet.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SummaryDto {
    private long totalVehicles;
    private long activeVehicles;
    private double averageSpeed;
    private double totalDistanceTodayKm;
    private long activeCorridors;
}
