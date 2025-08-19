package com.example.fleet.websocket;

import com.example.fleet.model.Vehicle;
import com.example.fleet.repository.VehicleRepository;
import com.example.fleet.service.VehicleService;
import com.example.fleet.service.dto.SummaryDto;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VehicleEventsPublisher {
    private final SimpMessagingTemplate messagingTemplate;
    private final VehicleRepository vehicleRepository;
    private final VehicleService vehicleService;

    public VehicleEventsPublisher(SimpMessagingTemplate messagingTemplate, VehicleRepository vehicleRepository, VehicleService vehicleService) {
        this.messagingTemplate = messagingTemplate;
        this.vehicleRepository = vehicleRepository;
        this.vehicleService = vehicleService;
    }

    // Broadcast every 30s
    @Scheduled(fixedDelay = 30000)
    public void publish() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        SummaryDto summary = vehicleService.getSummary();
        messagingTemplate.convertAndSend("/topic/vehicles", vehicles);
        messagingTemplate.convertAndSend("/topic/summary", summary);
    }
}
