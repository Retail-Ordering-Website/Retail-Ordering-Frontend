import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AdminUserDto } from '../../models/admin.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: AdminUserDto[] = [];
  loading = true;
  error = '';
  updatingId: number | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.adminService.getUsers().subscribe({
      next: (res) => {
        if (res.data) {
          this.users = res.data;
        } else {
          this.error = res.message || 'Failed to load users.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching users.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  toggleActive(user: AdminUserDto): void {
    this.updatingId = user.id;
    this.adminService.activateUser(user.id, !user.isActive).subscribe({
      next: (res) => {
        if (res.success || res.data) {
          user.isActive = !user.isActive;
        }
        this.updatingId = null;
      },
      error: (err) => {
        console.error('Failed to update status', err);
        this.updatingId = null;
      }
    });
  }

  changeRole(user: AdminUserDto, newRole: string): void {
    if (user.role === newRole) return;
    
    this.updatingId = user.id;
    this.adminService.changeUserRole(user.id, newRole).subscribe({
      next: (res) => {
        if (res.success || res.data) {
          user.role = newRole;
        }
        this.updatingId = null;
      },
      error: (err) => {
        console.error('Failed to change role', err);
        this.updatingId = null;
      }
    });
  }
}
