package com.example.fleet.web;

import com.example.fleet.model.Corridor;
import com.example.fleet.repository.CorridorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/corridors")
public class CorridorController {
    private final CorridorRepository corridorRepository;

    public CorridorController(CorridorRepository corridorRepository) {
        this.corridorRepository = corridorRepository;
    }

    @GetMapping
    public List<Corridor> all() { return corridorRepository.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Corridor> get(@PathVariable("id") Long id) {
        return corridorRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Corridor create(@RequestBody Corridor c) { return corridorRepository.save(c); }

    @PutMapping("/{id}")
    public ResponseEntity<Corridor> update(@PathVariable("id") Long id, @RequestBody Corridor c) {
        return corridorRepository.findById(id)
                .map(existing -> {
                    c.setId(existing.getId());
                    return ResponseEntity.ok(corridorRepository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if (corridorRepository.existsById(id)) {
            corridorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
