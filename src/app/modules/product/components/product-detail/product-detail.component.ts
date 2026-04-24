import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../../../core/models/product.models';
import { CartService } from '../../../cart/services/cart.service';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
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

    this.isAddingToCart = true;
    this.addedMessage = '';

    this.cartService.addToCart({ productId: this.product.id, quantity: 1 }).subscribe({
      next: () => {
        this.isAddingToCart = false;
        this.addedMessage = 'Added to Cart!';
        setTimeout(() => this.addedMessage = '', 3000);
      },
      error: (err) => {
        this.isAddingToCart = false;
        console.error('Error adding to cart', err);
      }
    });
  }
}
