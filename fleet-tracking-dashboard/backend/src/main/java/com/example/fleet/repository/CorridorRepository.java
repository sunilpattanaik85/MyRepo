package com.example.fleet.repository;

import com.example.fleet.model.Corridor;
import com.example.fleet.model.Direction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CorridorRepository extends JpaRepository<Corridor, Long> {
    List<Corridor> findByDirection(Direction direction);
}
