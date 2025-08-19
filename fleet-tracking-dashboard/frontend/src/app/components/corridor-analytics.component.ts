import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService, Vehicle } from '../services/api.service';

@Component({ selector: 'app-corridor-analytics', template: `
<div class="grid" style="grid-template-columns: 1fr 1fr;">
  <canvas baseChart [data]="pieData" [type]="'pie'"></canvas>
  <canvas baseChart [data]="barData" [options]="barOptions" [type]="'bar'"></canvas>
</div>
`})
export class CorridorAnalyticsComponent implements OnInit {
  vehicles: Vehicle[] = [];
  pieData: ChartConfiguration['data'] = { labels: [], datasets: [{ data: [] }] };
  barData: ChartConfiguration['data'] = { labels: [], datasets: [{ data: [], label: 'Vehicles' }] };
  barOptions: ChartConfiguration['options'] = { responsive: true, plugins: { legend: { display: false } } };

  constructor(private api: ApiService) {}

  async ngOnInit() {
    try { this.vehicles = (await this.api.getVehicles().toPromise()) || []; } catch { this.vehicles = []; }
    const byDir: Record<string, number> = {};
    this.vehicles.forEach(v => {
      const d = v.corridor?.direction || 'UNKNOWN';
      byDir[d] = (byDir[d] || 0) + 1;
    });
    this.pieData = { labels: Object.keys(byDir), datasets: [{ data: Object.values(byDir) }] };
    this.barData = { labels: Object.keys(byDir), datasets: [{ data: Object.values(byDir), label: 'Vehicles' }] };
  }
}

