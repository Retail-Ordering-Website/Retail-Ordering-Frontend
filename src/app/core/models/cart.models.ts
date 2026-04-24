export interface CartItemDto {
  productId: number;
  quantity: number;
}

export interface CartItemDetailDto {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CartDto {
  id: number;
  items: CartItemDetailDto[];
  total: number;
}
