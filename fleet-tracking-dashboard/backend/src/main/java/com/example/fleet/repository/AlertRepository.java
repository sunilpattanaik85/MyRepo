package com.example.fleet.repository;

import com.example.fleet.model.Alert;
import com.example.fleet.model.AlertCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByCategory(AlertCategory category);
    List<Alert> findByCreatedAtBetween(Instant start, Instant end);
}
