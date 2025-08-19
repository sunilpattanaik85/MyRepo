-- Schema and seed for Fleet Tracking
DROP DATABASE IF EXISTS fleetdb;
CREATE DATABASE fleetdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fleetdb;

-- Corridors
CREATE TABLE corridors (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  direction ENUM("NORTH","SOUTH","EAST","WEST") NOT NULL
);

-- Vehicles
CREATE TABLE vehicles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vehicle_id VARCHAR(64) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL,
  driver_name VARCHAR(100),
  status ENUM("ACTIVE","IDLE","MAINTENANCE","OFFLINE") NOT NULL DEFAULT "IDLE",
  corridor_id BIGINT,
  fuel_level DOUBLE DEFAULT 100,
  last_speed DOUBLE DEFAULT 0,
  last_lat DOUBLE,
  last_lng DOUBLE,
  last_updated TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_vehicle_corridor FOREIGN KEY (corridor_id) REFERENCES corridors(id)
);

-- Routes
CREATE TABLE routes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vehicle_id BIGINT NOT NULL,
  started_at DATETIME NOT NULL,
  ended_at DATETIME,
  total_distance_km DOUBLE DEFAULT 0,
  avg_speed_kmh DOUBLE DEFAULT 0,
  CONSTRAINT fk_routes_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Route points for visualization
CREATE TABLE route_points (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  route_id BIGINT NOT NULL,
  seq INT NOT NULL,
  lat DOUBLE NOT NULL,
  lng DOUBLE NOT NULL,
  speed DOUBLE,
  fuel_level DOUBLE,
  ts DATETIME NOT NULL,
  CONSTRAINT fk_routepoints_route FOREIGN KEY (route_id) REFERENCES routes(id)
);

-- Alerts
CREATE TABLE alerts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vehicle_id BIGINT NOT NULL,
  category ENUM("LOW_FUEL","MAINTENANCE","SPEEDING","OFFLINE") NOT NULL,
  message VARCHAR(255) NOT NULL,
  severity ENUM("LOW","MEDIUM","HIGH") NOT NULL DEFAULT "LOW",
  created_at DATETIME NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_alerts_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Seed corridors
INSERT INTO corridors (name, direction) VALUES
 ("North Corridor","NORTH"),
 ("South Corridor","SOUTH"),
 ("East Corridor","EAST"),
 ("West Corridor","WEST");

-- Seed vehicles
INSERT INTO vehicles (vehicle_id, type, driver_name, status, corridor_id, fuel_level, last_speed, last_lat, last_lng, last_updated) VALUES
 ("VH-1001", "Truck", "Alice Johnson", "ACTIVE", 1, 78, 62, 37.7749, -122.4194, NOW()),
 ("VH-1002", "Van", "Bob Smith", "ACTIVE", 2, 45, 50, 34.0522, -118.2437, NOW()),
 ("VH-1003", "SUV", "Carol Lee", "IDLE", 3, 30, 0, 36.1699, -115.1398, NOW()),
 ("VH-1004", "Sedan", "Dan Brown", "MAINTENANCE", 4, 90, 0, 40.7128, -74.0060, NOW()),
 ("VH-1005", "Truck", "Erin Davis", "OFFLINE", 1, 55, 0, 41.8781, -87.6298, NOW()),
 ("VH-1006", "Truck", "Farah Khan", "ACTIVE", 1, 68, 58, 37.8044, -122.2711, NOW()),
 ("VH-1007", "Van", "Gus Lopez", "ACTIVE", 2, 22, 40, 33.4484, -112.0740, NOW());

-- Seed sample routes and points for VH-1001
INSERT INTO routes (vehicle_id, started_at, ended_at, total_distance_km, avg_speed_kmh)
SELECT v.id, NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, 48.5, 55.2 FROM vehicles v WHERE v.vehicle_id = "VH-1001";

SET @route_id = LAST_INSERT_ID();
INSERT INTO route_points (route_id, seq, lat, lng, speed, fuel_level, ts) VALUES
 (@route_id, 1, 37.7749, -122.4194, 30, 78, NOW() - INTERVAL 2 HOUR),
 (@route_id, 2, 37.7800, -122.4100, 45, 76, NOW() - INTERVAL 110 MINUTE),
 (@route_id, 3, 37.7900, -122.4000, 55, 74, NOW() - INTERVAL 90 MINUTE),
 (@route_id, 4, 37.8000, -122.3950, 65, 72, NOW() - INTERVAL 70 MINUTE),
 (@route_id, 5, 37.8100, -122.3900, 50, 71, NOW() - INTERVAL 60 MINUTE);

-- Seed alerts
INSERT INTO alerts (vehicle_id, category, message, severity, created_at, resolved)
SELECT id, "LOW_FUEL", "Fuel below 25%", "MEDIUM", NOW() - INTERVAL 30 MINUTE, FALSE FROM vehicles WHERE vehicle_id = "VH-1007";

INSERT INTO alerts (vehicle_id, category, message, severity, created_at, resolved)
SELECT id, "SPEEDING", "Speed exceeded 65 mph", "HIGH", NOW() - INTERVAL 10 MINUTE, FALSE FROM vehicles WHERE vehicle_id = "VH-1001";
