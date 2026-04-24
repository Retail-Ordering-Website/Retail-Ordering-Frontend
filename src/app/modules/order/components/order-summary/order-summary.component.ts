import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDto, OrderStatus } from '../../../../core/models/order.models';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orders: OrderDto[] = [];
  isLoading = true;
  error = '';
  updatingOrderId: number | null = null;

  statusOptions = [
    { value: OrderStatus.Pending, label: 'Pending' },
    { value: OrderStatus.Confirmed, label: 'Confirmed' },
    { value: OrderStatus.Processing, label: 'Processing' },
    { value: OrderStatus.Shipped, label: 'Shipped' },
    { value: OrderStatus.Delivered, label: 'Delivered' },
    { value: OrderStatus.Cancelled, label: 'Cancelled' }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        if (res.data) {
          this.orders = res.data;
        } else {
          this.error = res.message || 'Failed to load orders.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while loading orders.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  updateStatus(order: OrderDto, newStatusStr: string): void {
    const statusEnumVal = this.statusOptions.find(o => o.label === newStatusStr)?.value;
    if (statusEnumVal === undefined) return;

    this.updatingOrderId = order.id;

    this.orderService.updateOrderStatus(order.id, statusEnumVal).subscribe({
      next: () => {
        order.status = newStatusStr;
        this.updatingOrderId = null;
      },
      error: (err) => {
        console.error('Failed to update status', err);
        this.updatingOrderId = null;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }
}
