import { Component, OnInit } from '@angular/core';
import { ApiService, Route, Vehicle } from '../services/api.service';
import * as L from 'leaflet';

@Component({ selector: 'app-route-visualization', template: `
<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
  <select class="card" [(ngModel)]="selectedId" (change)="load()">
    <option [ngValue]="''">Select vehicle</option>
    <option *ngFor="let v of vehicles" [ngValue]="v.vehicleId">{{v.vehicleId}} - {{v.driverName}}</option>
  </select>
  <div *ngIf="stats">Distance: {{stats.distance | number:'1.0-1'}} km | Avg Speed: {{stats.avgSpeed | number:'1.0-1'}} km/h | Duration: {{stats.durationH | number:'1.0-1'}} h</div>
  </div>
<div id="route-map" class="leaflet-container"></div>
`})
export class RouteVisualizationComponent implements OnInit {
  vehicles: Vehicle[] = []; selectedId = '';
  map?: L.Map; layer?: L.Polyline<any>; stats?: { distance: number; avgSpeed: number; durationH: number };
  constructor(private api: ApiService) {}
  async ngOnInit() {
    this.vehicles = await this.api.getVehicles().toPromise() || [];
    this.map = L.map('route-map').setView([37.7749, -122.4194], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);
  }
  async load() {
    if (!this.selectedId) return;
    const routes = await this.api.getRoutesByVehicle(this.selectedId).toPromise() || [];
    if (!routes.length) return;
    const r = routes[routes.length - 1];
    const v = r.vehicle; if (!v?.lastLat || !v?.lastLng) return;
    const points: L.LatLngExpression[] = [[v.lastLat, v.lastLng], [v.lastLat + 0.1, v.lastLng + 0.1], [v.lastLat + 0.2, v.lastLng + 0.05]];
    if (this.layer) this.layer.remove();
    this.layer = L.polyline(points, { color: 'deepskyblue' }).addTo(this.map!);
    this.map!.fitBounds(this.layer.getBounds());
    this.stats = { distance: r.totalDistanceKm || 0, avgSpeed: r.avgSpeedKmh || 0, durationH: r.endedAt && r.startedAt ? (new Date(r.endedAt).getTime() - new Date(r.startedAt).getTime()) / 3600000 : 0 };
  }
}

