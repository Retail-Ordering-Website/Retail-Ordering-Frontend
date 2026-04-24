export interface AdminDashboardDto {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
}

export interface AdminUserDto {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}
