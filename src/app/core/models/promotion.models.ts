export interface Promotion {
  id?: number;
  name: string;
  description: string;
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  totalUsageCount: number;
  maxTotalUsage: number;
}

export interface DiscountCode {
  id?: number;
  code: string;
  discountAmount: number;
  maxUsage: number;
  usageCount: number;
  expiresAt: string;
  isActive: boolean;
}
