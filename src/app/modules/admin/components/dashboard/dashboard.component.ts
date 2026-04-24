import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AdminDashboardDto } from '../../models/admin.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: AdminDashboardDto | null = null;
  loading = true;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchDashboard();
  }

  fetchDashboard(): void {
    this.adminService.getDashboard().subscribe({
      next: (res) => {
        if (res.data) {
          this.dashboardData = res.data;
        } else {
          this.error = res.message || 'Failed to load dashboard.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching the dashboard.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
