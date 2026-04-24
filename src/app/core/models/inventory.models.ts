export interface InventoryDto {
  productId: number;
  productName: string;
  brandName?: string;
  categoryName?: string;
  stock: number;
  price: number;
}

export interface StockUpdateDto {
  productId: number;
  stock: number;
}

export interface Brand {
  id: number;
  name: string;
}

export interface BrandDto {
  name: string;
}
