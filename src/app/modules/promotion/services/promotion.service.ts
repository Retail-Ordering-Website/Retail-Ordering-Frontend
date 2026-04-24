import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion, DiscountCode } from '../../../core/models/promotion.models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

export interface ValidationResult {
  success: boolean;
  message: string;
  data: Promotion | null;
}

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = `${environment.apiUrl}/Promotion`;

  constructor(private http: HttpClient) { }

  getActive(): Observable<ApiResponse<Promotion[]>> {
    return this.http.get<ApiResponse<Promotion[]>>(this.apiUrl);
  }

  createPromotion(promo: Promotion): Observable<ApiResponse<Promotion>> {
    return this.http.post<ApiResponse<Promotion>>(this.apiUrl, promo);
  }

  expirePromotion(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }

  validate(code: string): Observable<ValidationResult> {
    return this.http.get<ValidationResult>(`${this.apiUrl}/validate/${code}`);
  }

  createDiscountCode(dto: DiscountCode): Observable<ApiResponse<DiscountCode>> {
    return this.http.post<ApiResponse<DiscountCode>>(`${this.apiUrl}/discount-code`, dto);
  }

  getDiscountCodes(): Observable<ApiResponse<DiscountCode[]>> {
    return this.http.get<ApiResponse<DiscountCode[]>>(`${this.apiUrl}/discount-codes`);
  }

  getLoyaltyPoints(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.apiUrl}/loyalty`);
  }
}
