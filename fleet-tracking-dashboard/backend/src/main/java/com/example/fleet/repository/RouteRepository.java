package com.example.fleet.repository;

import com.example.fleet.model.Route;
import com.example.fleet.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByVehicle(Vehicle vehicle);
    List<Route> findByVehicleAndStartedAtBetween(Vehicle vehicle, Instant start, Instant end);
}
