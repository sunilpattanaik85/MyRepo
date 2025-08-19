package com.example.fleet.repository;

import com.example.fleet.model.Vehicle;
import com.example.fleet.model.VehicleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByVehicleId(String vehicleId);

    List<Vehicle> findByStatus(VehicleStatus status);

    @Query("select v from Vehicle v where (:q is null or lower(v.vehicleId) like lower(concat(%,:q,%)) or lower(v.driverName) like lower(concat(%,:q,%))) ")
    List<Vehicle> search(@Param("q") String query);

    @Query("select count(v) from Vehicle v where v.status = ACTIVE")
    long countActive();

    @Query("select avg(v.lastSpeed) from Vehicle v")
    Double averageSpeed();

    @Query("select sum(r.totalDistanceKm) from Route r where r.startedAt >= :start and r.startedAt < :end")
    Double totalDistanceBetween(@Param("start") Instant start, @Param("end") Instant end);
}
