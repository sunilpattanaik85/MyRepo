import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService, SummaryDto } from '../services/api.service';
import { WsService } from '../services/ws.service';
import { Subscription, interval, startWith, switchMap } from 'rxjs';

@Component({ selector: 'app-summary-cards', template: `
<div class="grid" style="grid-template-columns: repeat(5, 1fr);">
  <div class="card"><div>Total Vehicles</div><div style="font-size:24px;font-weight:700;">{{s?.totalVehicles || 0}}</div></div>
  <div class="card"><div>Active Vehicles</div><div style="font-size:24px;font-weight:700;">{{s?.activeVehicles || 0}}</div></div>
  <div class="card"><div>Avg Speed</div><div style="font-size:24px;font-weight:700;">{{(s?.averageSpeed || 0) | number:'1.0-1'}} km/h</div></div>
  <div class="card"><div>Total Distance Today</div><div style="font-size:24px;font-weight:700;">{{(s?.totalDistanceTodayKm || 0) | number:'1.0-1'}} km</div></div>
  <div class="card"><div>Active Corridors</div><div style="font-size:24px;font-weight:700;">{{s?.activeCorridors || 0}}</div></div>
</div>
`})
export class SummaryCardsComponent implements OnInit, OnDestroy {
  s?: SummaryDto; sub?: Subscription;
  constructor(private api: ApiService, private ws: WsService) {}
  async ngOnInit() {
    this.s = await this.api.getSummary().toPromise();
    await this.ws.connect();
    this.ws.subscribe('/topic/summary', m => this.s = JSON.parse(m.body));
    this.sub = interval(30000).pipe(startWith(0), switchMap(() => this.api.getSummary())).subscribe(v => this.s = v);
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }
}

