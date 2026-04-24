import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const expirationDate = decoded.exp * 1000;
    return Date.now() > expirationDate;
  }

  getRole(token: string): string {
    const decoded = this.decodeToken(token);
    if (!decoded) return '';
    // Handle both standard and short claim names
    return decoded['role'] || 
           decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
           '';
  }

  getUserId(token: string): number {
    const decoded = this.decodeToken(token);
    if (!decoded) return 0;
    const id = decoded['nameid'] || 
               decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return id ? parseInt(id) : 0;
  }
}
