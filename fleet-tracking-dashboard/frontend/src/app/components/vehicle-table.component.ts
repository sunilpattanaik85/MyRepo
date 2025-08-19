import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService, Vehicle } from '../services/api.service';
import { Subscription, interval, firstValueFrom } from 'rxjs';

@Component({ selector: 'app-vehicle-table', template: `
<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;flex-wrap:wrap;">
  <input class="card" style="flex:1;" placeholder="Search by vehicle ID or driver" [(ngModel)]="q" (input)="load()"/>
  <select class="card" [(ngModel)]="status" (change)="load()">
    <option value="">All Status</option>
    <option>ACTIVE</option><option>IDLE</option><option>MAINTENANCE</option><option>OFFLINE</option>
  </select>
  <label class="card" style="padding:6px 12px;display:flex;gap:8px;align-items:center;">
    <input type="checkbox" [(ngModel)]="autoRefresh"> Auto refresh 30s
  </label>
  <button class="card" (click)="load()">Refresh</button>
  <div style="flex:1"></div>
</div>
<div class="card" style="padding:0;overflow:auto;">
  <table style="width:100%;border-collapse:collapse;">
    <thead>
      <tr style="text-align:left;background:#0a1228;">
        <th style="padding:8px;">Vehicle</th>
        <th>Driver</th><th>Status</th><th>Type</th><th>Corridor</th><th>Speed</th><th>Fuel</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let v of vehicles" style="border-top:1px solid #1f2937;">
        <td style="padding:8px;">{{v.vehicleId}}</td>
        <td>{{v.driverName}}</td>
        <td>{{v.status}}</td>
        <td>{{v.type}}</td>
        <td>{{v.corridor?.direction || '-'}}</td>
        <td>{{v.lastSpeed || 0}}</td>
        <td>{{v.fuelLevel || 0}}%</td>
      </tr>
    </tbody>
  </table>
</div>
`})
export class VehicleTableComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[] = [];
  q = ''; status = ''; autoRefresh = true; sub?: Subscription;
  constructor(private api: ApiService) {}
  async ngOnInit() { this.load(); this.sub = interval(30000).subscribe(() => this.autoRefresh && this.load()); }
  ngOnDestroy() { this.sub?.unsubscribe(); }
  async load() {
    try {
      const list = (await firstValueFrom(this.api.getVehicles(this.q))) || [];
      this.vehicles = this.status ? list.filter(v => v.status === this.status) : list;
    } catch {
      this.vehicles = [];
    }
  }
}

