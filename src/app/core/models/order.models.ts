export interface OrderItemDto {
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  discountAmount?: number;
  deliveryAddress?: string;
  createdAt: string;
  items: OrderItemDto[];
}

export interface OrderRequestDto {
  deliveryAddress: string;
  discountCode?: string;
  useRewardPoints: boolean;
}

export interface OrderConfirmationDto {
  orderNumber: string;
  totalAmount: number;
  message: string;
}

export enum OrderStatus {
  Pending = 0,
  Confirmed = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
  Cancelled = 5
}
