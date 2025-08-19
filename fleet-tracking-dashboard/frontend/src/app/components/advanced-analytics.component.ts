import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({ selector: 'app-advanced-analytics', template: `
<div class="grid" style="grid-template-columns: 1fr; gap: 8px;">
  <div>Type Distribution: {{typeDist | json}}</div>
  <div>Top Fuel Efficiency (km): <ol><li *ngFor="let t of topFuel">{{t.vehicleId}} - {{t.dist | number:'1.0-1'}} km</li></ol></div>
  <div>Alerts: <span *ngFor="let a of alertCounts | keyvalue" class="card" style="margin-right:6px;">{{a.key}}: {{a.value}}</span></div>
  <div>Speed Distribution by Corridor: {{speedByCorridor | json}}</div>
  <div>Recommendations: {{reco}}</div>
</div>
`})
export class AdvancedAnalyticsComponent implements OnInit {
  typeDist: Record<string, number> = {};
  topFuel: { vehicleId: string; dist: number }[] = [];
  alertCounts: Record<string, number> = {};
  speedByCorridor: Record<string, number[]> = {};
  reco = '';
  constructor(private api: ApiService) {}
  async ngOnInit() {
    let vehicles = [] as any[];
    try { vehicles = (await this.api.getVehicles().toPromise()) || []; } catch {}
    vehicles.forEach(v => {
      this.typeDist[v.type] = (this.typeDist[v.type] || 0) + 1;
      const d = v.corridor?.direction || 'UNKNOWN';
      this.speedByCorridor[d] = this.speedByCorridor[d] || [];
      if (v.lastSpeed != null) this.speedByCorridor[d].push(v.lastSpeed);
    });
    this.topFuel = vehicles
      .map(v => ({ vehicleId: v.vehicleId, dist: (v.lastSpeed || 0) * 0.5 }))
      .sort((a,b) => b.dist - a.dist)
      .slice(0,5);
    try {
      const alerts = (await this.api.getAlerts().toPromise()) || [];
      alerts.forEach(a => this.alertCounts[a.category] = (this.alertCounts[a.category] || 0) + 1);
    } catch {}
    const lowFuel = vehicles.filter(v => (v.fuelLevel || 0) < 25).length;
    this.reco = lowFuel ? `${lowFuel} vehicles have low fuel. Prioritize refueling and check maintenance.` : 'No critical alerts detected.';
  }
}

