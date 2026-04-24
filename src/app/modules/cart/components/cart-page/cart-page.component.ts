import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartDto } from '../../../../core/models/cart.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {
  cart: CartDto | null = null;
  isLoading = true;
  error = '';
  cartSub!: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartSub = this.cartService.cart$.subscribe(c => {
      this.cart = c;
      if (c) this.isLoading = false;
    });

    this.loadCart();
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Failed to load cart.';
        console.error(err);
      }
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      error: (err) => console.error('Failed to remove item', err)
    });
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart().subscribe({
        error: (err) => console.error('Failed to clear cart', err)
      });
    }
  }
}
