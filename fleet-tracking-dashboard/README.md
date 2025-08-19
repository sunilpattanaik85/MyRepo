# Analytic Vehicle Tracking Dashboard

This repository contains a full-stack web application for an Analytic Vehicle Tracking Dashboard.

- Backend: Java (Spring Boot)
- Database: MySQL
- Frontend: Angular (latest stable)
- Mapping: Leaflet.js with OpenStreetMap tiles
- Charts: Chart.js via ng2-charts

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 18+ and npm 9+
- Docker (for MySQL via docker-compose)

## Quick Start

1) Start MySQL using Docker

```bash
cd fleet-tracking-dashboard
docker compose up -d
```

2) Initialize database with schema and sample data (optional if backend runs with `spring.jpa.hibernate.ddl-auto=update`)

```bash
# Wait a few seconds for MySQL to be healthy first
mysql -h 127.0.0.1 -P 3306 -u root -proot fleetdb < db/seed.sql
```

3) Run the backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Backend will start on `http://localhost:8080` and expose REST + WebSocket endpoints.

4) Run the frontend (Angular)

```bash
cd ../frontend
npm install
npm start
```

Frontend will start on `http://localhost:4200`.

## Configuration

Backend configuration is in `backend/src/main/resources/application.properties`.

- DB URL: `spring.datasource.url=jdbc:mysql://localhost:3306/fleetdb`
- DB user: `root`
- DB password: `root`

Adjust as needed and update `docker-compose.yml` and `db/seed.sql` accordingly.

## Features Implemented

- Summary cards: total/active vehicles, avg speed, distance today, active corridors
- Interactive map with Leaflet and live updates via WebSocket (30s polling fallback)
- Corridor analytics: pie/bar/average speed
- Vehicle table: search, filters, date range, auto-refresh
- Performance metrics: fuel levels, daily distance, speed vs fuel scatter
- Advanced analytics: type distribution, alerts by category, fuel efficiency leaderboard, speed by corridor
- Fleet utilization & maintenance insights
- Route visualization per vehicle (past route, distance, avg speed, duration)

## Scripts

- `db/seed.sql`: Creates schema and seeds sample data
- `docker-compose.yml`: MySQL 8 instance with `fleetdb`

## Notes

- WebSocket endpoint: `/ws` with topic `/topic/vehicles` for real-time vehicle positions and summary updates
- REST endpoints are under `/api/**`. See controllers for details.

