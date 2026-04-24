import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { BrandDto } from '../../../core/models/product.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}/Brand`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<BrandDto[]>> {
    return this.http.get<ApiResponse<BrandDto[]>>(this.apiUrl);
  }

  create(dto: BrandDto): Observable<ApiResponse<BrandDto>> {
    return this.http.post<ApiResponse<BrandDto>>(this.apiUrl, dto);
  }

  update(id: number, dto: BrandDto): Observable<ApiResponse<BrandDto>> {
    return this.http.put<ApiResponse<BrandDto>>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }
}
