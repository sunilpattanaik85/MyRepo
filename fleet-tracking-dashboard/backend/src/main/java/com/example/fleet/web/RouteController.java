package com.example.fleet.web;

import com.example.fleet.model.Route;
import com.example.fleet.model.Vehicle;
import com.example.fleet.repository.RouteRepository;
import com.example.fleet.repository.VehicleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {
    private final RouteRepository routeRepository;
    private final VehicleRepository vehicleRepository;

    public RouteController(RouteRepository routeRepository, VehicleRepository vehicleRepository) {
        this.routeRepository = routeRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping
    public List<Route> all() { return routeRepository.findAll(); }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Route>> byVehicle(@PathVariable String vehicleId,
                                                 @RequestParam(value = "start", required = false) Instant start,
                                                 @RequestParam(value = "end", required = false) Instant end) {
        return vehicleRepository.findByVehicleId(vehicleId).map(v -> {
            if (start != null && end != null) return ResponseEntity.ok(routeRepository.findByVehicleAndStartedAtBetween(v, start, end));
            return ResponseEntity.ok(routeRepository.findByVehicle(v));
        }).orElse(ResponseEntity.notFound().build());
    }
}
