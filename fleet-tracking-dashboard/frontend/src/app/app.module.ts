import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SummaryCardsComponent } from './components/summary-cards.component';
import { MapViewComponent } from './components/map-view.component';
import { CorridorAnalyticsComponent } from './components/corridor-analytics.component';
import { VehicleTableComponent } from './components/vehicle-table.component';
import { PerformanceMetricsComponent } from './components/performance-metrics.component';
import { AdvancedAnalyticsComponent } from './components/advanced-analytics.component';
import { UtilizationInsightsComponent } from './components/utilization-insights.component';
import { RouteVisualizationComponent } from './components/route-visualization.component';
import { NavbarComponent } from './components/navbar.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    SummaryCardsComponent,
    NavbarComponent,
    MapViewComponent,
    CorridorAnalyticsComponent,
    VehicleTableComponent,
    PerformanceMetricsComponent,
    AdvancedAnalyticsComponent,
    UtilizationInsightsComponent,
    RouteVisualizationComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
