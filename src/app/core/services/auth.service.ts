import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { RegisterDto, LoginDto, TokenDto } from '../models/auth.models';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  
  private currentUserSubject = new BehaviorSubject<TokenDto | null>(null); // Initialized later
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.currentUserSubject.next(this.getTokensFromStorage());
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  public get currentUserValue(): TokenDto | null {
    return this.currentUserSubject.value;
  }

  register(dto: RegisterDto): Observable<ApiResponse<TokenDto>> {
    return this.http.post<ApiResponse<TokenDto>>(`${this.apiUrl}/register`, dto).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  login(dto: LoginDto): Observable<ApiResponse<TokenDto>> {
    return this.http.post<ApiResponse<TokenDto>>(`${this.apiUrl}/login`, dto).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  refresh(refreshToken: string): Observable<ApiResponse<TokenDto>> {
    return this.http.post<ApiResponse<TokenDto>>(`${this.apiUrl}/refresh`, `"${refreshToken}"`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
  }

  private handleAuthResponse(res: ApiResponse<TokenDto>): void {
    if (res.data) {
      localStorage.setItem('access_token', res.data.accessToken);
      localStorage.setItem('refresh_token', res.data.refreshToken);
      
      // Extract role from token
      res.data.role = this.jwtService.getRole(res.data.accessToken);
      
      this.currentUserSubject.next(res.data);
    }
  }

  private getTokensFromStorage(): TokenDto | null {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      const role = this.jwtService.getRole(accessToken);
      return { accessToken, refreshToken, role };
    }
    return null;
  }
}
