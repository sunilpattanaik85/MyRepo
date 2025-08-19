import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ApiService, Vehicle } from '../services/api.service';
import { WsService } from '../services/ws.service';
import * as L from 'leaflet';

@Component({ selector: 'app-map-view', template: `<div id="map" class="leaflet-container"></div>` })
export class MapViewComponent implements AfterViewInit, OnDestroy {
  private map?: L.Map;
  private markers: Record<number, L.Marker> = {};
  private vehicles: Vehicle[] = [];

  constructor(private api: ApiService, private ws: WsService) {}

  private colorByDirection(dir?: string): string {
    switch (dir) {
      case 'NORTH': return 'blue';
      case 'SOUTH': return 'green';
      case 'EAST': return 'orange';
      case 'WEST': return 'red';
      default: return 'gray';
    }
  }

  private icon(color: string): L.DivIcon {
    return L.divIcon({ className: 'vehicle-marker', html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white"></div>` });
  }

  async ngAfterViewInit() {
    this.map = L.map('map').setView([37.7749, -122.4194], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const update = (list: Vehicle[]) => {
      this.vehicles = list;
      list.forEach(v => {
        if (!v.lastLat || !v.lastLng) return;
        const color = this.colorByDirection(v.corridor?.direction);
        const marker = this.markers[v.id] ?? L.marker([v.lastLat, v.lastLng], { icon: this.icon(color) }).addTo(this.map!);
        marker.setLatLng([v.lastLat, v.lastLng]);
        marker.bindPopup(`<b>${v.vehicleId}</b><br>Driver: ${v.driverName || '-'}<br>Speed: ${v.lastSpeed || 0} km/h<br>Fuel: ${v.fuelLevel || 0}%`);
        this.markers[v.id] = marker;
      });
    };

    try {
      update((await this.api.getVehicles().toPromise()) || []);
    } catch {}
    try {
      await this.ws.connect();
      this.ws.subscribe('/topic/vehicles', m => update(JSON.parse(m.body)));
    } catch {}
  }

  ngOnDestroy() { if (this.map) this.map.remove(); }
}

