import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto, OrderRequestDto, OrderConfirmationDto, OrderStatus } from '../../../core/models/order.models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) { }

  placeOrder(dto: OrderRequestDto): Observable<ApiResponse<OrderConfirmationDto>> {
    return this.http.post<ApiResponse<OrderConfirmationDto>>(`${this.apiUrl}/place`, dto);
  }

  getMyOrders(): Observable<ApiResponse<OrderDto[]>> {
    return this.http.get<ApiResponse<OrderDto[]>>(`${this.apiUrl}/my`);
  }

  getAllOrders(): Observable<ApiResponse<OrderDto[]>> {
    return this.http.get<ApiResponse<OrderDto[]>>(this.apiUrl);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${this.apiUrl}/${id}/status`, status);
  }
}
