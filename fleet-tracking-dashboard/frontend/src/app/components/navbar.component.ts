import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <nav style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#0a1228;border-radius:12px;" class="card">
    <div style="font-weight:700;letter-spacing:0.3px;">Fleet Analytics Dashboard</div>
    <div style="display:flex;gap:12px;color:#9ca3af;font-size:14px;">
      <a href="#" style="color:inherit;text-decoration:none;">Overview</a>
      <a href="#" style="color:inherit;text-decoration:none;">Vehicles</a>
      <a href="#" style="color:inherit;text-decoration:none;">Alerts</a>
      <a href="#" style="color:inherit;text-decoration:none;">Settings</a>
    </div>
  </nav>
  `
})
export class NavbarComponent {}

