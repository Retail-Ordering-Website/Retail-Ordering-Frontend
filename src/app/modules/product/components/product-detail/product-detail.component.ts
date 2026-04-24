import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../../../core/models/product.models';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { TokenDto } from '../../../../core/models/auth.models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: ProductDto | null = null;
  isLoading = true;
  error = '';
  isAddingToCart = false;
  addedMessage = '';
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: TokenDto | null) => {
      this.isAdmin = user?.role === 'Admin';
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.fetchProductDetails(parseInt(idParam, 10));
    } else {
      this.error = 'Invalid product ID.';
      this.isLoading = false;
    }
  }

  fetchProductDetails(id: number): void {
    this.isLoading = true;
    this.productService.getById(id).subscribe({
      next: (res) => {
        if (res.data) {
          this.product = res.data;
        } else {
          this.error = res.message || 'Product not found.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while loading the product details.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    this.isAddingToCart = true;
    this.addedMessage = '';

    this.cartService.addToCart({ productId: this.product.id, quantity: 1 }).subscribe({
      next: () => {
        this.isAddingToCart = false;
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        this.isAddingToCart = false;
        console.error('Error adding to cart', err);
      }
    });
  }
}
