import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';
import { ProductDto, CreateProductDto, CategoryDto } from '../../../../core/models/product.models';
import { AuthService } from '../../../../core/services/auth.service';
import { TokenDto } from '../../../../core/models/auth.models';
import { BrandDto } from '../../../../core/models/product.models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductDto[] = [];
  categories: CategoryDto[] = [];
  brands: BrandDto[] = [];

  isLoading = true;
  error = '';

  isAdmin = false;
  isAdding = false;
  editingProduct: ProductDto | null = null;

  newProduct: CreateProductDto = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: 0,
    brandId: 0,
    stock: 0
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: TokenDto | null) => {
      this.isAdmin = user?.role === 'Admin';
      if (this.isAdmin) {
        this.fetchMetadata();
      }
    });
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.products = res.data;
        } else {
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

  fetchMetadata(): void {
    this.categoryService.getAll().subscribe(res => this.categories = res.data || []);
    this.brandService.getAll().subscribe(res => this.brands = res.data || []);
  }

  onSaveProduct(): void {
    const action = this.editingProduct
      ? this.productService.update(this.editingProduct.id, this.newProduct)
      : this.productService.create(this.newProduct);

    action.subscribe({
      next: (res) => {
        if (res.success || res.data) {
          this.fetchProducts();
          this.closeModal();
        } else {
          alert(res.message || 'Error saving product');
        }
      },
      error: (err) => alert(err.error?.message || 'Server error')
    });
  }

  onDeleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        next: () => this.fetchProducts(),
        error: (err) => alert(err.error?.message || 'Error deleting product')
      });
    }
  }

  openAddModal(): void {
    this.editingProduct = null;
    this.newProduct = { name: '', description: '', price: 0, imageUrl: '', categoryId: 0, brandId: 0, stock: 0 };
    this.isAdding = true;
  }

  openEditModal(product: ProductDto): void {
    this.editingProduct = product;
    this.newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
      brandId: product.brandId,
      stock: product.stock
    };
    this.isAdding = true;
  }

  closeModal(): void {
    this.isAdding = false;
    this.editingProduct = null;
  }
}
