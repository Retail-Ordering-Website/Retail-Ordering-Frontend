import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../../../core/models/product.models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductDto[] = [];
  isLoading = true;
  error = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (res) => {
        if (res.data) {
          this.products = res.data;
        } else {
          // If the API doesn't wrap in ApiResponse, we might need to handle it differently.
          // But assuming standard ApiResponse wrapper based on other endpoints:
          this.error = res.message || 'Failed to load products.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching products.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
