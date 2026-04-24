import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartDto, CartItemDto } from '../../../core/models/cart.models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/Cart`;

  // Local state for components like a header cart badge to subscribe to
  private cartSubject = new BehaviorSubject<CartDto | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCart(): Observable<ApiResponse<CartDto>> {
    return this.http.get<ApiResponse<CartDto>>(this.apiUrl).pipe(
      tap(res => {
        if (res.data) this.cartSubject.next(res.data);
      })
    );
  }

  addToCart(dto: CartItemDto): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/add`, dto).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  removeFromCart(productId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${productId}`).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  clearCart(): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/clear`).pipe(
      tap(() => this.getCart().subscribe()) // Re-fetch to get empty cart DTO from server
    );
  }
}
