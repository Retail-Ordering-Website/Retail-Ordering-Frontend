import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { OrderDto } from '../../../../core/models/order.models';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderDto[] = [];
  isLoading = true;
  error = '';
  expandedOrderId: number | null = null;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory(): void {
    this.isLoading = true;
    this.historyService.getHistory().subscribe({
      next: (res) => {
        if (res.data) {
          this.orders = res.data;
        } else {
          this.error = res.message || 'Failed to load order history.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching order history.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  toggleDetails(orderId: number): void {
    if (this.expandedOrderId === orderId) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = orderId;
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }
}
