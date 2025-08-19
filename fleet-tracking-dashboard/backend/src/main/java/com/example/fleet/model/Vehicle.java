package com.example.fleet.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vehicle_id", nullable = false, unique = true, length = 64)
    private String vehicleId;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(name = "driver_name", length = 100)
    private String driverName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private VehicleStatus status = VehicleStatus.IDLE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corridor_id")
    private Corridor corridor;

    @Column(name = "fuel_level")
    private Double fuelLevel;

    @Column(name = "last_speed")
    private Double lastSpeed;

    @Column(name = "last_lat")
    private Double lastLat;

    @Column(name = "last_lng")
    private Double lastLng;

    @Column(name = "last_updated")
    private Instant lastUpdated;
}
