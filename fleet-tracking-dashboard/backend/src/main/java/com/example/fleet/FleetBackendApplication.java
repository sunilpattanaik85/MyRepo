package com.example.fleet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FleetBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(FleetBackendApplication.class, args);
    }
}
