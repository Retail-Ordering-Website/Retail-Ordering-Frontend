import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminDashboardDto, AdminUserDto, ApiResponse } from '../models/admin.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/Admin`;

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<ApiResponse<AdminDashboardDto>> {
    return this.http.get<ApiResponse<AdminDashboardDto>>(`${this.apiUrl}/dashboard`);
  }

  getUsers(): Observable<ApiResponse<AdminUserDto[]>> {
    return this.http.get<ApiResponse<AdminUserDto[]>>(`${this.apiUrl}/users`);
  }

  activateUser(id: number, active: boolean): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${this.apiUrl}/users/${id}/activate?active=${active}`, {});
  }

  changeUserRole(id: number, role: string): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${this.apiUrl}/users/${id}/role`, `"${role}"`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
