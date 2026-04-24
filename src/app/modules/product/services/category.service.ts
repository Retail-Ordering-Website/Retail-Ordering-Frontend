import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../../../core/models/product.models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<CategoryDto[]>> {
    return this.http.get<ApiResponse<CategoryDto[]>>(this.apiUrl);
  }

  create(dto: CategoryDto): Observable<ApiResponse<CategoryDto>> {
    return this.http.post<ApiResponse<CategoryDto>>(this.apiUrl, dto);
  }
}
