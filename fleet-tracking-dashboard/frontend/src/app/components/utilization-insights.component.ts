import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({ selector: 'app-utilization-insights', template: `
<div class="grid" style="grid-template-columns: repeat(4, 1fr);">
  <div class="card">Active: {{counts.ACTIVE || 0}}</div>
  <div class="card">Idle: {{counts.IDLE || 0}}</div>
  <div class="card">Maint.: {{counts.MAINTENANCE || 0}}</div>
  <div class="card">Offline: {{counts.OFFLINE || 0}}</div>
</div>
<div class="card" style="margin-top:8px;">Recommendations: {{recommendation}}</div>
`})
export class UtilizationInsightsComponent implements OnInit {
  counts: Record<string, number> = {};
  recommendation = '';
  constructor(private api: ApiService) {}
  async ngOnInit() {
    const vehicles = await this.api.getVehicles().toPromise() || [];
    vehicles.forEach(v => this.counts[v.status] = (this.counts[v.status] || 0) + 1);
    const lowFuel = vehicles.filter(v => (v.fuelLevel || 0) < 25).length;
    this.recommendation = lowFuel > 0 ? `${lowFuel} vehicles low on fuel. Schedule refuel and preventive maintenance.` : 'Fleet healthy. Maintain regular checks.';
  }
}

