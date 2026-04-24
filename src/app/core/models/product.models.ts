export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  brandId: number;
  packagingId?: number;
}

export interface SearchFilterDto {
  query?: string;
  categoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface CategoryDto {
  id?: number;
  name: string;
  description?: string;
}

export interface BrandDto {
  id?: number;
  name: string;
  description?: string;
}
