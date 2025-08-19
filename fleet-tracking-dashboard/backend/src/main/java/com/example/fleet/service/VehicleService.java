package com.example.fleet.service;

import com.example.fleet.model.*;
import com.example.fleet.repository.*;
import com.example.fleet.service.dto.SummaryDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.*;

@Service
@Transactional(readOnly = true)
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final CorridorRepository corridorRepository;
    private final RouteRepository routeRepository;

    public VehicleService(VehicleRepository vehicleRepository, CorridorRepository corridorRepository, RouteRepository routeRepository) {
        this.vehicleRepository = vehicleRepository;
        this.corridorRepository = corridorRepository;
        this.routeRepository = routeRepository;
    }

    public SummaryDto getSummary() {
        long total = vehicleRepository.count();
        long active = vehicleRepository.countActive();
        Double avgSpeed = Optional.ofNullable(vehicleRepository.averageSpeed()).orElse(0.0);
        LocalDate today = LocalDate.now(ZoneId.systemDefault());
        Instant start = today.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant end = today.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        Double distance = Optional.ofNullable(vehicleRepository.totalDistanceBetween(start, end)).orElse(0.0);
        long activeCorridors = corridorRepository.count();
        return new SummaryDto(total, active, avgSpeed, distance, activeCorridors);
    }
}
