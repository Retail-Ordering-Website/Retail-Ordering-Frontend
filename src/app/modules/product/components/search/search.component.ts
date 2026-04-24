import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductDto, SearchFilterDto } from '../../../../core/models/product.models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filter: SearchFilterDto = {};
  products: ProductDto[] = [];
  isLoading = false;
  error = '';
  hasSearched = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.isLoading = true;
    this.error = '';
    this.hasSearched = true;

    this.productService.search(this.filter).subscribe({
      next: (res) => {
        if (res.data) {
          this.products = res.data;
        } else {
          this.error = res.message || 'Search failed.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'An error occurred during search.';
        console.error(err);
      }
    });
  }

  resetFilters(): void {
    this.filter = {};
    this.products = [];
    this.hasSearched = false;
    this.error = '';
  }
}
