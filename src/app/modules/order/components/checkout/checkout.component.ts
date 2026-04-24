import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../../cart/services/cart.service';
import { OrderRequestDto } from '../../../../core/models/order.models';
import { CartDto } from '../../../../core/models/cart.models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: CartDto | null = null;
  request: OrderRequestDto = {
    deliveryAddress: '',
    discountCode: '',
    useRewardPoints: false
  };

  isSubmitting = false;
  error = '';

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(res => {
      if (res.data) this.cart = res.data;
    });
  }

  placeOrder(): void {
    if (!this.request.deliveryAddress) {
      this.error = 'Delivery address is required.';
      return;
    }

    this.isSubmitting = true;
    this.error = '';

    this.orderService.placeOrder(this.request).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        alert('You ordered this product successfully!');
        this.router.navigate(['/order/success'], { state: { confirmation: res.data } });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = err.error?.message || 'Failed to place order. Please try again.';
      }
    });
  }
}
