package com.example.fleet.web;

import com.example.fleet.model.Vehicle;
import com.example.fleet.repository.VehicleRepository;
import com.example.fleet.service.VehicleService;
import com.example.fleet.service.dto.SummaryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private final VehicleRepository vehicleRepository;
    private final VehicleService vehicleService;

    public VehicleController(VehicleRepository vehicleRepository, VehicleService vehicleService) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> all(@RequestParam(value = "q", required = false) String q) {
        return vehicleRepository.search((q == null || q.isBlank()) ? null : q);
    }

    @GetMapping("/summary")
    public SummaryDto summary() {
        return vehicleService.getSummary();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> get(@PathVariable("id") Long id) {
        return vehicleRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vehicle create(@RequestBody Vehicle v) { return vehicleRepository.save(v); }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> update(@PathVariable("id") Long id, @RequestBody Vehicle v) {
        return vehicleRepository.findById(id)
                .map(existing -> {
                    v.setId(existing.getId());
                    return ResponseEntity.ok(vehicleRepository.save(v));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
