export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryName: string;
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
