package com.example.fleet.web;

import com.example.fleet.model.Alert;
import com.example.fleet.repository.AlertRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {
    private final AlertRepository alertRepository;

    public AlertController(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    @GetMapping
    public List<Alert> all(@RequestParam(value = "start", required = false) Instant start,
                           @RequestParam(value = "end", required = false) Instant end) {
        if (start != null && end != null) return alertRepository.findByCreatedAtBetween(start, end);
        return alertRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> get(@PathVariable("id") Long id) {
        return alertRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alert create(@RequestBody Alert a) { return alertRepository.save(a); }

    @PutMapping("/{id}")
    public ResponseEntity<Alert> update(@PathVariable("id") Long id, @RequestBody Alert a) {
        return alertRepository.findById(id)
                .map(existing -> {
                    a.setId(existing.getId());
                    return ResponseEntity.ok(alertRepository.save(a));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if (alertRepository.existsById(id)) {
            alertRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
