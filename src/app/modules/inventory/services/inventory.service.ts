import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryDto, StockUpdateDto, Brand, BrandDto } from '../../../core/models/inventory.models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/Brand`;

  constructor(private http: HttpClient) { }

  getInventory(): Observable<ApiResponse<InventoryDto[]>> {
    return this.http.get<ApiResponse<InventoryDto[]>>(`${this.apiUrl}/inventory`);
  }

  updateStock(dto: StockUpdateDto): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${this.apiUrl}/stock`, dto);
  }

  getBrands(): Observable<ApiResponse<Brand[]>> {
    return this.http.get<ApiResponse<Brand[]>>(this.apiUrl);
  }

  createBrand(dto: BrandDto): Observable<ApiResponse<Brand>> {
    return this.http.post<ApiResponse<Brand>>(this.apiUrl, dto);
  }

  updateBrand(id: number, dto: BrandDto): Observable<ApiResponse<Brand>> {
    return this.http.put<ApiResponse<Brand>>(`${this.apiUrl}/${id}`, dto);
  }

  deleteBrand(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }
}
