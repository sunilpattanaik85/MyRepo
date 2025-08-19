import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface SummaryDto { totalVehicles: number; activeVehicles: number; averageSpeed: number; totalDistanceTodayKm: number; activeCorridors: number; }
export interface Vehicle { id: number; vehicleId: string; type: string; driverName: string; status: string; corridor?: { id: number; name: string; direction: string }; fuelLevel?: number; lastSpeed?: number; lastLat?: number; lastLng?: number; lastUpdated?: string; }
export interface Alert { id: number; category: string; message: string; severity: string; createdAt: string; resolved: boolean; vehicle?: Vehicle }
export interface Route { id: number; vehicle: Vehicle; startedAt: string; endedAt?: string; totalDistanceKm?: number; avgSpeedKmh?: number }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getSummary(): Observable<SummaryDto> { return this.http.get<SummaryDto>(`${this.base}/vehicles/summary`); }
  getVehicles(q?: string): Observable<Vehicle[]> {
    const params = q ? new HttpParams().set('q', q) : undefined as any;
    return this.http.get<Vehicle[]>(`${this.base}/vehicles`, { params });
  }
  getAlerts(): Observable<Alert[]> { return this.http.get<Alert[]>(`${this.base}/alerts`); }
  getRoutesByVehicle(vehicleId: string, start?: string, end?: string): Observable<Route[]> {
    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);
    return this.http.get<Route[]>(`${this.base}/routes/vehicle/${vehicleId}`, { params });
  }
}
