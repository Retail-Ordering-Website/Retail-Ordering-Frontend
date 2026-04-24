import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto } from '../../../core/models/order.models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = `${environment.apiUrl}/History`;

  constructor(private http: HttpClient) { }

  getHistory(): Observable<ApiResponse<OrderDto[]>> {
    return this.http.get<ApiResponse<OrderDto[]>>(this.apiUrl);
  }
}
