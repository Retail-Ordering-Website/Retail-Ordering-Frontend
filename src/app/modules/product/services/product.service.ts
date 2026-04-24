import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto, CreateProductDto, SearchFilterDto } from '../../../core/models/product.models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<ProductDto[]>> {
    return this.http.get<ApiResponse<ProductDto[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<ProductDto>> {
    return this.http.get<ApiResponse<ProductDto>>(`${this.apiUrl}/${id}`);
  }

  search(filter: SearchFilterDto): Observable<ApiResponse<ProductDto[]>> {
    return this.http.post<ApiResponse<ProductDto[]>>(`${this.apiUrl}/search`, filter);
  }

  create(dto: CreateProductDto): Observable<ApiResponse<ProductDto>> {
    return this.http.post<ApiResponse<ProductDto>>(this.apiUrl, dto);
  }

  update(id: number, dto: CreateProductDto): Observable<ApiResponse<ProductDto>> {
    return this.http.put<ApiResponse<ProductDto>>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }
}
