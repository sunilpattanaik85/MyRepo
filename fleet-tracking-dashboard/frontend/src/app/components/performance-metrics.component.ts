import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from '../services/api.service';

@Component({ selector: 'app-performance-metrics', template: `
<div class="grid" style="grid-template-columns: 1fr 1fr;">
  <canvas baseChart [data]="fuelData" [type]="'doughnut'"></canvas>
  <canvas baseChart [data]="speedFuelScatter" [type]="'scatter'"></canvas>
</div>
`})
export class PerformanceMetricsComponent implements OnInit {
  fuelData: ChartConfiguration['data'] = { labels: ['0-25%','25-50%','50-75%','75-100%'], datasets: [{ data: [0,0,0,0], label: 'Fuel Levels' }] };
  speedFuelScatter: ChartConfiguration['data'] = { datasets: [{ label: 'Speed vs Fuel', data: [] as any[] }] };
  constructor(private api: ApiService) {}
  async ngOnInit() {
    let vehicles = [] as any[];
    try { vehicles = (await this.api.getVehicles().toPromise()) || []; } catch {}
    const buckets = [0,0,0,0];
    vehicles.forEach(v => {
      const f = v.fuelLevel || 0; const b = f < 25 ? 0 : f < 50 ? 1 : f < 75 ? 2 : 3; buckets[b]++;
      if (v.lastSpeed != null && v.fuelLevel != null) (this.speedFuelScatter.datasets![0].data as any[]).push({ x: v.lastSpeed, y: v.fuelLevel });
    });
    this.fuelData.datasets![0].data = buckets;
  }
}

